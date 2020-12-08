const faunadb = require('faunadb');
const q = faunadb.query;
const { client, success, failure, unpack } = require('../common');

exports.main = async ({ userId, month }) => {
  if (!month) {
    return failure('Missing parameters');
  }

  try {
    const response = await client.query(
      q.Map(q.Paginate(q.Match(q.Index('hours-by-month'), [userId, month])), q.Lambda('i', q.Get(q.Var('i'))))
    );
    return success(transform(response));
  } catch (error) {
    return failure(error);
  }
};

const transform = response =>
  response.data.map(unpack).reduce((acc, entry) => {
    const key = entry.start.substr(0, 10);
    acc[key] = Object.assign(acc[key] || {}, { [entry.id]: entry });
    return acc;
  }, {});
