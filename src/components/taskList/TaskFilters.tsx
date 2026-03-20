import { useCategories } from '../../hooks/useCategories';
import { Priority } from '../../models/types';
import { theme } from '../../styles/theme';
import styles from './TaskFilters.module.css';

interface Props {
  categoryFilter: string | null;
  priorityFilter: Priority | null;
  onCategoryChange: (uid: string | null) => void;
  onPriorityChange: (p: Priority | null) => void;
}

const PRIORITY_OPTIONS: Array<{ value: Priority; label: string }> = [
  { value: Priority.Critical, label: 'CRÍT' },
  { value: Priority.High, label: 'ALTO' },
  { value: Priority.Medium, label: 'MÉD' },
  { value: Priority.Low, label: 'BAIXO' },
];

export function TaskFilters({
  categoryFilter,
  priorityFilter,
  onCategoryChange,
  onPriorityChange,
}: Props) {
  const categories = useCategories();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <button
          className={`${styles.chip} ${!categoryFilter ? styles.active : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          TODOS
        </button>
        {categories.map((cat) => (
          <button
            key={cat.uid}
            className={`${styles.chip} ${categoryFilter === cat.uid ? styles.active : ''}`}
            style={{
              borderColor: categoryFilter === cat.uid ? cat.color : undefined,
              color: categoryFilter === cat.uid ? cat.color : undefined,
            }}
            onClick={() => onCategoryChange(categoryFilter === cat.uid ? null : cat.uid)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className={styles.row}>
        {PRIORITY_OPTIONS.map((opt) => {
          const active = priorityFilter === opt.value;
          const color = theme.priority[opt.value];
          return (
            <button
              key={opt.value}
              className={`${styles.chip} ${active ? styles.active : ''}`}
              style={{
                borderColor: active ? color : undefined,
                color: active ? color : undefined,
              }}
              onClick={() => onPriorityChange(active ? null : opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
