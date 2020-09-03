const faunadb = require('faunadb'), q = faunadb.query;
const { client, verify, success, failure, unpack } = require('./common');

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, success());
  }

  try {
    const payload = verify(event.headers);
  } catch (error) {
    return callback(null, failure(error, 401));
  }

  try {
    const response = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection('work-hour-log'))),
      q.Lambda('i', q.Get(q.Var('i'))),
    ));    
    return callback(null, success(transform(response)));
  } catch (error) {
    return callback(null, failure(error));
  }
};

const transform = (response) => response.data
  .map(unpack)
  .reduce((acc, entry) => {
    const key = entry.start.substr(0,10);
    acc[key] = Object.assign(acc[key] || {}, { [entry.id]: entry });
    return acc;
  }, {});