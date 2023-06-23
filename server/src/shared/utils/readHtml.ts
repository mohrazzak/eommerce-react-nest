import { readFileSync } from 'fs';
import { resolve } from 'path';

export const readHtml = (path: string): string => {
  return readFileSync(resolve(path), 'utf-8');
};
