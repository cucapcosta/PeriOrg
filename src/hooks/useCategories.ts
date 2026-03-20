import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import type { Category } from '../models/types';

export function useCategories(): Category[] {
  const categories = useLiveQuery(() => db.categories.toArray(), [], []);
  return categories;
}
