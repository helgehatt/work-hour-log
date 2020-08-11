const faunadb = require('faunadb'), q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = function(event, context) {
  return client.query(q.Map(
    q.Paginate(q.Documents(q.Collection('work-hour-log'))), 
    q.Lambda('i', q.Get(q.Var('i')))
  ))
  .then(response => response.data.map(entry => entry.data))
  .then(response => ({ statusCode: 200, body: JSON.stringify(response) }))
  .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}