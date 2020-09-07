const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure } = require('../common');
const { unpack } = require('./util');

exports.main = async () => {
  try {
    const response = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection('hours'))),
      q.Lambda('i', q.Get(q.Var('i'))),
    ));    
    return success(transform(response));
  } catch (error) {
    return failure(error);
  }
};

const transform = (response) => response.data
  .map(unpack)
  .reduce((acc, entry) => {
    const key = entry.start.substr(0,10);
    acc[key] = Object.assign(acc[key] || {}, { [entry.id]: entry });
    return acc;
  }, {});