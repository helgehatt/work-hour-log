const database = require('../database');
const { success, failure } = require('../common');

exports.main = async ({ userId, month }) => {
  if (!month) {
    return failure('Missing parameters');
  }

  try {
    const response = await database.Index('hours-by-month').Paginate([userId, month]);
    return success(transform(response));
  } catch (error) {
    return failure(error);
  }
};

const transform = response =>
  response.reduce((acc, entry) => {
    const key = entry.start.substr(0, 10);
    acc[key] = Object.assign(acc[key] || {}, { [entry.id]: entry });
    return acc;
  }, {});
