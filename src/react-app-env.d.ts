/// <reference types="react-scripts" />

interface WorkHourEntry {
  _id: string
  start: string
  stop: string
}

interface WorkHourLog extends Record<string, Array<WorkHourEntry>> {}