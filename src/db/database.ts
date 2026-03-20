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

    // v2: limpa categorias em inglês para re-seed em português
    this.version(2).stores({
      tasks: '++id, uid, status, categoryId, priority, deadline',
      categories: '++id, uid, name',
    }).upgrade(tx => {
      return tx.table('categories').clear();
    });
  }
}

export const db = new OrgPersDB();
