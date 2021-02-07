const database = require('../database');
const { success, failure } = require('../common');

exports.main = async ({ userId, start, stop, project }) => {
  if (!start || !stop) {
    return failure('Missing parameters');
  }

  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  if (!(project == null || typeof project === 'string')) {
    return failure('Invalid parameters');
  }

  try {
    const response = await database.Collection('hours').Create({ start, stop, project, userId });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
