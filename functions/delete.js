const faunadb = require('faunadb'), q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = function(event, context) {
  if (!event.body || !event.body.id) {
    return { statusCode: 400, body: 'Missing parameters' };
  }

  return client.query(q.Delete(q.Ref(q.Collection('work-hour-log'), id)))
    .then(response => ({ statusCode: 200, body: JSON.stringify(response) }))
    .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}