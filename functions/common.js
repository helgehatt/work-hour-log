const faunadb = require('faunadb');

exports.client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
}

exports.success = (response) => {
  const body = typeof response === 'object' ? JSON.stringify(response) : String(response);
  return ({ statusCode: 200, body, headers });
};

exports.failure = (error) => {
  const body = error instanceof Error ? error.message : String(error || 'Unknown');
  return ({ statusCode: 400, body, headers });
};

exports.unpack = ({ ref, data }) => ({ id: ref.id, ...data });