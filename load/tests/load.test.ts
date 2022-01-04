import mock from 'xhr-mock';
import { load } from "../src/load";
import { Blob } from 'buffer';
import { JSDOM } from 'jsdom';
import FormData from 'form-data';

describe('load()', () => {
  beforeEach(() => mock.setup());
  afterEach(() => mock.teardown());
  const url = 'https://www.some-fake-url.io/path/test';
  const obj = {hello: 'world'};
  const formData = new FormData();

  it('should get the data as JSON', async () => {
    expect.assertions(1);
    mock.get(url, {body: JSON.stringify(obj)});
    await load(url)
      .then((res: Response) => expect(res.body).toEqual(obj));
  });

  it('should get the data as text', async () => {
    expect.assertions(1);
    const text = 'hello world';
    mock.get(url, {
      body: text,
      headers: {'content type': 'text/plain'}
    });
    await load(url, {responseType: 'text'})
      .then((res: Response) => expect(res.body).toEqual(text));
  });

  it('should get the data as array buffer', async () => {
    expect.assertions(1);
    const arrayBuffer = new ArrayBuffer(8);
    mock.get(url, {
      body: arrayBuffer,
      headers: {'content type': 'application/octet-stream'}
    });
    await load(url, {responseType: 'arraybuffer'})
      .then((res: Response) => expect(res.body).toEqual(arrayBuffer));
  });

  it('should get the data as blob', async () => {
    expect.assertions(1);
    const blob = new Blob(['hello world'], {type : 'text/plain'});
    mock.get(url, {
      body: blob,
      headers: {'content type': 'application/octet-stream'}
    });
    await load(url, {responseType: 'blob'})
      .then((res: Response) => expect(res.body).toEqual(blob));
  });

  it('should get the data as document', async () => {
    expect.assertions(1);
    const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello</p>`)).window;
    mock.get(url, {
      body: document,
      headers: {'content type': 'text/html'}
    });
    await load(url, {responseType: 'document'})
      .then((res: Response) => expect(res.body).toEqual(document));
  });

  it('should post the data as JSON', async () => {
    expect.assertions(1);
    mock.post(url, {body: obj});
    await load(url, {method: 'POST', body: obj})
      .then((res: Response) => expect(res.body).toEqual(obj));
  });

  it('should post the data as FormData', async () => {
    expect.assertions(1);
    mock.post(url, {body: formData});
    await load(url, {method: 'POST', body: formData})
      .then((res: Response) => expect(res.body).toEqual(formData));
  });

  it('should put the data as JSON', async () => {
    expect.assertions(1);
    mock.put(url, {body: obj});
    await load(url, {method: 'PUT', body: obj})
      .then((res: Response) => expect(res.body).toEqual(obj));
  });

  it('should put the data as FormData', async () => {
    expect.assertions(1);
    mock.put(url, {body: formData});
    await load(url, {method: 'PUT', body: formData})
      .then((res: Response) => expect(res.body).toEqual(formData));
  });

  it('should delete the data as JSON', async () => {
    expect.assertions(1);
    mock.delete(url, {body: obj});
    await load(url, {method: 'DELETE', body: obj})
      .then((res: Response) => expect(res.body).toEqual(obj));
  });

  it('should reject with an error when status=404', async () => {
    expect.assertions(1);
    mock.get(url, {
      status: 404,
      reason: 'Bad request',
      body: JSON.stringify('The requested data does not exist.')
    });

    await load(url)
      .catch((error: Response) => {
        expect(error.body).toMatch('The requested data does not exist.')
      });
  });

  it('should abort request by abort signal', async () => {
    expect.assertions(1);
    const controller = new AbortController();
    const { signal } = controller;
    mock.get(url, (req, res) => {
      controller.abort();
      return res.status(200).body('{"hello": "world"}');
    });
    
    await load(url, { signal })
      .catch((data: Response) => expect(data).toEqual(0));
  });
});