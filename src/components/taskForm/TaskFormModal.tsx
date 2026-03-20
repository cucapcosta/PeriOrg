import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { Priority, type Reminder } from '../../models/types';
import { createTask, updateTask } from '../../services/taskService';
import { useUIStore } from '../../stores/uiStore';
import { useCategories } from '../../hooks/useCategories';
import { GlassPanel } from '../shared/GlassPanel';
import { GlowButton } from '../shared/GlowButton';
import { GlowText } from '../shared/GlowText';
import { BackIcon } from '../shared/IconSet';
import { PrioritySelector } from './PrioritySelector';
import { DateTimePicker } from './DateTimePicker';
import { CategoryPicker } from './CategoryPicker';
import { SubtaskEditor } from './SubtaskEditor';
import { ReminderEditor } from './ReminderEditor';
import styles from './TaskFormModal.module.css';

function toLocalISO(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function defaultDeadline(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(18, 0, 0, 0);
  return toLocalISO(d);
}

export function TaskFormModal() {
  const editingTaskId = useUIStore((s) => s.editingTaskId);
  const closeTaskForm = useUIStore((s) => s.closeTaskForm);
  const categories = useCategories();

  const editingTask = useLiveQuery(
    () => (editingTaskId ? db.tasks.get(editingTaskId) : undefined),
    [editingTaskId]
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [deadline, setDeadline] = useState(defaultDeadline);
  const [categoryId, setCategoryId] = useState('');
  const [subtasks, setSubtasks] = useState<Array<{ id: string; text: string }>>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDeadline(toLocalISO(new Date(editingTask.deadline)));
      setCategoryId(editingTask.categoryId);
      setSubtasks(editingTask.subtasks.map((s) => ({ id: s.id, text: s.text })));
      setReminders(editingTask.reminders ?? []);
    }
  }, [editingTask]);

  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      setCategoryId(categories[0].uid);
    }
  }, [categories, categoryId]);

  const isValid = name.trim().length > 0 && deadline.length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    const deadlineDate = new Date(deadline);

    if (editingTaskId && editingTask) {
      await updateTask(editingTaskId, {
        name: name.trim(),
        description: description.trim(),
        priority,
        deadline: deadlineDate,
        categoryId,
        subtasks: subtasks.map((s, i) => ({
          id: s.id,
          text: s.text,
          completed: editingTask.subtasks.find((es) => es.id === s.id)?.completed ?? false,
          order: i,
        })),
        reminders,
      });
    } else {
      await createTask({
        name: name.trim(),
        description: description.trim(),
        priority,
        deadline: deadlineDate,
        categoryId,
        subtasks: subtasks.map((s) => ({ text: s.text })),
        reminders,
      });
    }

    closeTaskForm();
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={closeTaskForm}>
          <BackIcon size={22} color="var(--accent-primary)" />
        </button>
        <GlowText as="h2" size="16px">
          {editingTaskId ? 'EDITAR MISSÃO' : 'NOVA MISSÃO'}
        </GlowText>
      </div>

      <div className={styles.form}>
        <GlassPanel style={{ padding: '18px 16px' }}>
          <div className={styles.field}>
            <label className={styles.label}>NOME DA MISSÃO</label>
            <input
              className={styles.input}
              placeholder="O que precisa ser feito?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>DESCRIÇÃO</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Detalhes opcionais..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <PrioritySelector value={priority} onChange={setPriority} />

          <DateTimePicker value={deadline} onChange={setDeadline} />

          <CategoryPicker value={categoryId} onChange={setCategoryId} />

          <SubtaskEditor subtasks={subtasks} onChange={setSubtasks} />

          <ReminderEditor reminders={reminders} onChange={setReminders} />
        </GlassPanel>

        <GlowButton
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {editingTaskId ? 'ATUALIZAR MISSÃO' : 'CRIAR MISSÃO'}
        </GlowButton>
      </div>
    </motion.div>
  );
}
