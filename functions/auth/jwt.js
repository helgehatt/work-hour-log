const crypto = require('crypto');
const { base64Encode, base64Decode } = require('./util');

const encrypt = input => {
  const hmac = crypto.createHmac('sha256', process.env.JWT_SECRET_KEY);
  hmac.update(input);
  return hmac.digest('base64');
};

exports.sign = payload => {
  const base64Header = base64Encode({
    alg: 'HS256',
    typ: 'JWT',
  });

  const base64Payload = base64Encode({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 24,
  });

  const base64Signature = encrypt([base64Header, base64Payload].join('.'));

  return [base64Header, base64Payload, base64Signature].join('.');
};

exports.verify = (headers, checkExp = true) => {
  if (!headers['authorization']) {
    throw new Error('Authorization header missing');
  }

  const [type, credentials] = headers['authorization'].split(' ');

  if (type !== 'Bearer' || credentials == null) {
    throw new Error('Authorization credentials missing');
  }

  const [base64Header, base64Payload, base64Signature] = credentials.split('.');

  if (base64Signature !== encrypt([base64Header, base64Payload].join('.'))) {
    throw new Error('Invalid signature');
  }

  const payload = base64Decode(base64Payload);

  if (checkExp && payload.exp < Date.now() / 1000) {
    throw new Error('JWT expired');
  }

  return payload;
};
