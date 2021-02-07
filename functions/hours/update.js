const database = require('../database');
const { success, failure } = require('../common');

exports.main = async ({ userId, id, start, stop, project }) => {
  if (!id || !start || !stop) {
    return failure('Missing parameters');
  }

  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  if (!(project == null || typeof project === 'string')) {
    return failure('Invalid parameters');
  }

  try {
    const entry = await database.Collection('hours').Get(id);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await database.Collection('hours').Update(id, { start, stop, project, userId });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
