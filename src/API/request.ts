import token from 'src/API/token';

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

const request = <T = any>(url: string, options: RequestInit) =>
  fetch(`/.netlify/functions/${url}`, handleOptions(options)).then(response => handleResponse<T>(response));

export default request;
