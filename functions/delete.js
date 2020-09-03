const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }
  
  const { id } = JSON.parse(event.body || '{}');

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return callback(null, failure(error, 401));
  }

  if (!id) {
    return callback(null, failure('Missing parameters'));
  }

  try {
    const response = await client.query(q.Delete(
      q.Ref(q.Collection('work-hour-log'), id)
    ));    
    return callback(null, success(unpack(response)));
  } catch (error) {
    return callback(null, failure(error));
  }
};