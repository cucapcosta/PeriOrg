import type { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  color?: string;
  size?: string;
  style?: CSSProperties;
  className?: string;
}

export function GlowText({
  children,
  as: Tag = 'span',
  color = 'var(--accent-primary)',
  size,
  style,
  className,
}: Props) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        color,
        textShadow: `0 0 12px ${color}`,
        fontSize: size,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
