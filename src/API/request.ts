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

const handleResponse = async (response: Response) => {
  const payload = await response.json();
  if (!response.ok) throw payload;
  return payload;
};

const request = <T = any>(url: string, options: RequestInit): Promise<T> =>
  fetch(`/.netlify/functions/${url}`, handleOptions(options)).then(handleResponse);

export default request;
