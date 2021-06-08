interface DatabaseResponse<T = {}> {
  ref: { id: string };
  ts: number;
  data: T;
}

interface DatabaseHour {
  start: string;
  stop: string;
  break?: string;
  project?: string;
  userId: string;
}

interface DatabaseSession {
  userId: string;
  token: string;
  host: string;
  'user-agent': string;
  'client-ip': string;
}

interface DatabaseUser {
  username: string;
  salt: string;
  password: string;
}

type DatabaseIndexKey = string | string[];
type DatabaseCollectionName = 'hours' | 'sessions';
type DatabaseIndexName = 'user-by-username' | 'session-by-token' | 'hours-by-month';
