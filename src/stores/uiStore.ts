import { create } from 'zustand';

export type AppView = 'mission' | 'taskList' | 'taskForm';

interface UIStore {
  currentView: AppView;
  editingTaskId: number | null;
  isNextMissionRevealed: boolean;
  particlesEnabled: boolean;
  setView: (view: AppView) => void;
  openTaskForm: (taskId?: number) => void;
  closeTaskForm: () => void;
  toggleNextMission: () => void;
  hideNextMission: () => void;
  toggleParticles: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  currentView: 'mission',
  editingTaskId: null,
  isNextMissionRevealed: false,
  particlesEnabled: true,

  setView: (view) => set({ currentView: view, isNextMissionRevealed: false }),
  openTaskForm: (taskId) => set({ currentView: 'taskForm', editingTaskId: taskId ?? null }),
  closeTaskForm: () => set({ currentView: 'mission', editingTaskId: null }),
  toggleNextMission: () => set((s) => ({ isNextMissionRevealed: !s.isNextMissionRevealed })),
  hideNextMission: () => set({ isNextMissionRevealed: false }),
  toggleParticles: () => set((s) => ({ particlesEnabled: !s.particlesEnabled })),
}));
