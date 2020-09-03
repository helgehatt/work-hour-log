const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return success();
  }

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return failure(error, 401);
  }

  return client.query(q.Map(
    q.Paginate(q.Documents(q.Collection('work-hour-log'))), 
    q.Lambda('i', q.Get(q.Var('i')))
  ))
  .then(transform)
  .then(success)
  .catch(failure);
};

const transform = (response) => response.data
  .map(unpack)
  .reduce((acc, entry) => {
    const key = entry.start.substr(0,10);
    acc[key] = Object.assign(acc[key] || {}, { [entry.id]: entry });
    return acc;
  }, {});