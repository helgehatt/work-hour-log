const faunadb = require('faunadb');
const q = faunadb.query;
const { client, success, failure, unpack } = require('../common');

exports.main = async ({ userId, id }) => {
  if (!id) {
    return failure('Missing parameters');
  }

  if (typeof id !== 'string') {
    return failure('Invalid parameters');
  }

  try {
    const entry = await client.query(q.Get(q.Ref(q.Collection('hours'), id))).then(unpack);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await client.query(q.Delete(q.Ref(q.Collection('hours'), id))).then(unpack);
    return success(response);
  } catch (error) {
    return failure(error);
  }
};
