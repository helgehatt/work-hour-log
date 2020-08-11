const faunadb = require('faunadb'), q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = function(event, context) {
  if (!event.body || !event.body.id) {
    return { statusCode: 400, body: 'Missing parameters' };
  }

  const { id, start, stop } = event.body;
  
  return client.query(q.Update(
    q.Ref(q.Collection('work-hour-log'), id), 
    { data: { start, stop } }
  ))
  .then(response => ({ statusCode: 200, body: JSON.stringify(response) }))
  .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}