import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Header.css';
import GlobalSportLogo from './GlobalSportLogo';
import { useTranslation } from '../contexts/TranslationContext';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { language, setLanguage, t } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'fr', name: 'Français (French)', flag: '🇫🇷' }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode as 'en' | 'zh' | 'fr');
    setShowLanguageDropdown(false);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!showMobileMenu) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu-toggle')) {
          setShowMobileMenu(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMobileMenu]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu]);

  // const handleProfileAction = (action: string) => {
  //   setShowProfileDropdown(false);
  //   setShowMobileMenu(false);
  //   if (action === 'login' && onNavigate) {
  //     onNavigate('login');
  //   } else if (action === 'videos' && onNavigate) {
  //     onNavigate('videos');
  //   } else if (action === 'faq' && onNavigate) {
  //     onNavigate('faq');
  //   } else if (action === 'about' && onNavigate) {
  //     onNavigate('about');
  //   }
  // };

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setShowMobileMenu(false);
  };

  const mobileMenuPortal = showMobileMenu
    ? createPortal(
        <div
          className="mobile-menu-overlay"
          onClick={() => setShowMobileMenu(false)}
          role="presentation"
        >
          <div
            className="mobile-menu"
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            <div className="mobile-menu-content">
              <div className="mobile-menu-nav">
                <button 
                  className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavigation('home')}
                >
                  <span className="mobile-nav-icon">🏠</span>
                  {t('header.home')}
                </button>
                <button 
                  className={`mobile-nav-link ${currentPage === 'videos' ? 'active' : ''}`}
                  onClick={() => handleNavigation('videos')}
                >
                  <span className="mobile-nav-icon">🎬</span>
                  {t('header.videos')}
                </button>
                <button 
                  className={`mobile-nav-link ${currentPage === 'favorites' ? 'active' : ''}`}
                  onClick={() => handleNavigation('favorites')}
                >
                  <span className="mobile-nav-icon">❤️</span>
                  FAVORITES
                </button>
                <button 
                  className={`mobile-nav-link ${currentPage === 'subscription' ? 'active' : ''}`}
                  onClick={() => handleNavigation('subscription')}
                >
                  <span className="mobile-nav-icon">💳</span>
                  {t('header.subscribe')}
                </button>
                <button 
                  className="mobile-nav-link"
                  onClick={() => {
                    setShowMobileMenu(false);
                    // setShowSearch(true); // Removed search state
                  }}
                >
                  <span className="mobile-nav-icon">🔍</span>
                  Search
                </button>
                <button 
                  className="mobile-nav-link"
                  onClick={() => handleNavigation('login')}
                >
                  <span className="mobile-nav-icon">🔑</span>
                  LOGIN
                </button>
              </div>
              
              <div className="mobile-menu-divider"></div>
              
              {/* <div className="mobile-menu-profile">
                ...
              </div> */}
              
              <div className="mobile-menu-divider"></div>
              
              <div className="mobile-menu-language">
                <div className="mobile-language-label">Language</div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`mobile-language-option ${language === lang.code ? 'selected' : ''}`}
                    onClick={() => {
                      handleLanguageSelect(lang.code);
                      setShowMobileMenu(false);
                    }}
                  >
                    <span className="mobile-nav-icon">{lang.flag}</span>
                    {lang.name}
                    {language === lang.code && <span className="check-icon">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => handleNavigation('home')}>
          <GlobalSportLogo size="medium" animated={true} />
        </div>
        
        {/* Search disabled for now */}
        
        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${showMobileMenu ? 'active' : ''}`}
          onClick={(event) => {
            event.stopPropagation();
            setShowMobileMenu((prev) => !prev);
          }}
          aria-expanded={showMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <nav className="navigation">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            {t('header.home')}
          </button>
          <button 
            className={`nav-link ${currentPage === 'videos' ? 'active' : ''}`}
            onClick={() => handleNavigation('videos')}
          >
            {t('header.videos')}
          </button>
          <button 
            className={`nav-link ${currentPage === 'favorites' ? 'active' : ''}`}
            onClick={() => handleNavigation('favorites')}
          >
            FAVORITES
          </button>
          {/* <button 
            className="nav-link search-nav-btn"
            onClick={() => {
              // setShowSearch(true); // Removed search state
            }}
          >
            <span className="search-nav-icon">🔍</span>
            Search
          </button> */}
          <button 
            className="nav-link"
            onClick={() => handleNavigation('login')}
          >
            LOGIN
          </button>
        </nav>
        
        {mobileMenuPortal}
        
        <div className="header-actions">
          <div className="language-selector" ref={languageRef}>
            <button 
              className="action-btn language-btn"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span className="language-icon">
                {languages.find(lang => lang.code === language)?.flag || '🌐'}
              </span>
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span className="radio-indicator">
                      {language === lang.code && <div className="radio-dot"></div>}
                    </span>
                    <span className="language-flag">{lang.flag}</span>
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            className="subscribe-btn"
            onClick={() => onNavigate && onNavigate('subscription')}
          >
            {t('header.subscribe')}
          </button>
          
          {/* <div className="profile-dropdown" ref={profileRef}>
            <button 
              className={`action-btn profile-btn ${showProfileDropdown ? 'active' : ''}`}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <span className="profile-icon">👤</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {showProfileDropdown && (
              <div className="profile-menu">
                <div className="profile-menu-item" onClick={() => handleProfileAction('login')}>
                  <span className="menu-icon">🔑</span>
                  {t('login.title')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('videos')}>
                  <span className="menu-icon">🎬</span>
                  {t('header.videos')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('faq')}>
                  <span className="menu-icon">❓</span>
                  {t('profile.menu.faq')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('about')}>
                  <span className="menu-icon">ℹ️</span>
                  {t('profile.menu.about')}
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
