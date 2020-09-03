const faunadb = require('faunadb');
const jwt = require('jsonwebtoken');

exports.client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
}

exports.verify = (headers) => {
  if (!headers['authorization']) throw new Error('authorization header missing');

  const [type, credentials] = headers['authorization'].split(' ');

  return type === 'Bearer' && jwt.verify(credentials, process.env.JWT_SECRET_KEY);
};

exports.sign = () => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, process.env.JWT_SECRET_KEY);

exports.success = (response, statusCode = 200) => {
  const body = JSON.stringify(typeof response === 'object' ? response : { 
    response: String(response),
  });
  return ({ statusCode, body, headers });
};

exports.failure = (error, statusCode = 400) => {
  const body = JSON.stringify({
    message: error instanceof Error ? error.message : String(error || 'Unknown'),
  });
  return ({ statusCode, body, headers });
};

exports.unpack = ({ ref, data }) => ({ id: ref.id, ...data });