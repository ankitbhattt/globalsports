import React from 'react';
import './Global SportLogo.css';

interface Global SportLogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const Global SportLogo: React.FC<Global SportLogoProps> = ({ 
  size = 'medium', 
  animated = true, 
  className = '' 
}) => {
  return (
    <div className={`Global Sport-logo ${size} ${animated ? 'animated' : ''} ${className}`}>
      <div className="logo-container">
        {/* Modern Play Icon with Gradient */}
        <div className="modern-play-icon">
          <svg viewBox="0 0 100 100" className="play-svg">
            <defs>
              <linearGradient id="Global SportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#Global SportGradient)" className="play-circle" />
            <path d="M 40 30 L 40 70 L 65 50 Z" fill="white" className="play-triangle" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="play-ring" />
          </svg>
        </div>
        
        {/* Text with Gradient */}
        <div className="logo-text">
          <span className="text-snap">SNAP</span>
          <span className="text-flix">FLIX</span>
        </div>
      </div>
    </div>
  );
};

export default Global SportLogo;
