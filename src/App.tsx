import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTasks } from './hooks/useTasks';
import { useUIStore } from './stores/uiStore';
import { seedCategories } from './services/taskService';
import { AppShell } from './components/layout/AppShell';
import { MissionDisplay } from './components/mission/MissionDisplay';
import { TaskListView } from './components/taskList/TaskListView';
import { TaskFormModal } from './components/taskForm/TaskFormModal';

function AppContent() {
  const currentView = useUIStore((s) => s.currentView);

  // Bridge Dexie → Zustand
  useTasks();

  // Seed default categories
  useEffect(() => {
    seedCategories();
  }, []);

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {currentView === 'mission' && (
          <motion.div
            key="mission"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MissionDisplay />
          </motion.div>
        )}
        {currentView === 'taskList' && (
          <motion.div
            key="taskList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TaskListView />
          </motion.div>
        )}
        {currentView === 'taskForm' && (
          <motion.div
            key="taskForm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TaskFormModal />
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return <AppContent />;
}
