const { success, failure, sign } = require('./common');
const crypto = require('crypto');

exports.handler = (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }

  const { password } = JSON.parse(event.body || '{}');

  if (!password) {
    return failure('Missing parameters');
  }

  const hash = crypto.pbkdf2Sync(password, process.env.CRYPTO_PASSWORD_SALT, 10000, 64, 'sha512').toString('base64');

  if (process.env.CRYPTO_PASSWORD_HASH !== hash) {
    return failure('Invalid parameters');
  }

  return success({ token: sign() });
};