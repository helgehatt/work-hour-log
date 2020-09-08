const faunadb = require('faunadb');
const jwt = require('./auth/jwt');

exports.client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
}

exports.verify = (headers) => {
  if (!headers['authorization']) {
    throw new Error('authorization header missing');
  }

  const [type, credentials] = headers['authorization'].split(' ');

  if (type !== 'Bearer' || credentials == null) {
    throw new Error('authorization credentials missing')
  }

  return jwt.verify(credentials);
};

exports.sign = jwt.sign;

exports.success = (response, statusCode = 200) => {
  const body = JSON.stringify(typeof response === 'object' ? response : { 
    response: String(response),
  });
  return ({ statusCode, body, headers });
};

exports.failure = (error, statusCode = 400) => {
  const body = JSON.stringify(error instanceof Error ? {
    message: error.message,
  } : typeof error === 'object' ? error : {
    message: error || 'Unknown',
  });
  return ({ statusCode, body, headers });
};

exports.unpack = ({ ref, data }) => ({ id: ref.id, ...data });