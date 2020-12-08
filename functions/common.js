const faunadb = require('faunadb');

exports.client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// Wrap headers in function for immutability
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
});

exports.success = (response, statusCode = 200) => {
  const body = JSON.stringify(typeof response === 'object' ? response : { response: String(response) });
  return { statusCode, body, headers: getHeaders() };
};

exports.failure = (error, statusCode = 400) => {
  const body = JSON.stringify(
    error instanceof Error
      ? { message: error.message }
      : typeof error === 'object'
      ? error
      : { message: error || 'Unknown' }
  );
  return { statusCode, body, headers: getHeaders() };
};

exports.unpack = ({ ref, data }) => ({ id: ref.id, ...data });
