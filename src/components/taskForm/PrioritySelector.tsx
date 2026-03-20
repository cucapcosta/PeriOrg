import { Priority } from '../../models/types';
import { theme } from '../../styles/theme';
import styles from './PrioritySelector.module.css';

interface Props {
  value: Priority;
  onChange: (p: Priority) => void;
}

const OPTIONS: Array<{ value: Priority; label: string }> = [
  { value: Priority.Critical, label: 'CRÍTICO' },
  { value: Priority.High, label: 'ALTO' },
  { value: Priority.Medium, label: 'MÉDIO' },
  { value: Priority.Low, label: 'BAIXO' },
];

export function PrioritySelector({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>PRIORIDADE</label>
      <div className={styles.options}>
        {OPTIONS.map((opt) => {
          const color = theme.priority[opt.value];
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              className={`${styles.option} ${active ? styles.active : ''}`}
              style={{
                borderColor: active ? color : 'rgba(255,255,255,0.1)',
                color: active ? color : 'var(--text-muted)',
                background: active ? `${color}15` : 'transparent',
                boxShadow: active ? `0 0 10px ${color}30` : 'none',
              }}
              onClick={() => onChange(opt.value)}
              type="button"
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
