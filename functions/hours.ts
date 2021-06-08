import { Handler } from '@netlify/functions';
import { main as PUT } from './hours/update';
import { main as POST } from './hours/create';
import { main as GET } from './hours/read';
import { main as DELETE } from './hours/delete';
import { success, failure } from './common';
import jwt from './auth/jwt';

const API = { PUT, POST, GET, DELETE };

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
