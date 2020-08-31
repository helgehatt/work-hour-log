const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {  
  const { id } = event.queryStringParameters;

  if (!id) {
    return failure('Missing parameters');
  }

  return client.query(q.Delete(
    q.Ref(q.Collection('work-hour-log'), id)
  ))
  .then(unpack)
  .then(success)
  .catch(failure);
};