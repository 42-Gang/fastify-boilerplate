import got from 'got';
import { HttpClient, HttpRequestOptions } from '../interface/http.client.interface.js';

export class GotHttpClient implements HttpClient {
  constructor(private baseURL: string) {} // 서버별 다른 주소를 가지나?

  async request(options: HttpRequestOptions): Promise<any> {
    const { method, url, body, queryParams, headers } = options;

    const client = got.extend({
      prefixUrl: this.baseURL,
      responseType: 'json',
      timeout: { request: 10000 },
    });

    const response = await client(url, {
      method,
      json: body,
      searchParams: queryParams,
      headers,
    });

    return response.body;
  }
}