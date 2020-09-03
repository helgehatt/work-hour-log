const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }
  
  const { id } = event.queryStringParameters;

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return failure(error, 401);
  }

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