import jwt from 'jsonwebtoken';

const isAuthenticated = () => {
  const token = window.localStorage.getItem('token');
  const payload = token && jwt.decode(token);
  return typeof payload === 'object' && payload?.exp > (Date.now() / 1000);
};

const baseURL = 'http://localhost:37411';

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
  `${baseURL}/${url}`, 
  handleRequest(options),
).then(handleResponse);

const login = (password: string) => _fetch(`login`, {
  method: 'POST',
  body: JSON.stringify({ password }),
}).then(response => {
  window.localStorage.setItem('token', response.token);
  return response;
});

const read = (): Promise<WorkHourLog> => _fetch(`read`, {
  method: 'GET',
});

const create = (entry: Omit<WorkHourEntry, 'id'>) => _fetch(`create`, {
  method: 'POST',
  body: JSON.stringify(entry),
});

const _delete = (id: string) => _fetch(`delete?id=${id}`, {
  method: 'POST',
});

const update = (entry: WorkHourEntry) => _fetch(`update`, {
  method: 'POST',
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