const base64Decode = (input: string): Record<string, any> => {
  return JSON.parse(Buffer.from(input, 'base64').toString('ascii'));
};

const get = () => window.localStorage.getItem('token');

const set = (token: string) => window.localStorage.setItem('token', token);

const payload = () => {
  const token = get();
  if (token == null) return {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [header, payload, signature] = token.split('.');
  if (payload == null) return {};
  return base64Decode(token.split('.')[1]);
};

const isValid = () => payload()?.exp > Date.now() / 1000;

export default {
  get,
  set,
  payload,
  isValid,
};
