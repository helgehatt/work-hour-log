export interface DatabaseResponse<T = {}> {
  ref: { id: string };
  ts: number;
  data: T;
}

export interface DatabaseHour {
  start: string;
  stop: string;
  break?: string;
  project?: string;
  userId: string;
}

export interface DatabaseSession {
  userId: string;
  token: string;
  host: string;
  'user-agent': string;
  'client-ip': string;
}

export interface DatabaseUser {
  username: string;
  salt: string;
  password: string;
}

export type DatabaseIndexKey = string | string[];
export type DatabaseCollectionName = 'hours' | 'sessions';
export type DatabaseIndexName = 'user-by-username' | 'session-by-token' | 'hours-by-month';
