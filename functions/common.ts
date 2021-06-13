import { HandlerResponse } from '@netlify/functions';

export const success = (response?: any, statusCode = 200): HandlerResponse => {
  if (typeof response !== 'object') {
    response = { response: String(response) };
  }
  return { statusCode, body: JSON.stringify(response) };
};

export const failure = (error: any, statusCode = 400): HandlerResponse => {
  if (error instanceof Error) {
    error = { message: error.message };
  } else if (typeof error !== 'object') {
    error = { message: error ?? 'Unknown' };
  }
  return { statusCode, body: JSON.stringify(error) };
};
