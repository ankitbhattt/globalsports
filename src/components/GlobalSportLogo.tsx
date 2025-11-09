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
  const logoUrl = `${process.env.PUBLIC_URL || ''}/globalsportlogo.png`;

  return (
    <div className={`globalsport-logo ${size} ${animated ? 'animated' : ''} ${className}`}>
      <img
        src={logoUrl}
        alt="Global Sports logo"
        className="logo-image"
        loading="lazy"
      />
    </div>
  );
};

export default GlobalSportLogo;
