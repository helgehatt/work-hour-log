const { success, failure, sign } = require('./common');
const pw = require('./auth/pw');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }

  const { username, password } = JSON.parse(event.body || '{}');

  if (!username || !password) {
    return callback(null, failure('Missing parameters'));
  }

  const user = await pw.verify({ username, password });

  if (!user) {
    return callback(null, failure('Invalid parameters'));
  }

  return callback(null, success({ token: sign(user) }));
};