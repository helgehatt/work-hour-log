import auth from 'src/API/auth';
import hours from 'src/API/hours';
import token from 'src/API/token';
import Subscriptions from 'src/API/Subscriptions';

export type APIEvent =
  | Parameter<typeof auth['handler']>
  | PromiseType<ReturnType<typeof auth['handler']>>
  | Parameter<typeof hours['handler']>
  | PromiseType<ReturnType<typeof hours['handler']>>;

export type APIAction = (event: APIEvent) => void;

const actions = {
  auth: auth.actions,
  hours: hours.actions,
};

const constants = {
  auth: auth.constants,
  hours: hours.constants,
};

const handler = (event: any): Promise<APIEvent> | undefined => auth.handler(event) || hours.handler(event);

const subscriptions = new Subscriptions<APIAction>();

export default {
  actions,
  constants,
  handler,
  token,
  subscriptions,
};
