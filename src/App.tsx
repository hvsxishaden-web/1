import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardData, BaseLink } from './types';
import { SITE_DATA, PRIMARY_FILTERS, LEVEL_FILTERS, CAMPUS_FILTERS, PRESET_THEMES } from './data';
import StarfieldCanvas from './components/StarfieldCanvas';
import LinkCard from './components/LinkCard';
import LinkButton from './components/LinkButton';
import WelcomeModal from './components/WelcomeModal';
import FloorMapModal from './components/FloorMapModal';
import { useFavorites } from './context/FavoritesContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    }
  }
};

export default function App() {
  const { favorites } = useFavorites();
  const [activePrimaryFilter, setActivePrimaryFilter] = useState<string>('college');
  const [activeLevelFilter, setActiveLevelFilter] = useState<string>('level-1');
  const [activeCampusFilter, setActiveCampusFilter] = useState<string>('campus-main');
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFloorMapOpen, setIsFloorMapOpen] = useState<boolean>(false);
  const [floorMapGender, setFloorMapGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    const handleOpenFloorPlan = (e: any) => {
      if (e.detail && e.detail.gender) {
        setFloorMapGender(e.detail.gender);
      }
      setIsFloorMapOpen(true);
    };

    window.addEventListener('open-floor-plan', handleOpenFloorPlan);
    return () => {
      window.removeEventListener('open-floor-plan', handleOpenFloorPlan);
    };
  }, []);
  
  // Custom Theme & mode states
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme_mode') as 'light' | 'dark') || 'dark';
  });
  const [primaryColor] = useState<string>(PRESET_THEMES.blue);
  const [favoritesSnapshot, setFavoritesSnapshot] = useState<BaseLink[]>(favorites);

  // Sync theme mode to document body and localStorage
  useEffect(() => {
    if (themeMode === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme_mode', themeMode);
    
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', themeMode === 'light' ? '#f5f9ff' : '#0a0a0a');
    }
  }, [themeMode]);

  // Search logic across all channels, initiatives and groups in SITE_DATA
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: { link: BaseLink; sourceTitle: string; sectionTitle: string }[] = [];

    SITE_DATA.forEach((card) => {
      card.sections?.forEach((sec) => {
        sec.links.forEach((lnk) => {
          if (
            lnk.text.toLowerCase().includes(query) ||
            sec.title.toLowerCase().includes(query) ||
            card.title.toLowerCase().includes(query)
          ) {
            if (!results.some((r) => r.link.href === lnk.href && r.link.text === lnk.text)) {
              results.push({
                link: lnk,
                sourceTitle: card.title,
                sectionTitle: sec.title,
              });
            }
          }
        });
      });
    });
    return results;
  }, [searchQuery]);

  useEffect(() => {
    if (activePrimaryFilter !== 'favorites') {
      setFavoritesSnapshot(favorites);
    } else {
      setFavoritesSnapshot((prev) => {
        // Add newly-starred items instantly to snapshot
        const newItems = favorites.filter((fav) => !prev.some((p) => p.href === fav.href));
        if (newItems.length > 0) {
          return [...prev, ...newItems];
        }
        // If snapshot is empty, initialize it
        if (prev.length === 0 && favorites.length > 0) {
          return favorites;
        }
        return prev;
      });
    }
  }, [activePrimaryFilter, favorites]);

  useEffect(() => {
    // 1. Initial configuration for CSS variables and Mode classes
    const savedMode = 'dark';
    const savedTheme = PRESET_THEMES.blue;

    // Apply color theme roots
    const hexToHsl = (H: string) => {
      let r = 0, g = 0, b = 0;
      if (H.length === 7) {
        r = parseInt(H[1] + H[2], 16);
        g = parseInt(H[3] + H[4], 16);
        b = parseInt(H[5] + H[6], 16);
      }
      r /= 255;
      g /= 255;
      b /= 255;
      const cmin = Math.min(r, g, b);
      const cmax = Math.max(r, g, b);
      const delta = cmax - cmin;
      let h = 0;
      if (delta === 0) h = 0;
      else if (cmax === r) h = ((g - b) / delta) % 6;
      else if (cmax === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      return h;
    };

    const hexToRgb = (hex: string) => {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : null;
    };

    const root = document.documentElement;
    root.style.setProperty('--primary-hue', String(hexToHsl(savedTheme)));
    const rgb = hexToRgb(savedTheme);
    if (rgb) {
      root.style.setProperty('--rgb-primary', rgb);
    }

    // 2. Open Welcome modal check
    const timer = setTimeout(() => {
      setIsWelcomeOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeClose = () => {
    setIsWelcomeOpen(false);
  };

  const handleGoToLevel1 = () => {
    setIsWelcomeOpen(false);
    setActivePrimaryFilter('levels');
    setActiveLevelFilter('level-1');

    setTimeout(() => {
      const card = document.querySelector('.link-card[data-level="level-1"]');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  // Determine which cards to display
  const filteredCards = SITE_DATA.filter((card: CardData) => {
    if (activePrimaryFilter === 'levels') {
      return card.category === 'levels' && card.level === activeLevelFilter;
    }
    if (activePrimaryFilter === 'campuses') {
      return card.category === 'campuses' && card.level === activeCampusFilter;
    }
    return card.category === activePrimaryFilter;
  });

  const handleResetFilter = () => {
    setActivePrimaryFilter('college');
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* 3D Cosmic Space and Parallax Starfield Canvas */}
      <StarfieldCanvas />

      <div className="app-wrapper">
        {/* Glowing Blurred Aurora blobs in background */}
        <div className="aurora-bg">
          <div className="aurora-dot aurora-dot-1"></div>
          <div className="aurora-dot aurora-dot-2"></div>
          <div className="aurora-dot aurora-dot-3"></div>
        </div>

        <div className="container">
          {/* Header */}
          <header className="page-header flex flex-col items-center">
            <h1 className="page-title">دليل الحاسب</h1>
          </header>

          {/* Primary Carousel-like Filters */}
          <div className="filter-carousel-wrapper" id="primary-carousel-wrapper">
            <div className="filter-carousel-track">
              {PRIMARY_FILTERS.map((filter) => {
                const isActive = activePrimaryFilter === filter.id;
                return (
                  <motion.button
                    key={filter.id}
                    className={`filter-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActivePrimaryFilter(filter.id)}
                    role="button"
                    aria-pressed={isActive}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <span>{filter.text}</span>
                    {isActive && (
                      <motion.div
                        layoutId="primary-active-indicator"
                        className="active-indicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
              
              <motion.button
                className={`filter-btn flex items-center justify-center gap-2 ${activePrimaryFilter === 'favorites' ? 'is-active' : ''}`}
                onClick={() => setActivePrimaryFilter('favorites')}
                role="button"
                aria-pressed={activePrimaryFilter === 'favorites'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <i className={`${favorites.length > 0 ? 'fas fa-star text-amber-400' : 'far fa-star text-slate-400'}`}></i>
                <span>المفضلة</span>
                {favorites.length > 0 && (
                  <span className="bg-amber-400 text-slate-950 font-bold text-xs rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center shadow-md">
                    {favorites.length}
                  </span>
                )}
                {activePrimaryFilter === 'favorites' && (
                  <motion.div
                    layoutId="primary-active-indicator"
                    className="active-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Levels secondary Filters */}
          <AnimatePresence initial={false}>
            {activePrimaryFilter === 'levels' && (
              <motion.div
                key="level-carousel"
                initial={{ height: 0, opacity: 0, y: -12, marginBottom: 0 }}
                animate={{ height: 80, opacity: 1, y: 0, marginBottom: '2.5rem' }}
                exit={{ height: 0, opacity: 0, y: -12, marginBottom: 0 }}
                transition={{
                  height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.18, ease: 'easeOut' },
                  y: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                  marginBottom: { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
                }}
                style={{ overflowX: 'auto', overflowY: 'hidden', width: '100%' }}
                className="filter-carousel-wrapper is-visible"
                id="level-carousel-wrapper"
              >
                <div className="filter-carousel-track">
                  {LEVEL_FILTERS.map((level) => {
                    const isActive = activeLevelFilter === level.id;
                    return (
                      <motion.button
                        key={level.id}
                        className={`filter-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveLevelFilter(level.id)}
                        role="button"
                        aria-pressed={isActive}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.93 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <span>{level.text}</span>
                        {isActive && (
                          <motion.div
                            layoutId="level-active-indicator"
                            className="active-indicator"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activePrimaryFilter === 'campuses' && (
              <motion.div
                key="campus-carousel"
                initial={{ height: 0, opacity: 0, y: -12, marginBottom: 0 }}
                animate={{ height: 80, opacity: 1, y: 0, marginBottom: '2.5rem' }}
                exit={{ height: 0, opacity: 0, y: -12, marginBottom: 0 }}
                transition={{
                  height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.18, ease: 'easeOut' },
                  y: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                  marginBottom: { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
                }}
                style={{ overflowX: 'auto', overflowY: 'hidden', width: '100%' }}
                className="filter-carousel-wrapper is-visible"
                id="campus-carousel-wrapper"
              >
                <div className="filter-carousel-track flex justify-center w-full">
                  {CAMPUS_FILTERS.map((campus) => {
                    const isActive = activeCampusFilter === campus.id;
                    return (
                      <motion.button
                        key={campus.id}
                        className={`filter-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveCampusFilter(campus.id)}
                        role="button"
                        aria-pressed={isActive}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.93 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <span>{campus.text}</span>
                        {isActive && (
                          <motion.div
                            layoutId="campus-active-indicator"
                            className="active-indicator"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Cards Grid */}
          <main className="min-h-[400px] w-full relative">
            <AnimatePresence mode="wait">
              {searchQuery.trim() ? (
                <motion.div
                  key="search-results-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <div className="link-card span-full-width p-6 md:p-8">
                    <div className="card-header border-b border-[var(--border)] pb-4 mb-6 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-search text-blue-400 text-xl"></i>
                        <h2 className="card-title m-0 text-lg md:text-xl">نتائج البحث عن "{searchQuery}"</h2>
                      </div>
                      <span className="text-xs md:text-sm bg-blue-500/10 text-blue-300 font-medium px-3 py-1 rounded-full border border-blue-500/20">
                        {searchResults.length} نتيجة
                      </span>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map((item, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="text-[11px] text-slate-400 px-2 font-medium">
                              {item.sourceTitle} • {item.sectionTitle}
                            </span>
                            <LinkButton link={item.link} showSource={false} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-2xl">
                          <i className="fas fa-search"></i>
                        </div>
                        <p className="text-[var(--text-medium)] text-sm">
                          لم يتم العثور على أية قنوات أو مجموعات تطابق بحثك.
                        </p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-full text-xs transition-all cursor-pointer"
                        >
                          مسح البحث
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : activePrimaryFilter === 'favorites' ? (
                <motion.div
                  key="favorites-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <div className="link-card span-full-width p-6 md:p-8">
                    <div className="card-header border-b border-[var(--border)] pb-4 mb-6 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-star text-amber-400 text-2xl animate-pulse"></i>
                        <h2 className="card-title m-0">المفضلة</h2>
                      </div>
                      {favoritesSnapshot.length > 0 && (
                        <span className="text-sm bg-amber-400/10 text-amber-300 font-mono font-medium px-3 py-1 rounded-full border border-amber-400/20">
                          {favoritesSnapshot.length} {favoritesSnapshot.length === 1 ? 'رابط' : 'روابط'}
                        </span>
                      )}
                    </div>

                    {favoritesSnapshot.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoritesSnapshot.map((link, idx) => (
                          <LinkButton key={link.href + '-' + idx} link={link} showSource={true} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center flex flex-col items-center justify-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400/80 text-3xl">
                          <i className="far fa-star"></i>
                        </div>
                        <div className="max-w-md">
                          <h3 className="text-lg font-bold text-[var(--text-light)] mb-2">قائمة المفضلة فارغة.</h3>
                          <p className="text-[var(--text-medium)] text-sm leading-relaxed mb-4">
                            أضف مجموعاتك المفضلة بالضغط على زر ⭐.
                          </p>
                          <button 
                            onClick={handleResetFilter}
                            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-2.5 rounded-full text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            تصفح الدليل
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activePrimaryFilter + '-' + activeLevelFilter + '-' + activeCampusFilter}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={filteredCards.length === 1 ? "w-full flex flex-col items-center" : "links-grid"}
                >
                  {filteredCards.map((card, idx) => (
                    <div key={idx} className={filteredCards.length === 1 ? "w-full max-w-2xl mx-auto" : "w-full"}>
                      <LinkCard card={card} index={idx} />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {filteredCards.length === 0 && activePrimaryFilter !== 'favorites' && !searchQuery.trim() && (
              <div className="empty-state is-visible">
                <i className="fas fa-compass icon"></i>
                <span>لا توجد نتائج تطابق هذا التصنيف.</span>
                <button className="link-button" onClick={handleResetFilter}>
                  عرض الكلية
                </button>
              </div>
            )}
          </main>

          {/* Footer Controls */}
          <footer className="page-footer flex items-center justify-between w-full" dir="rtl">
            <div className="footer-controls flex items-center gap-3">
              <a
                href="https://t.me/Sherisherre"
                className="footer-icon-btn text-2xl"
                target="_blank"
                rel="noopener noreferrer"
                title="تواصل معي على تليجرام"
                aria-label="تواصل معي على تليجرام"
              >
                <i className="fab fa-telegram"></i>
              </a>

              <button
                onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                className="footer-icon-btn text-xl"
                title={themeMode === 'dark' ? 'التحويل للمظهر الفاتح' : 'التحويل للمظهر الداكن'}
                aria-label="تبديل مظهر الموقع"
              >
                <i className={`fas ${themeMode === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-blue-500'}`}></i>
              </button>
            </div>
            
            <span className="footer-link text-base font-medium text-[var(--text-medium)] hover:text-[var(--text-light)] transition-colors duration-250">
              Developed by Sherisherre
            </span>
          </footer>
        </div>
      </div>

      {/* Popups & Modals */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={handleWelcomeClose}
        onGoToLevel1={handleGoToLevel1}
      />

      <FloorMapModal
        isOpen={isFloorMapOpen}
        onClose={() => setIsFloorMapOpen(false)}
        initialGender={floorMapGender}
      />
    </>
  );
}
