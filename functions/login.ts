import { Handler } from '@netlify/functions';
import { success, failure } from './common';
import jwt from './auth/jwt';
import pw from './auth/pw';
import session from './auth/session';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }

  const { username, password } = JSON.parse(event.body || '{}');

  if (!username || !password) {
    return failure('Missing parameters');
  }

  const user = await pw.verify({ username, password });

  if (!user) {
    return failure('Invalid parameters');
  }

  const response = success({ token: jwt.sign(user) });

  const newCookie = await session.generateCookie({
    userId: user.sub,
    headers: event.headers,
  });

  if (newCookie) {
    response.headers['Set-Cookie'] = newCookie;
  }

  return response;
};
