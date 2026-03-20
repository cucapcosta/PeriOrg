import { theme } from '../../styles/theme';
import styles from './UrgencyMeter.module.css';

interface Props {
  score: number; // 0 - 125
  size?: number;
}

function getColor(score: number): string {
  if (score >= 90) return theme.colors.accentDanger;
  if (score >= 60) return theme.colors.accentWarning;
  if (score >= 30) return theme.colors.accentPrimary;
  return theme.colors.accentSecondary;
}

export function UrgencyMeter({ score, size = 140 }: Props) {
  const color = getColor(score);
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  // Arc from 135° to 405° (270° sweep)
  const startAngle = 135;
  const sweepAngle = 270;
  const progress = Math.min(score / 100, 1.25);
  const endAngle = startAngle + sweepAngle * (progress / 1.25);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = size / 2;
  const cy = size / 2;

  const arcPath = (start: number, end: number) => {
    const sRad = toRad(start);
    const eRad = toRad(end);
    const x1 = cx + radius * Math.cos(sRad);
    const y1 = cy + radius * Math.sin(sRad);
    const x2 = cx + radius * Math.cos(eRad);
    const y2 = cy + radius * Math.sin(eRad);
    const large = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Track */}
        <path
          d={arcPath(startAngle, startAngle + sweepAngle)}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress */}
        {score > 0 && (
          <path
            d={arcPath(startAngle, endAngle)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
              transition: 'all 0.6s ease',
            }}
          />
        )}
      </svg>
      <div className={styles.label}>
        <span className={styles.value} style={{ color }}>{Math.round(score)}</span>
        <span className={styles.unit}>URGENCY</span>
      </div>
    </div>
  );
}
