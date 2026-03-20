export const theme = {
  colors: {
    bgPrimary: '#0a0e1a',
    bgSecondary: '#0f1628',
    glassBg: 'rgba(10, 25, 47, 0.70)',
    glassBorder: 'rgba(0, 212, 255, 0.15)',
    accentPrimary: '#00d4ff',
    accentSecondary: '#7b61ff',
    accentSuccess: '#00ff88',
    accentWarning: '#ffaa00',
    accentDanger: '#ff3366',
    textPrimary: 'rgba(255, 255, 255, 0.95)',
    textSecondary: 'rgba(255, 255, 255, 0.60)',
    textMuted: 'rgba(255, 255, 255, 0.35)',
  },
  priority: {
    0: '#ff3366', // Critical
    1: '#ffaa00', // High
    2: '#00d4ff', // Medium
    3: '#7b61ff', // Low
  } as Record<number, string>,
} as const;
