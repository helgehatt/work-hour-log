import { Handler } from '@netlify/functions';
const { success, failure } = require('./common');
const jwt = require('./auth/jwt');
const API = {
  PUT: require('./hours/update').main,
  POST: require('./hours/create').main,
  GET: require('./hours/read').main,
  DELETE: require('./hours/delete').main,
};

export const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }

  try {
    const payload = jwt.verify(event.headers);

    const response = await API[event.httpMethod]({
      ...JSON.parse(event.body || '{}'),
      ...event.queryStringParameters,
      userId: payload.sub,
    });

    return response;
  } catch (error) {
    return failure(error, 401);
  }
};
