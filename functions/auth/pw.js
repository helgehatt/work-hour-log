const faunadb = require('faunadb'), q = faunadb.query;
const crypto = require('crypto');
const { client } = require('../common');

exports.verify = async ({ username, password }) => {
  try {
    const dbEntry = await client.query(
      q.Get(q.Match(q.Index('username'), username)),
    ).then(response => response.data);

    const hash = crypto.pbkdf2Sync(password, dbEntry.salt, 10000, 64, 'sha512');
  
    return dbEntry.password === hash.toString('base64');    
  } catch (error) {
    return false;
  }
};