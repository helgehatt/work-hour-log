const { success, failure, verify } = require('./common');
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
    const payload = verify(event.headers);
  } catch (error) {
    return callback(null, failure(error, 401));
  }

  return callback(null, await API[event.httpMethod]({
    ...JSON.parse(event.body || '{}'),
    ...event.queryStringParameters,
  }));
};