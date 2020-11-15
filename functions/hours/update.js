const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('../common');

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
    const entry = await client.query(q.Get(
      q.Ref(q.Collection('hours'), id)
    )).then(unpack);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await client.query(q.Update(
      q.Ref(q.Collection('hours'), id), 
      { data: { start, stop, project, userId } },
    )).then(unpack);

    return success(response);
  } catch (error) {
    return failure(error);
  }
};