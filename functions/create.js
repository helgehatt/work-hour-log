const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {
  const { start, stop } = JSON.parse(event.body || '{}');

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