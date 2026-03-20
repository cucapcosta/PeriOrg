import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReminderUnit, type Reminder } from '../../models/types';
import { CloseIcon, PlusIcon } from '../shared/IconSet';
import styles from './ReminderEditor.module.css';

interface Props {
  reminders: Reminder[];
  onChange: (reminders: Reminder[]) => void;
}

const UNIT_LABELS: Record<ReminderUnit, string> = {
  [ReminderUnit.Minutes]: 'min',
  [ReminderUnit.Hours]: 'h',
  [ReminderUnit.Days]: 'd',
};

const UNIT_DISPLAY: Record<ReminderUnit, string> = {
  [ReminderUnit.Minutes]: 'minutos',
  [ReminderUnit.Hours]: 'horas',
  [ReminderUnit.Days]: 'dias',
};

function formatReminder(r: Reminder): string {
  return `${r.amount} ${UNIT_DISPLAY[r.unit]} antes`;
}

export function ReminderEditor({ reminders, onChange }: Props) {
  const [amount, setAmount] = useState('30');
  const [unit, setUnit] = useState<ReminderUnit>(ReminderUnit.Minutes);

  const add = () => {
    const num = parseInt(amount, 10);
    if (!num || num <= 0) return;
    onChange([...reminders, { id: uuidv4(), amount: num, unit }]);
    setAmount('30');
  };

  const remove = (id: string) => {
    onChange(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>NOTIFICAÇÕES</label>
      <span className={styles.hint}>Lembrar antes do prazo (opcional)</span>

      {reminders.map((r) => (
        <div key={r.id} className={styles.item}>
          <span className={styles.text}>{formatReminder(r)}</span>
          <button type="button" className={styles.removeBtn} onClick={() => remove(r.id)}>
            <CloseIcon size={14} color="var(--text-muted)" />
          </button>
        </div>
      ))}

      <div className={styles.addRow}>
        <input
          type="number"
          className={styles.amountInput}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <div className={styles.unitGroup}>
          {([ReminderUnit.Minutes, ReminderUnit.Hours, ReminderUnit.Days] as const).map((u) => (
            <button
              key={u}
              type="button"
              className={`${styles.unitBtn} ${unit === u ? styles.unitActive : ''}`}
              onClick={() => setUnit(u)}
            >
              {UNIT_LABELS[u]}
            </button>
          ))}
        </div>
        <button type="button" className={styles.addBtn} onClick={add}>
          <PlusIcon size={16} color="var(--accent-primary)" />
        </button>
      </div>
    </div>
  );
}
