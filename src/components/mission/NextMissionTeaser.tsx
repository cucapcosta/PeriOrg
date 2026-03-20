import { AnimatePresence, motion } from 'motion/react';
import type { ScoredTask } from '../../models/types';
import { useUIStore } from '../../stores/uiStore';
import { GlassPanel } from '../shared/GlassPanel';
import { StatusBadge } from '../shared/StatusBadge';
import { GlowText } from '../shared/GlowText';
import styles from './NextMissionTeaser.module.css';

interface Props {
  scored: ScoredTask;
}

export function NextMissionTeaser({ scored }: Props) {
  const isRevealed = useUIStore((s) => s.isNextMissionRevealed);
  const toggle = useUIStore((s) => s.toggleNextMission);
  const { task, urgencyScore } = scored;

  return (
    <div className={styles.wrapper}>
      <button className={styles.trigger} onClick={toggle}>
        <span className={styles.pulse} />
        <span className={styles.label}>NEXT MISSION AVAILABLE</span>
        <span className={styles.score}>{Math.round(urgencyScore)}</span>
      </button>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <GlassPanel light style={{ padding: 16, marginTop: 8 }}>
              <div className={styles.row}>
                <StatusBadge priority={task.priority} />
                <GlowText size="14px">{task.name}</GlowText>
              </div>
              {task.description && (
                <p className={styles.desc}>{task.description}</p>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
