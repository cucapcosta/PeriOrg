import type { ScoredTask } from '../../models/types';
import { useCategories } from '../../hooks/useCategories';
import { StatusBadge } from '../shared/StatusBadge';
import { GlowText } from '../shared/GlowText';
import styles from './MissionDetails.module.css';

interface Props {
  scored: ScoredTask;
}

function formatCountdown(hours: number): string {
  if (hours <= 0) {
    const overdue = Math.abs(hours);
    if (overdue < 1) return `ATRASADO ${Math.round(overdue * 60)}min`;
    if (overdue < 24) return `ATRASADO ${Math.round(overdue)}h`;
    return `ATRASADO ${Math.round(overdue / 24)}d`;
  }
  if (hours < 1) return `${Math.round(hours * 60)}min restantes`;
  if (hours < 24) return `${Math.round(hours)}h restantes`;
  const days = Math.floor(hours / 24);
  const rem = Math.round(hours % 24);
  return `${days}d ${rem}h restantes`;
}

export function MissionDetails({ scored }: Props) {
  const { task, hoursUntilDeadline } = scored;
  const categories = useCategories();
  const category = categories.find((c) => c.uid === task.categoryId);
  const isOverdue = hoursUntilDeadline <= 0;

  return (
    <div className={styles.details}>
      <div className={styles.topRow}>
        <StatusBadge priority={task.priority} />
        {category && (
          <span className={styles.category} style={{ color: category.color }}>
            {category.name}
          </span>
        )}
      </div>

      <GlowText as="h1" size="22px" style={{ marginTop: 8, lineHeight: 1.2 }}>
        {task.name}
      </GlowText>

      {task.description && (
        <p className={styles.desc}>{task.description}</p>
      )}

      <div
        className={`${styles.countdown} ${isOverdue ? styles.overdue : ''}`}
      >
        {formatCountdown(hoursUntilDeadline)}
      </div>
    </div>
  );
}
