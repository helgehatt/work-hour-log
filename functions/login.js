const { success, failure } = require('./common');
const jwt = require('./auth/jwt');
const pw = require('./auth/pw');
const session = require('./auth/session');

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

  const response = success({ token: jwt.sign(user) });

  const newCookie = await session.generateCookie({
    userId: user.sub,
    headers: event.headers,
  });

  if (newCookie) {
    response.headers['Set-Cookie'] = newCookie;
  }

  return callback(null, response);
};
