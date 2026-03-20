import { useUIStore } from '../../stores/uiStore';
import { TargetIcon, ListIcon, PlusIcon } from '../shared/IconSet';
import styles from './NavBar.module.css';

export function NavBar() {
  const currentView = useUIStore((s) => s.currentView);
  const setView = useUIStore((s) => s.setView);
  const openTaskForm = useUIStore((s) => s.openTaskForm);

  return (
    <nav className={styles.nav}>
      <button
        className={`${styles.item} ${currentView === 'mission' ? styles.active : ''}`}
        onClick={() => setView('mission')}
      >
        <TargetIcon size={22} />
        <span>MISSÃO</span>
      </button>

      <button
        className={styles.addBtn}
        onClick={() => openTaskForm()}
      >
        <PlusIcon size={26} color="var(--bg-primary)" />
      </button>

      <button
        className={`${styles.item} ${currentView === 'taskList' ? styles.active : ''}`}
        onClick={() => setView('taskList')}
      >
        <ListIcon size={22} />
        <span>TAREFAS</span>
      </button>
    </nav>
  );
}
