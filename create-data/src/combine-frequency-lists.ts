
const fs = require('fs');

/**
 * In the backend we deduce the TWord type from the schema
 * Here unfortunately we need to repeat a hardcoded version
 * FIXME figure out a better way to do this
 */
export interface TWord {
  word: string;
  jmdict?: string[];
  animeJDrama?: number;
  bccwj?: number;
  innocent?: number;
  kokugojiten?: number;
  narou?: number;
  netflix?: number;
  novels?: number;
  vn?: number;
  wikipedia?: number;
  jlpt?: [number, string][];
}

// this is where we're putting everything
let words: TWord[] = [];

// Create variables that hold each Format3 Frequency List
// [[word, "freq", freq]]
type Format3Entry = [word: string, freqtext: string, freq: number];
const animeJDrama: Format3Entry[] = require('./data-input/anime-jdrama.json');
const bccwj: Format3Entry[] = require('./data-input/bccwj.json');
const kokugojiten: Format3Entry[] = require('./data-input/kokugojiten.json');
const netflix: Format3Entry[] = require('./data-input/netflix.json');
const novels: Format3Entry[] = require('./data-input/novels.json');
const wikipedia: Format3Entry[] = require('./data-input/wikipedia.json');

// Create a single file for the entire Innocent Corpus (also Format3)
const innocent01: Format3Entry[] = require('./data-input/innocent-01.json');
const innocent02: Format3Entry[] = require('./data-input/innocent-02.json');
const innocent03: Format3Entry[] = require('./data-input/innocent-03.json');
const innocent04: Format3Entry[] = require('./data-input/innocent-04.json');
const innocent05: Format3Entry[] = require('./data-input/innocent-05.json');
const innocent06: Format3Entry[] = require('./data-input/innocent-06.json');
const innocent07: Format3Entry[] = require('./data-input/innocent-07.json');
const innocent08: Format3Entry[] = require('./data-input/innocent-08.json');
const innocent09: Format3Entry[] = require('./data-input/innocent-09.json');
const innocent10: Format3Entry[] = require('./data-input/innocent-10.json');
const innocent11: Format3Entry[] = require('./data-input/innocent-11.json');
const innocent12: Format3Entry[] = require('./data-input/innocent-12.json');
const innocent13: Format3Entry[] = require('./data-input/innocent-13.json');
const innocent14: Format3Entry[] = require('./data-input/innocent-14.json');
const innocent15: Format3Entry[] = require('./data-input/innocent-15.json');
const innocent16: Format3Entry[] = require('./data-input/innocent-16.json');
const innocent17: Format3Entry[] = require('./data-input/innocent-17.json');
const innocent18: Format3Entry[] = require('./data-input/innocent-18.json');
const innocent19: Format3Entry[] = require('./data-input/innocent-19.json');
const innocent20: Format3Entry[] = require('./data-input/innocent-20.json');
const innocent21: Format3Entry[] = require('./data-input/innocent-21.json');
const innocent22: Format3Entry[] = require('./data-input/innocent-22.json');
const innocent23: Format3Entry[] = require('./data-input/innocent-23.json');
const innocent24: Format3Entry[] = require('./data-input/innocent-24.json');
const innocent25: Format3Entry[] = require('./data-input/innocent-25.json');
const innocent26: Format3Entry[] = require('./data-input/innocent-26.json');
const innocent27: Format3Entry[] = require('./data-input/innocent-27.json');
const innocent28: Format3Entry[] = require('./data-input/innocent-28.json');

const innocent: Format3Entry[] = ([] as Format3Entry[]).concat(
  innocent01,
  innocent02,
  innocent03,
  innocent04,
  innocent05,
  innocent06,
  innocent07,
  innocent08,
  innocent09,
  innocent10,
  innocent11,
  innocent12,
  innocent13,
  innocent14,
  innocent15,
  innocent16,
  innocent17,
  innocent18,
  innocent19,
  innocent20,
  innocent21,
  innocent22,
  innocent23,
  innocent24,
  innocent25,
  innocent26,
  innocent27,
  innocent28
);

// Create variables that hold each non-Format3 Frequency List, converted to a format-3 compatible type
type NonFormat3Entry = [
  word: string,
  freqtext: string,
  freq: {
    reading: string;
    frequency: number;
  }
];
const narouIn = require('./data-input/narou.json');
const vnIn = require('./data-input/vn.json');
const narou: Format3Entry[] = narouIn.map((item: NonFormat3Entry) => [
  item[0],
  item[1],
  Number(item[2].frequency),
]);
const vn: Format3Entry[] = vnIn.map((item: NonFormat3Entry) => [
  item[0],
  item[1],
  Number(item[2].frequency),
]);

// import JMDict
type JMDictType = [
  string,
  string,
  string,
  string,
  number,
  string[],
  number,
  string
];
const jmDict01: JMDictType[] = require('./data-input/jmdict/term_bank_01.json');
const jmDict02: JMDictType[] = require('./data-input/jmdict/term_bank_02.json');
const jmDict03: JMDictType[] = require('./data-input/jmdict/term_bank_03.json');
const jmDict04: JMDictType[] = require('./data-input/jmdict/term_bank_04.json');
const jmDict05: JMDictType[] = require('./data-input/jmdict/term_bank_05.json');
const jmDict06: JMDictType[] = require('./data-input/jmdict/term_bank_06.json');
const jmDict07: JMDictType[] = require('./data-input/jmdict/term_bank_07.json');
const jmDict08: JMDictType[] = require('./data-input/jmdict/term_bank_08.json');
const jmDict09: JMDictType[] = require('./data-input/jmdict/term_bank_09.json');
const jmDict10: JMDictType[] = require('./data-input/jmdict/term_bank_10.json');
const jmDict11: JMDictType[] = require('./data-input/jmdict/term_bank_11.json');
const jmDict12: JMDictType[] = require('./data-input/jmdict/term_bank_12.json');
const jmDict13: JMDictType[] = require('./data-input/jmdict/term_bank_13.json');
const jmDict14: JMDictType[] = require('./data-input/jmdict/term_bank_14.json');
const jmDict15: JMDictType[] = require('./data-input/jmdict/term_bank_15.json');
const jmDict16: JMDictType[] = require('./data-input/jmdict/term_bank_16.json');
const jmDict17: JMDictType[] = require('./data-input/jmdict/term_bank_17.json');
const jmDict18: JMDictType[] = require('./data-input/jmdict/term_bank_18.json');
const jmDict19: JMDictType[] = require('./data-input/jmdict/term_bank_19.json');
const jmDict20: JMDictType[] = require('./data-input/jmdict/term_bank_20.json');
const jmDict21: JMDictType[] = require('./data-input/jmdict/term_bank_21.json');
const jmDict22: JMDictType[] = require('./data-input/jmdict/term_bank_22.json');
const jmDict23: JMDictType[] = require('./data-input/jmdict/term_bank_23.json');
const jmDict24: JMDictType[] = require('./data-input/jmdict/term_bank_24.json');
const jmDict25: JMDictType[] = require('./data-input/jmdict/term_bank_25.json');
const jmDict26: JMDictType[] = require('./data-input/jmdict/term_bank_26.json');
const jmDict27: JMDictType[] = require('./data-input/jmdict/term_bank_27.json');
const jmDict28: JMDictType[] = require('./data-input/jmdict/term_bank_28.json');
const jmDict29: JMDictType[] = require('./data-input/jmdict/term_bank_29.json');
const jmDict30: JMDictType[] = require('./data-input/jmdict/term_bank_30.json');
const jmDict31: JMDictType[] = require('./data-input/jmdict/term_bank_31.json');
const jmDict32: JMDictType[] = require('./data-input/jmdict/term_bank_32.json');

const jmDict: JMDictType[] = ([] as JMDictType[]).concat(
  jmDict01,
  jmDict02,
  jmDict03,
  jmDict04,
  jmDict05,
  jmDict06,
  jmDict07,
  jmDict08,
  jmDict09,
  jmDict10,
  jmDict11,
  jmDict12,
  jmDict13,
  jmDict14,
  jmDict15,
  jmDict16,
  jmDict17,
  jmDict18,
  jmDict19,
  jmDict20,
  jmDict21,
  jmDict22,
  jmDict23,
  jmDict24,
  jmDict25,
  jmDict26,
  jmDict27,
  jmDict28,
  jmDict29,
  jmDict30,
  jmDict31,
  jmDict32
);

// create starter object that contains word and jmdict definition
// for each list:
//   for each item:
//   check if it already exists in key 'word'
//   if so, add the relevant frequency key
//   if not, create a new item with that word key and frequency key
for (const dictWord of jmDict) {
  const searchTerm = (element: TWord) => element.word === dictWord[0];
  const indexOf = words.findIndex(searchTerm);
  if (indexOf === -1) {
    // create new Object
    const newWord: TWord = {
      word: dictWord[0],
      jmdict: dictWord[5],
    };
    words.unshift(newWord);
  } else {
    dictWord[5].forEach((definition) => {
      if (words[indexOf].jmdict?.indexOf(definition) === -1) {
        words[indexOf].jmdict?.push(definition);
      }
    });
  }
}


/**
 * Add frequencies
 */

const lists: { list: Format3Entry[]; name: string }[] = [
  {
    list: animeJDrama,
    name: 'animeJDrama',
  },
  {
    list: bccwj,
    name: 'bccwj',
  },
  {
    list: innocent,
    name: 'innocent',
  },
  {
    list: kokugojiten,
    name: 'kokugojiten',
  },
  {
    list: narou,
    name: 'narou',
  },
  {
    list: netflix,
    name: 'netflix',
  },
  {
    list: novels,
    name: 'novels',
  },
  {
    list: vn,
    name: 'vn',
  },
  {
    list: wikipedia,
    name: 'wikipedia',
  },
];

// Anime & JDrama

lists.forEach((freqList: { list: Format3Entry[]; name: string }) => {
  for (const flEntry of freqList.list) {
    const searchTerm = (element: TWord) => element.word === flEntry[0];
    const indexOf = words.findIndex(searchTerm);
    if (indexOf !== -1) {
      if (!(freqList.name in words[indexOf])) {
        words[indexOf] = {
          ...words[indexOf],
          [freqList.name]: flEntry[2],
        }
      }
    }
    // could make a new entry for words that don't exist yet.
    // but not recommended as the frequency lists contain
    // a lot of junk data and limiting to jmdict filters that
    // quite well without meaningfully reducing the amount of
    // useful words.
  }
  console.log(`Finished ${freqList.name} at ${new Date()}`);
});

/**
 * JLPT
 */
const data = require('./words-jmdict-in.json');
const jlpt01 = require('./data-input/jlpt-01.json');
const jlpt02 = require('./data-input/jlpt-02.json');
const jlpt03 = require('./data-input/jlpt-03.json');
const jlpt04 = require('./data-input/jlpt-04.json');
const jlpt = [].concat(jlpt01, jlpt02, jlpt03, jlpt04);

// function to get JLPT data in all cases (the frequency list has two different formats/object structures)
function getJLPTdata(item: any): [number, string] {
  if (item[2].value) {
    return [item[2].value, item[2].displayValue];
  } else {
    if (item[2].frequency.value) {
      return [item[2].frequency.value, item[2].frequency.displayValue];
    }
  }
  return [-1, 'ISSUE WITH JLPT']
}

// add jlpt data to existing data
for (const word of jlpt) {
  const searchTerm = (element: any) => element.word === word[0];
  const indexOf = words.findIndex(searchTerm);
  if (indexOf !== -1) {
    if (!words[indexOf].jlpt) {
      words[indexOf].jlpt = [getJLPTdata(word)];
    } else {
      words[indexOf].jlpt = words[indexOf].jlpt!.concat([getJLPTdata(word)]);
    }
  }
}

/**
 * cull items that have no frequency data at all
 * we know that all items have a word and a JMDict definition, so
 * if they have no freqencies then they will only have those keys
 * and no others.
 */
console.log(`Length before filtering: ${words.length}`);
words = words.filter((word) =>  Object.keys(word).length > 2);
console.log(`Length after filtering: ${words.length}`);

/**
 * Save to disk
 */
fs.writeFileSync('words-jmdict.json', JSON.stringify(words));
