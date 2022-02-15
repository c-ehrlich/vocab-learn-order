import WordModel, { Word } from '../model/word.model';

export function createOneWord(word: Word) {
  return WordModel.create(word);
}

export function createManyWords(words: Word[]) {
  // Can also use WordModel.collection.insertMany, but this makes direct calls
  // to Mongo instead of using Mongoose
  // for options see: https://mongoosejs.com/docs/api.html#model_Model.insertMany
  return WordModel.insertMany(words, {lean: true});
}

export function findOneWord(word: string) {
  return WordModel.findOne({ word }).select('-_id -__v');
}

export function findManyWords(words: string[]) {
  return WordModel.find({ word: { $in: words } }).select('-_id -__v');
}

export function deleteAllWords() {
  return WordModel.deleteMany({});
}
