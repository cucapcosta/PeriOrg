import { useRef } from 'react';
import styles from './DateTimePicker.module.css';

interface Props {
  value: string; // ISO datetime-local string (internal)
  onChange: (val: string) => void;
}

function isoToDisplay(iso: string): string {
  if (!iso) return '';
  const [datePart, timePart] = iso.split('T');
  if (!datePart) return '';
  const [y, m, d] = datePart.split('-');
  return `${d}/${m}/${y}${timePart ? ' ' + timePart : ''}`;
}

export function DateTimePicker({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>PRAZO</label>
      <div className={styles.wrapper}>
        <button type="button" className={styles.display} onClick={openPicker}>
          {value ? isoToDisplay(value) : 'Selecione data e hora'}
        </button>
        <input
          ref={inputRef}
          type="datetime-local"
          className={styles.hiddenInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
