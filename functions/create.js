const faunadb = require('faunadb'), q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = function(event, context) {
  if (!event.body || !event.body.start || !event.body.stop) {
    return { statusCode: 400, body: 'Missing parameters' };
  }
  
  const { start, stop } = event.body;

  if (!Date.parse(start) || !Date.parse(stop)) {
    return { statusCode: 400, body: 'Invalid parameters' };
  }

  return client.query(q.Create(
    q.Collection('work-hour-log'), 
    { data: { start, stop } }
  ))
  .then(response => ({ statusCode: 200, body: JSON.stringify(response) }))
  .catch(error => ({ statusCode: 400, body: JSON.stringify(error) }));
}