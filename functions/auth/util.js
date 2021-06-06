exports.base64Encode = input => {
  return Buffer.from(JSON.stringify(input)).toString('base64');
};

exports.base64Decode = input => {
  return JSON.parse(Buffer.from(input, 'base64').toString('utf8'));
};

exports.urlEncode = input => {
  return String(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

exports.urlDecode = input => {
  let encoded = String(input).replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4) encoded += '=';
  return encoded;
};

exports.readCookie = input => {
  return String(input)
    .split(';')
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split('=', 2);
      return Object.assign(acc, { [key]: value });
    }, {});
};
