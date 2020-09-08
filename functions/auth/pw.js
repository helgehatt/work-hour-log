const faunadb = require('faunadb'), q = faunadb.query;
const crypto = require('crypto');
const { client, unpack } = require('../common');

exports.verify = async ({ username, password }) => {
  try {
    const entry = await client.query(
      q.Get(q.Match(q.Index('user-by-username'), username)),
    ).then(unpack);

    const hash = crypto.pbkdf2Sync(password, entry.salt, 10000, 64, 'sha512');
  
    if (entry.password === hash.toString('base64')) {
      return {
        sub: entry.id,
        name: entry.username,
      }
    }
  } catch (error) {
    // Ignore error
  }
};