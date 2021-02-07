const crypto = require('crypto');
const database = require('../database');
const { urlEncode } = require('./util');

exports.generateCookie = async ({ userId, headers }) => {
  const token = urlEncode(crypto.randomBytes(32).toString('base64'));

  try {
    await database.Collection('sessions').Create({
      userId,
      token,
      host: headers['host'],
      'user-agent': headers['user-agent'],
      'client-ip': headers['client-ip'],
    });

    // The Max-Age coincides with FaunaDB TTL setting
    return `session=${token}; Max-Age=${30 * 24 * 3600}; HttpOnly; SameSite=Strict`;
  } catch (error) {
    // Ignore error
  }
};

exports.validate = async ({ userId, token, headers }) => {
  // Throws error if the session does not exist
  const entry = await database.Index('session-by-token').Get([userId, token]);

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

exports.invalidate = async ({ sessionId }) => {
  try {
    await database.Collection('sessions').Delete(sessionId);
  } catch (error) {
    // Ignore error
  }
};
