const { success, failure } = require('./common');
const jwt = require('./auth/jwt');
const session = require('./auth/session');
const { readCookie } = require('./auth/util');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }

  const cookie = readCookie(event.headers['cookie']);

  try {
    const payload = jwt.verify(event.headers, false);

    const oldSession = await session.validate({
      userId: payload.sub,
      token: cookie.session,
      headers: event.headers,
    });

    await session.invalidate({ sessionId: oldSession.id });
  
    const response = success({ token: jwt.sign(payload) });

    const newCookie = await session.generateCookie({ 
      userId: payload.sub, 
      headers: event.headers,
    });
  
    if (newCookie) {
      response.headers['Set-Cookie'] = newCookie;
    }

    return callback(null, response);
  } catch (error) {
    return callback(null, failure(error));
  }
};