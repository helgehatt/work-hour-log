const faunadb = require('faunadb'), q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
}

exports.handler = function(event, context) {
  return client.query(q.Map(
    q.Paginate(q.Documents(q.Collection('work-hour-log'))), 
    q.Lambda('i', q.Get(q.Var('i')))
  ))
  .then(response => response.data.map(({ ref, data }) => ({ _id: ref.id, ...data })))
  .then(response => ({ statusCode: 200, body: JSON.stringify(response), headers }))
  .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}