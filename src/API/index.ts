import auth from 'src/API/auth';
import hours from 'src/API/hours';
export { default as token } from 'src/API/token';

export const actions = {
  auth: auth.actions,
  hours: hours.actions,
};

export const constants = {
  auth: auth.constants,
  hours: hours.constants,
};

export const handlers = {
  auth: auth.handler,
  hours: hours.handler,
};

export type ActionType = (
  Parameter<typeof auth['handler']> | PromiseType<ReturnType<typeof auth['handler']>> |
  Parameter<typeof hours['handler']> | PromiseType<ReturnType<typeof hours['handler']>>
);