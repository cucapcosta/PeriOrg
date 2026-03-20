import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { createCategory } from '../../services/taskService';
import { PlusIcon } from '../shared/IconSet';
import styles from './CategoryPicker.module.css';

interface Props {
  value: string; // category uid
  onChange: (uid: string) => void;
}

export function CategoryPicker({ value, onChange }: Props) {
  const categories = useCategories();
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const colors = ['#00d4ff', '#7b61ff', '#00ff88', '#ffaa00', '#ff3366'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    await createCategory(newName.trim(), color);
    setNewName('');
    setShowNew(false);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>CATEGORY</label>
      <div className={styles.chips}>
        {categories.map((cat) => (
          <button
            key={cat.uid}
            type="button"
            className={`${styles.chip} ${value === cat.uid ? styles.active : ''}`}
            style={{
              borderColor: value === cat.uid ? cat.color : 'rgba(255,255,255,0.1)',
              color: value === cat.uid ? cat.color : 'var(--text-secondary)',
              background: value === cat.uid ? `${cat.color}15` : 'transparent',
            }}
            onClick={() => onChange(cat.uid)}
          >
            {cat.name}
          </button>
        ))}
        <button
          type="button"
          className={styles.chip}
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}
          onClick={() => setShowNew(true)}
        >
          <PlusIcon size={12} />
        </button>
      </div>

      {showNew && (
        <div className={styles.newRow}>
          <input
            className={styles.newInput}
            placeholder="Category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <button
            type="button"
            className={styles.newBtn}
            onClick={handleCreate}
          >
            ADD
          </button>
        </div>
      )}
    </div>
  );
}
