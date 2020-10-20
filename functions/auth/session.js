const faunadb = require('faunadb'), q = faunadb.query;
const crypto = require('crypto');
const { client, unpack } = require('../common');
const { urlEncode } = require('./util');

exports.generateCookie = async ({ userId, headers }) => {
  const token = urlEncode(crypto.randomBytes(32).toString('base64'));

  try {
    await client.query(q.Create(
      q.Collection('sessions'), { data: { 
        userId,
        token,
        'host': headers['host'],
        'user-agent': headers['user-agent'],
        'client-ip': headers['client-ip'],
      }},
    ));
    
    return `session=${token}; Max-Age=${30 * 24 * 3600}; HttpOnly; SameSite=Strict`;
  } catch (error) {
    // Ignore error
  }
};

exports.validate = async ({ userId, token, headers }) => {

  const entry = await client.query(
    q.Get(q.Match(q.Index('session-by-token'), [userId, token])),
  ).then(unpack);

  if (headers['host'] !== entry['host']) {
    throw new Error('Unable to refresh token');
  }

  if (headers['user-agent'] !== entry['user-agent']) {
    throw new Error('Unable to refresh token');
  }

  if (headers['client-ip'] !== entry['client-ip']) {
    throw new Error('Unable to refresh token');
  }

  return entry;
};

exports.invalidate = async ({ sessionId }) => {
  try {
    await client.query(q.Delete(
      q.Ref(q.Collection('sessions'), sessionId),
    ));
  } catch (error) {
    // Ignore error
  }
};
