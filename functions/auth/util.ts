export const base64Encode = (input: object) => {
  return Buffer.from(JSON.stringify(input)).toString('base64');
};

export const base64Decode = (input: string) => {
  return JSON.parse(Buffer.from(input, 'base64').toString('utf8'));
};

export const urlEncode = (input: string) => {
  return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const urlDecode = (input: string) => {
  let encoded = input.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4) encoded += '=';
  return encoded;
};

export const readCookie = (input?: string) => {
  return (input || '').split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split('=', 2);
      return Object.assign(acc, { [key]: value });
    },
    { session: '' }
  );
};
