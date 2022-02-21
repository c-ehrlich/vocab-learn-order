import { array, number, object, string, tuple, TypeOf } from 'zod';

export const createWordSchema = object({
  word: string({
    required_error: 'Word is required',
  }),
  jmdict: string({
    required_error: 'JMDict definition is required',
  }),
  animeJDrama: number().optional(),
  bccwj: number().optional(),
  innocent: number().optional(),
  kokugojiten: number().optional(),
  narou: number().optional(),
  netflix: number().optional(),
  novels: number().optional(),
  vn: number().optional(),
  wikipedia: number().optional(),
  jlpt: tuple([number(), string()]).array().optional(),
});

export const searchWordsSchema = object({
  body: object({
    words: array(string({ invalid_type_error: 'Words must be strings' }), {
      required_error: 'List of words is required',
    }).min(1, 'Submitted word list is empty'),
    weights: object(
      {
        animeJDrama: number({
          required_error:
            'Frequency List weighting for Anime & J-Drama is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        bccwj: number({
          required_error: 'Frequency List weighting for BCCWJ is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        innocent: number({
          required_error:
            'Frequency List weighting for Innocent Corpus is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        kokugojiten: number({
          required_error: 'Frequency List weighting for 国語辞典 is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        narou: number({
          required_error: 'Frequency List weighting for Narou is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        netflix: number({
          required_error: 'Frequency List weighting for Netflix is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        novels: number({
          required_error: 'Frequency List weighting for Novels is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        vn: number({
          required_error:
            'Frequency List weighting for Visual Novels is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
        wikipedia: number({
          required_error: 'Frequency List weighting for Wikipedia is required',
          invalid_type_error: 'Frequency List weightings must be strings',
        }),
      },
      { required_error: 'Frequency List weightings are required' }
    ).strict("Frequency list includes unknown key(s)"),
  }).strict("Request includes unknown key(s)"),
});

export type CreateWordInput = TypeOf<typeof createWordSchema>;
export type SearchWordsInput = TypeOf<typeof searchWordsSchema>['body'];
