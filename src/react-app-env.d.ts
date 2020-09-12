/// <reference types="react-scripts" />

interface WorkHourEntry {
  id: string
  start: string
  stop: string
}

interface WorkHourDay extends Record<string, WorkHourEntry> {}
interface WorkHourMonth extends Record<string, WorkHourDay> {}
interface WorkHourLog extends Record<string, WorkHourMonth> {}