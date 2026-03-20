import { Priority } from '../../models/types';
import { theme } from '../../styles/theme';
import styles from './StatusBadge.module.css';

interface Props {
  priority: Priority;
}

const LABELS: Record<Priority, string> = {
  [Priority.Critical]: 'CRITICAL',
  [Priority.High]: 'HIGH',
  [Priority.Medium]: 'MEDIUM',
  [Priority.Low]: 'LOW',
};

export function StatusBadge({ priority }: Props) {
  const color = theme.priority[priority];
  return (
    <span
      className={styles.badge}
      style={{
        color,
        borderColor: color,
        boxShadow: `0 0 8px ${color}40`,
        background: `${color}18`,
      }}
    >
      {LABELS[priority]}
    </span>
  );
}
