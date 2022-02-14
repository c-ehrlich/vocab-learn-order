# Create Data for Vocab-Learn-Order

This app is part of Vocab-Learn-Order. The purpose of this is to create a JSON file of words and their frequencies in various frequency lists, and then popular a MongoDB database with the contents of that JSON file.

Currently supported frequency lists and required input file names are:

| Title           | Revision         | Filename                            | Description                                        |
|-----------------|------------------|-------------------------------------|----------------------------------------------------|
| Anime & J-drama | anime.frequency  | anime-jdrama.json                   | Anime & J-Drama                                    |
| BCCWJ           | bccwj.frequency1 | bccwj.json                          | Big Corpus of Contemporary Written Japanese        |
| Innocent Ranked | frequency1       | innocent-01.json - innocent-28.json | Innocent Corpurs (several thousand Novels)         |
| 国語辞典         | kokugojiten_freq | kokugojiten.json                    | Created from several dictionaries                  |
| Narou Freq      | frequency1       | narou.json                          | Created from Light Novels and Webnovels            |
| Novels          | yyyy             | novels.json                         | Created from Novels                                |
| VN Freq         | frequency1       | vn.json                             | Created from Visual Novels                         |
| Wikipedia       | frequency_v2     | wikipedia.json                      | Created from a complete dump of Japanese Wikipedia |

Additional frequency lists I hope to support in the future include:
* JLPT (not technically a frequency list, but useful for some learners)

I will consider adding other frequency lists if there is demand. Please open an issue to suggest this. Minimum requirements are:
* Must contain at least 100,000 words
* Must either be better than a currently existing frequency list, or cover a medium that is not yet represented in the current lists.

## Instructions

* Rename `sample.env` to `.env` and add the Mongo URI
* `yarn install` to install dependencies
* `npx ts-node combine-frequency-lists.ts` to execute and fill the database
* On slower database instances such as the MongoDB Atlas free tier, this may take up to several hours
* Once finished, the database should contain `TODO: ADD COUNT` documents.
