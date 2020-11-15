/// <reference types="react-scripts" />

type Parameter<T> = Parameters<T>[0];
type UnionType<T> = T[keyof T];
type PromiseType<T> = T extends PromiseLike<infer U> ? U : never;

interface WorkHourEntry {
  id: string
  start: string
  stop: string
  project?: string
}

interface WorkHourDay extends Record<string, WorkHourEntry> {}
interface WorkHourMonth extends Record<string, WorkHourDay> {}
interface WorkHourLog extends Record<string, WorkHourMonth> {}