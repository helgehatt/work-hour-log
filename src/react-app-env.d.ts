/// <reference types="react-scripts" />

interface WorkHourEntry {
  id: string
  start: string
  stop: string
}

interface WorkHourLog extends Record<string, Record<string, WorkHourEntry>> {}