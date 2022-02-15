import { number, object, string, TypeOf } from 'zod';

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
});

export type CreateWordInput = TypeOf<typeof createWordSchema>;