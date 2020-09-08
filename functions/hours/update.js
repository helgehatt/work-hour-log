const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('../common');

exports.main = async ({ userId, id, start, stop }) => {
  if (!id || !start || !stop) {
    return failure('Missing parameters');
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  try {
    const entry = await client.query(q.Get(
      q.Ref(q.Collection('hours'), id)
    )).then(unpack);

    if (entry.userId !== userId) {
      return failure({ entry, userId });
    }

    const response = await client.query(q.Update(
      q.Ref(q.Collection('hours'), id), 
      { data: { userId, start, stop } },
    )).then(unpack);
    
    return success(response);
  } catch (error) {
    return failure(error);
  }
};