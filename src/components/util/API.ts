
const base64Decode = (input: string): Record<string, any> => {
  return JSON.parse(Buffer.from(input, 'base64').toString('ascii'));
};

const decodePayload = (token?: string | null) => {
  if (token == null) return {};
  return base64Decode(token.split('.')[1]);
}

const isAuthenticated = () => {
  const token = window.localStorage.getItem('token');
  return decodePayload(token).exp > (Date.now() / 1000);
};

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/.netlify/functions/'
  : 'https://work-hour-log.netlify.app/.netlify/functions/';

const handleRequest = ({ headers, ...options }: RequestInit): RequestInit => ({
  headers: {
    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
    'Content-Type': 'application/json',
    ...headers,
  },
  ...options,
});

const handleResponse = async (response: Response) => {
  const json = await response.json();
  if (response.ok) return json;
  throw json;
};

const _fetch = (url: string, options: RequestInit) => fetch(
  baseURL + url,
  handleRequest(options),
).then(handleResponse);

const login = (username: string, password: string) => _fetch('login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
}).then(response => {
  window.localStorage.setItem('token', response.token);
  return response;
});

const read = (): Promise<WorkHourLog> => _fetch('hours', {
  method: 'GET',
});

const create = (entry: Omit<WorkHourEntry, 'id'>) => _fetch('hours', {
  method: 'POST',
  body: JSON.stringify(entry),
});

const _delete = (id: string) => _fetch('hours?id=' + id, {
  method: 'DELETE',
});

const update = (entry: WorkHourEntry) => _fetch('hours', {
  method: 'PUT',
  body: JSON.stringify(entry),
});

const API = {
  isAuthenticated,
  login,
  create,
  delete: _delete,
  read,
  update,
} as const;

export default API;