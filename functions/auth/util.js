
exports.base64Encode = (input) => {
  return Buffer.from(JSON.stringify(input)).toString('base64');
};

exports.base64Decode = (input) => {
  return JSON.parse(Buffer.from(input, 'base64').toString('ascii'));
};