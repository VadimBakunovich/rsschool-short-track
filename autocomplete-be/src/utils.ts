import { readFile, stat } from 'fs/promises';

export async function getFileContent(path: string) {
  try {
    const data = await readFile(path, { encoding: 'utf8' });
    return JSON.parse(data) as string[];
  } catch(err) {
    console.error(err);
    return null;
  }
}

export async function getFileModifDate(path: string) {
  try {
    const stats = await stat(path);
    return stats.mtime.toUTCString();
  } catch(err) {
    console.error(err);
    return null;
  }
}
