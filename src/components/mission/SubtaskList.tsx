import type { Subtask } from '../../models/types';
import { toggleSubtask } from '../../services/taskService';
import { CheckIcon } from '../shared/IconSet';
import styles from './SubtaskList.module.css';

interface Props {
  taskId: number;
  subtasks: Subtask[];
}

export function SubtaskList({ taskId, subtasks }: Props) {
  if (subtasks.length === 0) return null;

  const sorted = [...subtasks].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.list}>
      <div className={styles.header}>SUBTASKS</div>
      {sorted.map((sub) => (
        <button
          key={sub.id}
          className={`${styles.item} ${sub.completed ? styles.completed : ''}`}
          onClick={() => toggleSubtask(taskId, sub.id)}
        >
          <span className={styles.check}>
            {sub.completed && <CheckIcon size={14} color="var(--accent-success)" />}
          </span>
          <span className={styles.text}>{sub.text}</span>
        </button>
      ))}
    </div>
  );
}
