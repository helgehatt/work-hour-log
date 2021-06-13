import { Handler } from '@netlify/functions';
import { success, failure } from './common';
import { readCookie } from './auth/util';
import jwt from './auth/jwt';
import session from './auth/session';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }

  if (event.httpMethod !== 'POST') {
    return failure('Method not allowed', 405);
  }

  const cookie = readCookie(event.headers['cookie']);

  try {
    const payload = jwt.verify(event.headers['authorization'], false);

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
      if (response.headers == null) response.headers = {};
      response.headers['Set-Cookie'] = newCookie;
    }

    return response;
  } catch (error) {
    return failure(error);
  }
};
