exports.success = (response, statusCode = 200) => {
  const body = JSON.stringify(typeof response === 'object' ? response : { response: String(response) });
  return { statusCode, body };
};

exports.failure = (error, statusCode = 400) => {
  const body = JSON.stringify(
    error instanceof Error
      ? { message: error.message }
      : typeof error === 'object'
      ? error
      : { message: error || 'Unknown' }
  );
  return { statusCode, body };
};
