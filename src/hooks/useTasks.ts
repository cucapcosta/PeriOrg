import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { TaskStatus } from '../models/types';
import { useTaskStore } from '../stores/taskStore';

export function useTasks() {
  const setActiveTasks = useTaskStore((s) => s.setActiveTasks);
  const recomputeRanking = useTaskStore((s) => s.recomputeRanking);

  const tasks = useLiveQuery(
    () => db.tasks.where('status').equals(TaskStatus.Active).toArray(),
    [],
    []
  );

  // Sync Dexie live query → Zustand
  useEffect(() => {
    if (tasks) {
      setActiveTasks(tasks);
    }
  }, [tasks, setActiveTasks]);

  // Periodic recompute (deadline scores change with time)
  useEffect(() => {
    const interval = setInterval(() => {
      recomputeRanking();
    }, 60_000);
    return () => clearInterval(interval);
  }, [recomputeRanking]);

  return tasks;
}
