const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }
  
  const { id, start, stop } = JSON.parse(event.body || '{}');

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return callback(null, failure(error, 401));
  }

  if (!id || !start || !stop) {
    return callback(null, failure('Missing parameters'));
  }
  
  if (!Date.parse(start) || !Date.parse(stop)) {
    return callback(null, failure('Invalid parameters'));
  }

  try {
    const response = await client.query(q.Update(
      q.Ref(q.Collection('work-hour-log'), id), 
      { data: { start, stop } },
    ));    
    return callback(null, success(unpack(response)));
  } catch (error) {
    return callback(null, failure(error));
  }
};