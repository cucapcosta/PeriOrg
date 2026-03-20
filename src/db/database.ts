import Dexie, { type Table } from 'dexie';
import type { Task, Category } from '../models/types';

export class OrgPersDB extends Dexie {
  tasks!: Table<Task, number>;
  categories!: Table<Category, number>;

  constructor() {
    super('OrgPersDB');
    this.version(1).stores({
      tasks: '++id, uid, status, categoryId, priority, deadline',
      categories: '++id, uid, name',
    });
  }
}

export const db = new OrgPersDB();
