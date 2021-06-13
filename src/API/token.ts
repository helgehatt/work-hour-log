const base64Decode = (input: string): Record<string, any> => {
  return JSON.parse(Buffer.from(input, 'base64').toString('ascii'));
};

const get = () => window.localStorage.getItem('token');

const set = (token: string) => window.localStorage.setItem('token', token);

const remove = () => window.localStorage.removeItem('token');

const payload = () => {
  try {
    return base64Decode((get() || '').split('.')[1]);
  } catch (error) {
    return {};
  }
};

const isValid = () => payload().exp > Date.now() / 1000;

const token = {
  get,
  set,
  remove,
  payload,
  isValid,
};

export default token;
