const crypto = require('crypto');
const database = require('../database');

exports.verify = async ({ username, password }) => {
  try {
    const entry = await database.Index('user-by-username').Get(username);

    const hash = crypto.pbkdf2Sync(password, entry.salt, 10000, 64, 'sha512');

    if (entry.password === hash.toString('base64')) {
      return {
        sub: entry.id,
        name: entry.username,
      };
    }
  } catch (error) {
    // Ignore error
  }
};
