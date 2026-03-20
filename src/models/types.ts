export enum Priority {
  Critical = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

export enum TaskStatus {
  Active = 'active',
  Completed = 'completed',
  Archived = 'archived',
}

export enum ReminderUnit {
  Minutes = 'min',
  Hours = 'h',
  Days = 'd',
}

export interface Reminder {
  id: string;
  amount: number;
  unit: ReminderUnit;
}

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  order: number;
}

export interface Task {
  id?: number;
  uid: string;
  name: string;
  description: string;
  deadline: Date;
  priority: Priority;
  categoryId: string;
  subtasks: Subtask[];
  reminders: Reminder[];
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Category {
  id?: number;
  uid: string;
  name: string;
  color: string;
}

export interface ScoredTask {
  task: Task;
  urgencyScore: number;
  deadlineScore: number;
  priorityScore: number;
  hoursUntilDeadline: number;
  subtaskProgress: number;
}
