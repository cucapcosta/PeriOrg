import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/database';
import { TaskStatus, type Task, type Category, type Subtask, type Reminder } from '../models/types';

export async function createTask(
  data: Pick<Task, 'name' | 'description' | 'deadline' | 'priority' | 'categoryId'> & {
    subtasks?: Array<{ text: string }>;
    reminders?: Reminder[];
  }
): Promise<number> {
  const now = new Date();
  const subtasks: Subtask[] = (data.subtasks ?? []).map((s, i) => ({
    id: uuidv4(),
    text: s.text,
    completed: false,
    order: i,
  }));

  return db.tasks.add({
    uid: uuidv4(),
    name: data.name,
    description: data.description,
    deadline: data.deadline,
    priority: data.priority,
    categoryId: data.categoryId,
    subtasks,
    reminders: data.reminders ?? [],
    status: TaskStatus.Active,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateTask(
  id: number,
  changes: Partial<Pick<Task, 'name' | 'description' | 'deadline' | 'priority' | 'categoryId' | 'subtasks' | 'reminders'>>
): Promise<void> {
  await db.tasks.update(id, {
    ...changes,
    updatedAt: new Date(),
  });
}

export async function completeTask(id: number): Promise<void> {
  const now = new Date();
  await db.tasks.update(id, {
    status: TaskStatus.Completed,
    completedAt: now,
    updatedAt: now,
  });
}

export async function archiveTask(id: number): Promise<void> {
  await db.tasks.update(id, {
    status: TaskStatus.Archived,
    updatedAt: new Date(),
  });
}

export async function deleteTask(id: number): Promise<void> {
  await db.tasks.delete(id);
}

export async function toggleSubtask(taskId: number, subtaskId: string): Promise<void> {
  const task = await db.tasks.get(taskId);
  if (!task) return;

  const subtasks = task.subtasks.map(s =>
    s.id === subtaskId ? { ...s, completed: !s.completed } : s
  );

  await db.tasks.update(taskId, {
    subtasks,
    updatedAt: new Date(),
  });
}

export async function addSubtask(taskId: number, text: string): Promise<void> {
  const task = await db.tasks.get(taskId);
  if (!task) return;

  const subtask: Subtask = {
    id: uuidv4(),
    text,
    completed: false,
    order: task.subtasks.length,
  };

  await db.tasks.update(taskId, {
    subtasks: [...task.subtasks, subtask],
    updatedAt: new Date(),
  });
}

export async function removeSubtask(taskId: number, subtaskId: string): Promise<void> {
  const task = await db.tasks.get(taskId);
  if (!task) return;

  await db.tasks.update(taskId, {
    subtasks: task.subtasks.filter(s => s.id !== subtaskId),
    updatedAt: new Date(),
  });
}

export async function createCategory(name: string, color: string): Promise<number> {
  return db.categories.add({
    uid: uuidv4(),
    name,
    color,
  });
}

export async function updateCategory(id: number, changes: Partial<Pick<Category, 'name' | 'color'>>): Promise<void> {
  await db.categories.update(id, changes);
}

export async function deleteCategory(id: number): Promise<void> {
  await db.categories.delete(id);
}

export async function getDefaultCategory(): Promise<Category> {
  let cat = await db.categories.where('name').equals('Geral').first();
  if (!cat) {
    const id = await db.categories.add({
      uid: uuidv4(),
      name: 'Geral',
      color: '#00d4ff',
    });
    cat = await db.categories.get(id);
  }
  return cat!;
}

export async function seedCategories(): Promise<void> {
  const count = await db.categories.count();
  if (count > 0) return;

  const defaults: Array<{ name: string; color: string }> = [
    { name: 'Geral', color: '#00d4ff' },
    { name: 'Trabalho', color: '#7b61ff' },
    { name: 'Pessoal', color: '#00ff88' },
    { name: 'Saúde', color: '#ff3366' },
    { name: 'Finanças', color: '#ffaa00' },
  ];

  for (const cat of defaults) {
    await db.categories.add({ uid: uuidv4(), name: cat.name, color: cat.color });
  }
}
