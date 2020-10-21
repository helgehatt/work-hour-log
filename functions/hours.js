const { success, failure } = require('./common');
const jwt = require('./auth/jwt')
const API = {
  PUT: require('./hours/update').main,
  POST: require('./hours/create').main,
  GET: require('./hours/read').main,
  DELETE: require('./hours/delete').main,
};

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }

  try {
    const payload = jwt.verify(event.headers);

    return callback(null, await API[event.httpMethod]({
      ...JSON.parse(event.body || '{}'),
      ...event.queryStringParameters,
      userId: payload.sub,
    }));
  } catch (error) {
    return callback(null, failure(error, 401));
  }
};