import React from 'react';
import './GlobalSportLogo.css';

interface GlobalSportLogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const GlobalSportLogo: React.FC<GlobalSportLogoProps> = ({ 
  size = 'medium', 
  animated = true, 
  className = '' 
}) => {
  return (
    <div className={`globalsport-logo ${size} ${animated ? 'animated' : ''} ${className}`}>
      <div className="logo-container">
        {/* Basketball with Wings - Improved Design */}
        <div className="basketball-wings-icon">
          <svg viewBox="0 0 240 100" className="basketball-svg">
            <defs>
              {/* Orange gradient for basketball */}
              <linearGradient id="basketballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9500" />
                <stop offset="50%" stopColor="#FF8C00" />
                <stop offset="100%" stopColor="#FF6600" />
              </linearGradient>
              {/* Blue gradient for wings */}
              <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007BFF" />
                <stop offset="50%" stopColor="#0056B3" />
                <stop offset="100%" stopColor="#004085" />
              </linearGradient>
              {/* Shadow filter */}
              <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Left Wing - More defined */}
            <g className="wing left-wing">
              <path d="M 15 50 Q 5 45 5 50 Q 5 55 15 60 L 20 55 Q 25 50 25 45 Q 20 40 15 45 Z" 
                    fill="url(#wingGradient)" 
                    stroke="#FF9500" 
                    strokeWidth="2"
                    className="wing-path"
                    filter="url(#shadow)" />
              <path d="M 12 52 Q 8 50 10 52 Q 12 54 15 52 Z" 
                    fill="url(#wingGradient)" 
                    opacity="0.8"
                    className="wing-feather" />
            </g>
            
            {/* Basketball - Better proportions */}
            <circle cx="120" cy="50" r="28" fill="url(#basketballGradient)" className="basketball-circle" filter="url(#shadow)" />
            {/* Basketball lines (seams) - More prominent */}
            <path d="M 120 22 Q 135 50 120 78 M 120 22 Q 105 50 120 78" 
                  stroke="#1A2B5B" 
                  strokeWidth="3.5" 
                  fill="none" 
                  className="basketball-lines"
                  strokeLinecap="round" />
            <path d="M 92 50 Q 120 42 148 50 M 92 50 Q 120 58 148 50" 
                  stroke="#1A2B5B" 
                  strokeWidth="3.5" 
                  fill="none" 
                  className="basketball-lines"
                  strokeLinecap="round" />
            
            {/* Right Wing - More defined */}
            <g className="wing right-wing">
              <path d="M 225 50 Q 235 45 235 50 Q 235 55 225 60 L 220 55 Q 215 50 215 45 Q 220 40 225 45 Z" 
                    fill="url(#wingGradient)" 
                    stroke="#FF9500" 
                    strokeWidth="2"
                    className="wing-path"
                    filter="url(#shadow)" />
              <path d="M 228 52 Q 232 50 230 52 Q 228 54 225 52 Z" 
                    fill="url(#wingGradient)" 
                    opacity="0.8"
                    className="wing-feather" />
            </g>
          </svg>
        </div>
        
        {/* Text with better styling */}
        <div className="logo-text">
          <span className="text-global">GLOBAL</span>
          <span className="text-sport">SPORTS</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSportLogo;
