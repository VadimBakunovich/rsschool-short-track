import http from 'http';
import { join } from 'path';
import createEtag from 'etag';
import { createAutoComplete } from '../../auto-complete';
import { getFileContent, getFileModifDate } from './utils';

const port = process.env.PORT || 8080;
const pathToFile = join(__dirname, '../data/cities.json');

let cities: string[] = [];
let lastModifDate = '';

void getFileContent(pathToFile).then(res => cities = res);
void getFileModifDate(pathToFile).then(res => lastModifDate = res);

http.createServer(async (request, response) => {

  const { headers, method, url } = request;
  const searchParams = new URLSearchParams(url);

  if (method === 'GET' && searchParams.has('/?complete')) {

    if (lastModifDate !== await getFileModifDate(pathToFile)) {
      lastModifDate = await getFileModifDate(pathToFile) || lastModifDate;
      cities = await getFileContent(pathToFile) || cities;
    }

    if (headers['if-modified-since'] !== lastModifDate) {

      const autocomplete = createAutoComplete(cities);
      const query = searchParams.get('/?complete');
      const data = autocomplete(query) as string[];
      const content = JSON.stringify(data);
      const etag = createEtag(content);

      headers['if-none-match'] !== etag
        ? response
            .writeHead(200, {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=31536000, no-cache',
              'ETag': etag,
              'Last-Modified': lastModifDate
            })
            .end(content)
        : response
            .writeHead(304, { 'Last-Modified': lastModifDate })
            .end();
    
    } else response.writeHead(304).end();
  
  } else response
      .writeHead(404, { 'Content-Type': 'text/html' })
      .end(`<h1>Request <kbd>${url}</kbd> not supported</h1>`);
  
}).listen(port, () => console.log(`Server is running on: http://localhost:${port}`));
