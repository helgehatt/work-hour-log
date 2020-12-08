const faunadb = require('faunadb');
const q = faunadb.query;
const { client, success, failure, unpack } = require('../common');

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
    const response = await client
      .query(q.Create(q.Collection('hours'), { data: { start, stop, project, userId } }))
      .then(unpack);

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
