import crypto from 'crypto';
import database from '../database';

const verify = async (credentials: { username: string; password: string }) => {
  try {
    const entry = await database.UserByUsername.Get(credentials.username);

    const hash = crypto.pbkdf2Sync(credentials.password, entry.salt, 10000, 64, 'sha512');

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

const pw = {
  verify,
};

export default pw;
