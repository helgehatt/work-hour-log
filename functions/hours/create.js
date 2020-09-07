const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure } = require('../common');
const { unpack } = require('./util');

exports.main = async ({ start, stop }) => {
  if (!start || !stop) {
    return failure('Missing parameters');
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  try {
    const response = await client.query(q.Create(
      q.Collection('hours'), 
      { data: { start, stop } }
    ));    
    return success(unpack(response));
  } catch (error) {
    return failure(error);
  }
};