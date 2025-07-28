import { memo } from 'react';

interface PaperPlaneSVGProps {
  className?: string;
  size?: number;
}

const PaperPlaneSVG = memo(({ className = '', size = 28 }: PaperPlaneSVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 14L26 2L20 14L26 26L2 14Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M20 14L8 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.08"
      />
    </svg>
  );
});

PaperPlaneSVG.displayName = 'PaperPlaneSVG';

export default PaperPlaneSVG;
