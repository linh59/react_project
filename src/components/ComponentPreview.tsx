
import { ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
}

const ComponentPreview = ({ children }: ComponentPreviewProps) => {
  return (
    <div className="min-h-[100px] flex items-center justify-center p-4 bg-background rounded-lg border border-border/50">
      {children}
    </div>
  );
};

export default ComponentPreview;
