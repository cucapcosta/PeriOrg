import { Priority, TaskStatus, type Task, type ScoredTask } from '../models/types';

const HORIZON_HOURS = 336; // 14 days
const OVERDUE_BONUS = 25;

const PRIORITY_SCORES: Record<Priority, number> = {
  [Priority.Critical]: 100,
  [Priority.High]: 70,
  [Priority.Medium]: 40,
  [Priority.Low]: 15,
};

const DEADLINE_WEIGHT = 0.65;
const PRIORITY_WEIGHT = 0.35;

export function computeHoursUntilDeadline(deadline: Date, now: Date = new Date()): number {
  return (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
}

export function computeDeadlineScore(hoursLeft: number): number {
  if (hoursLeft <= 0) {
    return 100 + OVERDUE_BONUS;
  }
  if (hoursLeft >= HORIZON_HOURS) {
    return 0;
  }
  const ratio = 1 - hoursLeft / HORIZON_HOURS;
  return 100 * ratio * ratio;
}

export function computePriorityScore(priority: Priority): number {
  return PRIORITY_SCORES[priority];
}

export function computeUrgencyScore(deadlineScore: number, priorityScore: number): number {
  return deadlineScore * DEADLINE_WEIGHT + priorityScore * PRIORITY_WEIGHT;
}

export function computeSubtaskProgress(task: Task): number {
  if (task.subtasks.length === 0) return 0;
  const completed = task.subtasks.filter(s => s.completed).length;
  return completed / task.subtasks.length;
}

export function scoreTask(task: Task, now: Date = new Date()): ScoredTask {
  const hoursUntilDeadline = computeHoursUntilDeadline(task.deadline, now);
  const deadlineScore = computeDeadlineScore(hoursUntilDeadline);
  const priorityScore = computePriorityScore(task.priority);
  const urgencyScore = computeUrgencyScore(deadlineScore, priorityScore);
  const subtaskProgress = computeSubtaskProgress(task);

  return {
    task,
    urgencyScore,
    deadlineScore,
    priorityScore,
    hoursUntilDeadline,
    subtaskProgress,
  };
}

export function rankTasks(tasks: Task[], now: Date = new Date()): ScoredTask[] {
  return tasks
    .filter(t => t.status === TaskStatus.Active)
    .map(t => scoreTask(t, now))
    .sort((a, b) => b.urgencyScore - a.urgencyScore);
}
