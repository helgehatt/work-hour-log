const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }
  
  const { start, stop } = JSON.parse(event.body || '{}');

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return callback(null, failure(error, 401));
  }

  if (!start || !stop) {
    return callback(null, failure('Missing parameters'));
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return callback(null, failure('Invalid parameters'));
  }

  try {
    const response = await client.query(q.Create(
      q.Collection('work-hour-log'), 
      { data: { start, stop } }
    ));    
    return callback(null, success(unpack(response)));
  } catch (error) {
    return callback(null, failure(error));
  }
};