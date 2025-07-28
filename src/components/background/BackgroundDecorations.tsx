import { memo, useMemo } from 'react';
import CloudSVG from './CloudSVG';
import BookSVG from './BookSVG';
import StarSVG from './StarSVG';
import PencilSVG from './PencilSVG';
import BalloonSVG from './BalloonSVG';
import PaperPlaneSVG from './PaperPlaneSVG';

const BackgroundDecorations = memo(() => {
  const decorations = useMemo(() => {
    const hour = new Date().getHours();
    
    // Morning: 5:00 AM - 11:59 AM
    if (hour >= 5 && hour < 12) {
      return [
        { Component: CloudSVG, className: 'text-yellow-300 animate-float', style: { top: '10%', left: '15%', animationDelay: '0s' } },
        { Component: BookSVG, className: 'text-blue-300 animate-bounce-gentle', style: { top: '20%', right: '20%', animationDelay: '1s' } },
        { Component: PencilSVG, className: 'text-green-300 animate-float', style: { bottom: '30%', left: '10%', animationDelay: '2s' } },
        { Component: BalloonSVG, className: 'text-pink-300 animate-float', style: { top: '40%', right: '15%', animationDelay: '1.5s' } },
        { Component: StarSVG, className: 'text-yellow-400 animate-pulse', style: { top: '15%', left: '70%', animationDelay: '3s' } },
        { Component: PaperPlaneSVG, className: 'text-blue-400 animate-bounce-gentle', style: { bottom: '20%', right: '25%', animationDelay: '2.5s' } },
      ];
    }
    
    // Afternoon: 12:00 PM - 5:59 PM
    if (hour >= 12 && hour < 18) {
      return [
        { Component: CloudSVG, className: 'text-orange-300 animate-float', style: { top: '15%', left: '20%', animationDelay: '0s' } },
        { Component: BookSVG, className: 'text-purple-300 animate-bounce-gentle', style: { top: '25%', right: '15%', animationDelay: '1s' } },
        { Component: BalloonSVG, className: 'text-red-300 animate-float', style: { bottom: '25%', left: '15%', animationDelay: '2s' } },
        { Component: PencilSVG, className: 'text-teal-300 animate-float', style: { top: '35%', right: '20%', animationDelay: '1.5s' } },
        { Component: StarSVG, className: 'text-orange-400 animate-pulse', style: { top: '10%', left: '65%', animationDelay: '3s' } },
        { Component: PaperPlaneSVG, className: 'text-purple-400 animate-bounce-gentle', style: { bottom: '35%', right: '30%', animationDelay: '2.5s' } },
      ];
    }
    
    // Evening: 6:00 PM - 8:59 PM
    if (hour >= 18 && hour < 21) {
      return [
        { Component: CloudSVG, className: 'text-purple-300 animate-float', style: { top: '12%', left: '18%', animationDelay: '0s' } },
        { Component: BookSVG, className: 'text-pink-300 animate-bounce-gentle', style: { top: '30%', right: '18%', animationDelay: '1s' } },
        { Component: StarSVG, className: 'text-purple-400 animate-pulse', style: { top: '20%', left: '75%', animationDelay: '3s' } },
        { Component: StarSVG, className: 'text-pink-400 animate-pulse', style: { bottom: '40%', left: '5%', animationDelay: '4s' } },
        { Component: BalloonSVG, className: 'text-indigo-300 animate-float', style: { bottom: '30%', right: '12%', animationDelay: '2s' } },
        { Component: PaperPlaneSVG, className: 'text-purple-500 animate-bounce-gentle', style: { top: '45%', right: '25%', animationDelay: '2.5s' } },
      ];
    }
    
    // Night: 9:00 PM - 4:59 AM
    return [
      { Component: CloudSVG, className: 'text-indigo-300 animate-float', style: { top: '18%', left: '25%', animationDelay: '0s' } },
      { Component: StarSVG, className: 'text-blue-300 animate-pulse', style: { top: '10%', left: '60%', animationDelay: '1s' } },
      { Component: StarSVG, className: 'text-indigo-400 animate-pulse', style: { top: '25%', right: '30%', animationDelay: '2s' } },
      { Component: StarSVG, className: 'text-purple-300 animate-pulse', style: { bottom: '35%', left: '20%', animationDelay: '3s' } },
      { Component: BookSVG, className: 'text-slate-300 animate-bounce-gentle', style: { bottom: '25%', right: '20%', animationDelay: '1.5s' } },
      { Component: BalloonSVG, className: 'text-blue-400 animate-float', style: { top: '40%', right: '15%', animationDelay: '2.5s' } },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {decorations.map((decoration, index) => {
        const { Component, className, style } = decoration;
        return (
          <div
            key={index}
            className={`absolute ${className}`}
            style={style}
          >
            <Component />
          </div>
        );
      })}
      
      {/* Mobile - Show fewer decorations */}
      <div className="hidden sm:block">
        {decorations.slice(0, 3).map((decoration, index) => {
          const { Component, className, style } = decoration;
          return (
            <div
              key={`mobile-${index}`}
              className={`absolute ${className}`}
              style={{
                ...style,
                top: `${parseInt(style.top || '0%') + 10}%`,
                left: `${parseInt(style.left || '0%') + 5}%`,
                opacity: 0.08,
              }}
            >
              <Component size={24} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

BackgroundDecorations.displayName = 'BackgroundDecorations';

export default BackgroundDecorations;
