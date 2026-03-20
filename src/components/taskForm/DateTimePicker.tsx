import styles from './DateTimePicker.module.css';

interface Props {
  value: string; // ISO datetime-local string
  onChange: (val: string) => void;
}

export function DateTimePicker({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>DEADLINE</label>
      <input
        type="datetime-local"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
