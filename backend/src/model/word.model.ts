import { getModelForClass, index, prop } from '@typegoose/typegoose';

export const privateFields = ['__v'];

@index({ word: 1 })
export class Word {
  @prop({ required: true, unique: true })
  word!: string;

  @prop({ required: true })
  jmdict!: [string];

  @prop()
  animeJDrama?: number;

  @prop()
  bccwj?: number;

  @prop()
  innocent?: number;

  @prop()
  kokugojiten?: number;

  @prop()
  narou?: number;

  @prop()
  netflix?: number;

  @prop()
  novels?: number;

  @prop()
  vn?: number;

  @prop()
  wikipedia?: number;
}

const WordModel = getModelForClass(Word);
export default WordModel;
