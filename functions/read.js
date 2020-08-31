const faunadb = require('faunadb'), q = faunadb.query;
const { client, success, failure, unpack } = require('./common');

exports.handler = (event, context) => {
  return client.query(q.Map(
    q.Paginate(q.Documents(q.Collection('work-hour-log'))), 
    q.Lambda('i', q.Get(q.Var('i')))
  ))
  .then(transform)
  .then(JSON.stringify)
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