const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {
  const { id, start, stop } = JSON.parse(event.body || '{}');

  if (!id || !start || !stop) {
    return failure('Missing parameters');
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }
  
  return client.query(q.Update(
    q.Ref(q.Collection('work-hour-log'), id), 
    { data: { start, stop } }
  ))
  .then(unpack)
  .then(success)
  .catch(failure);
}