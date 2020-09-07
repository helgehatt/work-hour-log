const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure } = require('../common');
const { unpack } = require('./util');

exports.main = async ({ id, start, stop }) => {
  if (!id || !start || !stop) {
    return failure('Missing parameters');
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  try {
    const response = await client.query(q.Update(
      q.Ref(q.Collection('hours'), id), 
      { data: { start, stop } },
    ));    
    return success(unpack(response));
  } catch (error) {
    return failure(error);
  }
};