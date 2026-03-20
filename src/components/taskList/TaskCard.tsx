import type { ScoredTask } from '../../models/types';
import { useCategories } from '../../hooks/useCategories';
import { useUIStore } from '../../stores/uiStore';
import { GlassPanel } from '../shared/GlassPanel';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressRing } from '../shared/ProgressRing';
import styles from './TaskCard.module.css';

interface Props {
  scored: ScoredTask;
}

function formatDeadlineShort(hours: number): string {
  if (hours <= 0) {
    const h = Math.abs(hours);
    if (h < 1) return `${Math.round(h * 60)}m over`;
    if (h < 24) return `${Math.round(h)}h over`;
    return `${Math.round(h / 24)}d over`;
  }
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${Math.round(hours)}h`;
  return `${Math.round(hours / 24)}d`;
}

export function TaskCard({ scored }: Props) {
  const { task, urgencyScore, hoursUntilDeadline } = scored;
  const categories = useCategories();
  const category = categories.find((c) => c.uid === task.categoryId);
  const openTaskForm = useUIStore((s) => s.openTaskForm);
  const isOverdue = hoursUntilDeadline <= 0;

  return (
    <GlassPanel
      light
      className={styles.card}
      onClick={() => openTaskForm(task.id)}
    >
      <div className={styles.left}>
        <div className={styles.topRow}>
          <StatusBadge priority={task.priority} />
          {category && (
            <span className={styles.category} style={{ color: category.color }}>
              {category.name}
            </span>
          )}
        </div>
        <div className={styles.name}>{task.name}</div>
        <div className={`${styles.deadline} ${isOverdue ? styles.overdue : ''}`}>
          {formatDeadlineShort(hoursUntilDeadline)}
        </div>
      </div>
      <div className={styles.right}>
        <ProgressRing
          progress={urgencyScore / 100}
          size={44}
          strokeWidth={3}
          color={isOverdue ? 'var(--accent-danger)' : 'var(--accent-primary)'}
        >
          <span className={styles.score}>{Math.round(urgencyScore)}</span>
        </ProgressRing>
        {task.subtasks.length > 0 && (
          <span className={styles.subtaskCount}>
            {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}
          </span>
        )}
      </div>
    </GlassPanel>
  );
}
