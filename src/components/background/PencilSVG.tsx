import { memo } from 'react';

interface PencilSVGProps {
  className?: string;
  size?: number;
}

const PencilSVG = memo(({ className = '', size = 36 }: PencilSVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 30L30 6L24 0L0 24L6 30Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M8 28L28 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.08"
      />
    </svg>
  );
});

PencilSVG.displayName = 'PencilSVG';

export default PencilSVG;
