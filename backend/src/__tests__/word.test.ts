import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../utils/server';
import { createManyWords } from '../service/word.service';
import {
  wordTestData,
  requestTestWords,
  requestTestWeights,
} from './word.test.data';
import { IWord } from '../interfaces/IWord';

const app = createServer();

describe('Word Learn Order', () => {
  /**
   * Init
   */
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    // add items to DB
    try {
      createManyWords(wordTestData);
    } catch (e) {
      console.error('Unable to populate test database');
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  /**
   * Tests
   */
  describe('Get Word Learn Order Route', () => {
    describe('Given a correct request containing words that are in JMDict', () => {
      it('should return an array of words', async () => {
        const words = requestTestWords;
        const weights = requestTestWeights;

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ words, weights })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(200);
        expect(body.words.length).toBe(2);
        expect(body.notFound.length).toBe(0);
        expect(
          body.words.findIndex((element: IWord) => element.word === words[0])
        ).not.toBe(-1);
        expect(
          body.words.findIndex((element: IWord) => element.word === '学学学学')
        ).toBe(-1);
      });
    });

    describe('Given a correct request containing words that are not in JMDict', () => {
      it('should return an array of notFound', async () => {
        const words = ['NOT_IN_JMDICT'];
        const weights = requestTestWeights;

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ words, weights })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(200);
        expect(body.words.length).toBe(0);
        expect(body.notFound.length).toBe(1);
        expect(
          body.notFound.findIndex((element: string) => element === words[0])
        ).not.toBe(-1);
        expect(
          body.notFound.findIndex(
            (element: string) => element === 'SAMPLE_NONEXISTENT_WORD'
          )
        ).toBe(-1);
      });
    });

    describe('Given a request that is missing the words variable', () => {
      it('should return the appropriate error', async () => {
        const weights = requestTestWeights;

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ weights })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(400);
        expect(body).toStrictEqual({ error: 'List of words is required' });
      });
    });

    describe('Given a request that with an empty words variable', () => {
      it('should return the appropriate error', async () => {
        const words: string[] = [];
        const weights = requestTestWeights;

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ words, weights })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(400);
        expect(body).toStrictEqual({ error: 'Submitted word list is empty' });
      });
    });

    describe('Given a request that is missing the weights variable', () => {
      it('should return the appropriate error', async () => {
        const words = requestTestWords;

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ words })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(400);
        expect(body).toStrictEqual({
          error: 'Frequency List weightings are required',
        });
      });
    });

    describe('Given a request that is missing one of the dictionaries', () => {
      it('should return the appropriate error', async () => {
        const allWeights = requestTestWeights;

        for (const key of Object.keys(allWeights)) {
          const words = requestTestWords;
          const weights: any = {...requestTestWeights};
          delete weights[key];

          const { statusCode, body } = await supertest(app)
            .post('/api/learnorder')
            .send({ words, weights })
            .set('Accept', 'application/json');

          expect(statusCode).toBe(400);
          expect(body.error).toMatch(
            /^Frequency List weighting for .* is required$/
          );
        }
      });
    });

    describe('Given a request where one or more weights are not numbers', () => {
      it('should return the appropriate error', async () => {
        const allWeights = requestTestWeights;

        for (const key of Object.keys(allWeights)) {
          const words = requestTestWords;
          let weights: any = {...requestTestWeights};
          weights[key] = '30';

          const { statusCode, body } = await supertest(app)
            .post('/api/learnorder')
            .send({ words, weights })
            .set('Accept', 'application/json');

          expect(statusCode).toBe(400);
          expect(body).toStrictEqual({
            error: 'Frequency List weightings must be strings',
          });
        }
      });
    });

    describe('Given a request where weights includes an unknown key', () => {
      it('should return the appropriate error', async () => {
        const words = requestTestWords;
        let weights: any = requestTestWeights;
        weights = {...weights, foo: 20};

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ words, weights })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(400);
        expect(body).toStrictEqual({
          error: 'Frequency list includes unknown key(s)',
        });
      });
    });

    describe('Given a request body that includes an unknown key', () => {
      it('should return the appropriate error', async () => {
        const words = requestTestWords;
        const weights = requestTestWeights;

        const { statusCode, body } = await supertest(app)
          .post('/api/learnorder')
          .send({ words, weights, foo: 'bar' })
          .set('Accept', 'application/json');

        expect(statusCode).toBe(400);
        expect(body).toStrictEqual({
          error: 'Request includes unknown key(s)',
        });
      });
    });
  });
});
