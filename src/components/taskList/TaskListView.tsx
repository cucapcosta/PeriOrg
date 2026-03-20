import { useState } from 'react';
import { motion } from 'motion/react';
import { useTaskStore } from '../../stores/taskStore';
import { GlowText } from '../shared/GlowText';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import type { Priority } from '../../models/types';
import styles from './TaskListView.module.css';

export function TaskListView() {
  const rankedTasks = useTaskStore((s) => s.rankedTasks);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null);

  const filtered = rankedTasks.filter((st) => {
    if (categoryFilter && st.task.categoryId !== categoryFilter) return false;
    if (priorityFilter !== null && st.task.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GlowText as="h2" size="16px">ALL MISSIONS</GlowText>
        <span className={styles.count}>{filtered.length}</span>
      </div>

      <TaskFilters
        categoryFilter={categoryFilter}
        priorityFilter={priorityFilter}
        onCategoryChange={setCategoryFilter}
        onPriorityChange={setPriorityFilter}
      />

      <div className={styles.list}>
        {filtered.map((st, i) => (
          <motion.div
            key={st.task.uid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <TaskCard scored={st} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className={styles.empty}>No missions found</p>
        )}
      </div>
    </div>
  );
}
