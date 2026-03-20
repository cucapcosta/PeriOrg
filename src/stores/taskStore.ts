import { create } from 'zustand';
import type { Task, ScoredTask } from '../models/types';
import { rankTasks } from '../services/scoringEngine';

interface TaskStore {
  activeTasks: Task[];
  rankedTasks: ScoredTask[];
  currentMission: ScoredTask | null;
  nextMission: ScoredTask | null;
  setActiveTasks: (tasks: Task[]) => void;
  recomputeRanking: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  activeTasks: [],
  rankedTasks: [],
  currentMission: null,
  nextMission: null,

  setActiveTasks: (tasks: Task[]) => {
    set({ activeTasks: tasks });
    get().recomputeRanking();
  },

  recomputeRanking: () => {
    const { activeTasks } = get();
    const ranked = rankTasks(activeTasks);
    set({
      rankedTasks: ranked,
      currentMission: ranked[0] ?? null,
      nextMission: ranked[1] ?? null,
    });
  },
}));
