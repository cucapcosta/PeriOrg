import type { ReactNode } from 'react';
import { HudFrame } from './HudFrame';
import { ParticleField } from './ParticleField';
import { NavBar } from './NavBar';
import styles from './AppShell.module.css';

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className={styles.shell}>
      <ParticleField />
      <HudFrame />
      <div className={styles.content}>
        {children}
      </div>
      <NavBar />
    </div>
  );
}
