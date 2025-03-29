export interface HttpRequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    body?: any;
    queryParams?: Record<string, any>;
    headers?: Record<string, string>;
}

export interface HttpClient {
    request(options: HttpRequestOptions): Promise<any>;
}