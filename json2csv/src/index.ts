import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

interface IObj {
  [key: string]: string
}

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];

const inputFilePath = join(__dirname, inputFileName);
const outputFilePath = join(__dirname, outputFileName);

const readableStream = createReadStream(inputFilePath, { encoding: 'utf8' });
const writeableStream = createWriteStream(outputFilePath);

let remainder = '';
let header: string[] = [];

function parseChunk(chunk: string) {
  if (remainder) chunk = remainder + chunk;
  const validJsonRegex = /\[.+?\]/gs;
  if (validJsonRegex.test(chunk)) {
    return JSON.parse(chunk) as IObj[];
  }
  const lastCurlyBraceIdx = chunk.lastIndexOf('}');
  const data = chunk.slice(0, lastCurlyBraceIdx + 1) + '\n]';
  remainder = '[' + chunk.slice(lastCurlyBraceIdx + 2);
  return JSON.parse(data) as IObj[];
}

function arrToCSV(arr: IObj[]) {
  const isFirstRun = header.length ? false : true;
  if (!header.length) header = Object.keys(arr[0]);
  const body = arr.map(obj => header.map(key => obj[key]).join(','));
  return isFirstRun
    ? [header.join(','), ...body].join('\n') + '\n'
    : [...body].join('\n') + '\n';
}

const transformJsonToCsv = new Transform({
  decodeStrings: false,

  transform(chunk: string, _encoding, callback) {
    const data = parseChunk(chunk);
    const csv = arrToCSV(data);
    callback(null, csv);
  }
});

readableStream.pipe(transformJsonToCsv).pipe(writeableStream);

process.stdout.write(`Conversion completed!\nThe output file is here: ${outputFilePath}\n\n`);
