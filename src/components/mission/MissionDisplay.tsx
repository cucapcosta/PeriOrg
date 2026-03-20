import { motion } from 'motion/react';
import { useTaskStore } from '../../stores/taskStore';
import { useUIStore } from '../../stores/uiStore';
import { completeTask, archiveTask } from '../../services/taskService';
import { GlassPanel } from '../shared/GlassPanel';
import { GlowButton } from '../shared/GlowButton';
import { GlowText } from '../shared/GlowText';
import { ProgressRing } from '../shared/ProgressRing';
import { EditIcon, ArchiveIcon } from '../shared/IconSet';
import { UrgencyMeter } from './UrgencyMeter';
import { MissionDetails } from './MissionDetails';
import { SubtaskList } from './SubtaskList';
import { NextMissionTeaser } from './NextMissionTeaser';
import styles from './MissionDisplay.module.css';

export function MissionDisplay() {
  const currentMission = useTaskStore((s) => s.currentMission);
  const nextMission = useTaskStore((s) => s.nextMission);
  const openTaskForm = useUIStore((s) => s.openTaskForm);

  if (!currentMission) {
    return (
      <div className={styles.empty}>
        <GlowText as="h2" size="20px" color="var(--accent-secondary)">
          NENHUMA MISSÃO ATIVA
        </GlowText>
        <p className={styles.emptyHint}>
          Adicione uma tarefa para iniciar sua missão
        </p>
      </div>
    );
  }

  const { task, urgencyScore, subtaskProgress } = currentMission;
  const taskId = task.id!;

  return (
    <div className={styles.container}>
      <motion.div
        key={task.uid}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.headerRow}>
          <GlowText as="span" size="11px" color="var(--text-muted)">
            MISSÃO ATUAL
          </GlowText>
        </div>

        <div className={styles.meters}>
          <UrgencyMeter score={urgencyScore} size={130} />
          {task.subtasks.length > 0 && (
            <ProgressRing
              progress={subtaskProgress}
              size={80}
              strokeWidth={5}
              color="var(--accent-success)"
            >
              <span className={styles.progressLabel}>
                {Math.round(subtaskProgress * 100)}%
              </span>
            </ProgressRing>
          )}
        </div>

        <GlassPanel style={{ padding: '20px 18px' }}>
          <MissionDetails scored={currentMission} />

          {task.subtasks.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <SubtaskList taskId={taskId} subtasks={task.subtasks} />
            </div>
          )}
        </GlassPanel>

        <div className={styles.actions}>
          <GlowButton
            variant="success"
            size="lg"
            fullWidth
            onClick={() => completeTask(taskId)}
          >
            COMPLETAR MISSÃO
          </GlowButton>
          <div className={styles.secondaryActions}>
            <GlowButton
              variant="secondary"
              size="sm"
              onClick={() => openTaskForm(taskId)}
            >
              <EditIcon size={14} /> EDITAR
            </GlowButton>
            <GlowButton
              variant="danger"
              size="sm"
              onClick={() => archiveTask(taskId)}
            >
              <ArchiveIcon size={14} /> ARQUIVAR
            </GlowButton>
          </div>
        </div>

        {nextMission && <NextMissionTeaser scored={nextMission} />}
      </motion.div>
    </div>
  );
}
