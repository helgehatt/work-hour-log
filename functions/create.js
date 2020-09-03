const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }
  
  const { start, stop } = JSON.parse(event.body || '{}');

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return failure(error, 401);
  }

  if (!start || !stop) {
    return failure('Missing parameters');
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  return client.query(q.Create(
    q.Collection('work-hour-log'), 
    { data: { start, stop } }
  ))
  .then(unpack)
  .then(success)
  .catch(failure);
};