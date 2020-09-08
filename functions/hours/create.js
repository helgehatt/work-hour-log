const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('../common');

exports.main = async ({ userId, start, stop }) => {
  if (!start || !stop) {
    return failure('Missing parameters');
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  try {
    const response = await client.query(q.Create(
      q.Collection('hours'), 
      { data: { userId, start, stop } }
    )).then(unpack);

    return success(response);
  } catch (error) {
    return failure(error);
  }
};