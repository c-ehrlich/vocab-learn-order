// [["為る", "freq", {"reading": "する", "frequency": 1}], ["私", "freq", {"reading": "わたし", "frequency": 14}],

const fs = require('fs');
const jsonVariable = [
  { word: '食べる', jmdict: 3 },
  ['飲む', 44],
  ['実現', 12],
  ['騙す', 9],
];

var novels = require('./data-input/novels.json');
novels.forEach(novel => console.log(novel));

// novelsVar.forEach(novel => console.log('hi'));

// fs.writeFileSync('file.json', JSON.stringify(jsonVariable));
