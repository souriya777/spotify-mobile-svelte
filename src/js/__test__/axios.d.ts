export type AxiosOptions = {
  method: 'GET' | 'POST' | 'PUT';
  url: string;
  headers: AxiosHeaders;
  data: object;
};

type AxiosHeaders = {
  'Content-Type': string;
  Authorization: string;
};
