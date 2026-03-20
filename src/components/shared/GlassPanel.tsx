import type { ReactNode, CSSProperties } from 'react';
import styles from '../../styles/glass.module.css';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  light?: boolean;
  onClick?: () => void;
}

export function GlassPanel({ children, className = '', style, light, onClick }: Props) {
  return (
    <div
      className={`${light ? styles.panelLight : styles.panel} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
