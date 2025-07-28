import { memo } from 'react';

interface CloudSVGProps {
  className?: string;
  size?: number;
}

const CloudSVG = memo(({ className = '', size = 60 }: CloudSVGProps) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 60 36"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 28C6.716 28 0 21.284 0 13S6.716-2 15-2c3.866 0 7.368 1.456 10.036 3.857C27.404 8.524 30.59 6 34.5 6 40.299 6 45 10.701 45 16.5c0 1.381-.268 2.7-.754 3.904C46.865 21.461 49 24.04 49 27.5 49 31.642 45.642 35 41.5 35H15z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
});

CloudSVG.displayName = 'CloudSVG';

export default CloudSVG;
