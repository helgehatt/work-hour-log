const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure } = require('../common');
const { unpack } = require('./util');

exports.main = async ({ id }) => {
  if (!id) {
    return failure('Missing parameters');
  }

  if (typeof id !== 'string') {
    return failure('Invalid parameters');
  }

  try {
    const response = await client.query(q.Delete(
      q.Ref(q.Collection('hours'), id)
    ));
    return success(unpack(response));
  } catch (error) {
    return failure(error);
  }
};