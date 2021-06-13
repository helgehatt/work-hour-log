import { HandlerEvent } from '@netlify/functions';
import crypto from 'crypto';
import database from '../database';
import { urlEncode } from './util';

const generateCookie = async (input: { userId: string; headers: HandlerEvent['headers'] }) => {
  const token = urlEncode(crypto.randomBytes(32).toString('base64'));

  try {
    await database.Sessions.Create({
      userId: input.userId,
      token: token,
      host: input.headers['host'],
      'user-agent': input.headers['user-agent'],
      'client-ip': input.headers['client-ip'],
    });

    // The Max-Age coincides with FaunaDB TTL setting
    return `session=${token}; Max-Age=${30 * 24 * 3600}; HttpOnly; SameSite=Strict`;
  } catch (error) {
    // Ignore error
  }
};

const validate = async (input: {
  userId: string;
  token: string;
  headers: HandlerEvent['headers'];
}) => {
  // Throws error if the session does not exist
  const entry = await database.SessionByToken.Get([input.userId, input.token]);

  // if (headers['host'] !== entry['host']) {
  //   throw new Error('Unable to refresh token');
  // }

  // if (headers['user-agent'] !== entry['user-agent']) {
  //   throw new Error('Unable to refresh token');
  // }

  // if (headers['client-ip'] !== entry['client-ip']) {
  //   throw new Error('Unable to refresh token');
  // }

  return entry;
};

const invalidate = async (input: { sessionId: string }) => {
  try {
    await database.Sessions.Delete(input.sessionId);
  } catch (error) {
    // Ignore error
  }
};

const session = {
  generateCookie,
  validate,
  invalidate,
};

export default session;
