import { memo } from 'react';

interface BalloonSVGProps {
  className?: string;
  size?: number;
}

const BalloonSVG = memo(({ className = '', size = 32 }: BalloonSVGProps) => {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 32 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="16"
        cy="16"
        rx="12"
        ry="16"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M16 32L16 44"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
      />
    </svg>
  );
});

BalloonSVG.displayName = 'BalloonSVG';

export default BalloonSVG;
