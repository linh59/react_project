import { memo } from 'react';

interface BookSVGProps {
  className?: string;
  size?: number;
}

const BookSVG = memo(({ className = '', size = 40 }: BookSVGProps) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 40 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6C4 4.895 4.895 4 6 4h28c1.105 0 2 .895 2 2v20c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2V6z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M8 10h24M8 14h20M8 18h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.08"
      />
    </svg>
  );
});

BookSVG.displayName = 'BookSVG';

export default BookSVG;
