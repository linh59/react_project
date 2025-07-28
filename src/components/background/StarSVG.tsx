import { memo } from 'react';

interface StarSVGProps {
  className?: string;
  size?: number;
}

const StarSVG = memo(({ className = '', size = 24 }: StarSVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
  );
});

StarSVG.displayName = 'StarSVG';

export default StarSVG;
