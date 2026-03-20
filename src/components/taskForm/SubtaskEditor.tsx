import { useState } from 'react';
import { CloseIcon, PlusIcon } from '../shared/IconSet';
import styles from './SubtaskEditor.module.css';

interface SubtaskDraft {
  id: string;
  text: string;
}

interface Props {
  subtasks: SubtaskDraft[];
  onChange: (subtasks: SubtaskDraft[]) => void;
}

let counter = 0;

export function SubtaskEditor({ subtasks, onChange }: Props) {
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    onChange([...subtasks, { id: `draft-${++counter}`, text: input.trim() }]);
    setInput('');
  };

  const remove = (id: string) => {
    onChange(subtasks.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>SUBTAREFAS</label>

      {subtasks.map((s) => (
        <div key={s.id} className={styles.item}>
          <span className={styles.text}>{s.text}</span>
          <button type="button" className={styles.removeBtn} onClick={() => remove(s.id)}>
            <CloseIcon size={14} color="var(--text-muted)" />
          </button>
        </div>
      ))}

      <div className={styles.addRow}>
        <input
          className={styles.input}
          placeholder="Adicionar subtarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <button type="button" className={styles.addBtn} onClick={add}>
          <PlusIcon size={16} color="var(--accent-primary)" />
        </button>
      </div>
    </div>
  );
}
