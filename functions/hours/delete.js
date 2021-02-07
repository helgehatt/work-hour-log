const database = require('../database');
const { success, failure } = require('../common');

exports.main = async ({ userId, id }) => {
  if (!id) {
    return failure('Missing parameters');
  }

  if (typeof id !== 'string') {
    return failure('Invalid parameters');
  }

  try {
    const entry = await database.Collection('hours').Get(id);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await database.Collection('hours').Delete(id);
    return success(response);
  } catch (error) {
    return failure(error);
  }
};
