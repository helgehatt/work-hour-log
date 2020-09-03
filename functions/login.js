const { success, failure, sign } = require('./common');
const crypto = require('crypto');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }

  const { password } = JSON.parse(event.body || '{}');

  if (!password) {
    return callback(null, failure('Missing parameters'));
  }

  const salt = process.env.CRYPTO_PASSWORD_SALT;
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');

  if (process.env.CRYPTO_PASSWORD_HASH !== hash.toString('base64')) {
    return callback(null, failure('Invalid parameters'));
  }

  return callback(null, success({ token: sign() }));
};