import token from 'src/API/token';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888/.netlify/functions/'
    : process.env.REACT_APP_URL + '.netlify/functions/';

const handleOptions = ({ headers, ...options }: RequestInit): RequestInit => ({
  headers: {
    Authorization: 'Bearer ' + token.get(),
    'Content-Type': 'application/json',
    ...headers,
  },
  credentials: 'include',
  ...options,
});

const handleResponse = async <T>(response: Response) => {
  const payload = await response.json();
  if (!response.ok) throw payload;
  return payload as T;
};

export default <T = any>(url: string, options: RequestInit) =>
  fetch(baseURL + url, handleOptions(options)).then(response => handleResponse<T>(response));
