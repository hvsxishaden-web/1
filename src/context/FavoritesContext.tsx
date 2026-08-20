import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BaseLink } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import Icon from '../components/Icon';
import { SITE_DATA } from '../data';

export interface ToastType {
  id: string;
  message: string;
  title: string;
  type: 'add' | 'remove';
}

interface FavoritesContextType {
  favorites: BaseLink[];
  toggleFavorite: (link: BaseLink) => void;
  isFavorite: (href: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function findLinkSource(href: string) {
  for (const card of SITE_DATA) {
    if (card.links) {
      if (card.links.some(l => l.href === href)) {
        return { cardTitle: card.title };
      }
    }
    if (card.sections) {
      for (const section of card.sections) {
        if (section.links && section.links.some(l => l.href === href)) {
          return { cardTitle: card.title };
        }
      }
    }
    if (card.initiatives && card.initiatives.links) {
      if (card.initiatives.links.some(l => l.href === href)) {
        return { cardTitle: card.title };
      }
    }
    if (card.departments) {
      for (const dept of card.departments) {
        if (dept.links && dept.links.some(l => l.href === href)) {
          return { cardTitle: card.title };
        }
      }
    }
  }
  return null;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<BaseLink[]>(() => {
    try {
      const stored = localStorage.getItem('cs_guide_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading favorites from localStorage:', e);
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('cs_guide_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error writing favorites to localStorage:', e);
    }
  }, [favorites]);

  const addToast = (title: string, type: 'add' | 'remove', levelName?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const message = type === 'add' 
      ? (levelName ? `تمت إضافة الرابط للمفضلة (${levelName})` : 'تمت إضافة الرابط للمفضلة') 
      : (levelName ? `تمت إزالة الرابط من المفضلة (${levelName})` : 'تمت إزالة الرابط من المفضلة');
    const newToast = { id, message, title, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (link: BaseLink) => {
    const exists = favorites.some((fav) => fav.href === link.href);
    const willBeAdded = !exists;

    setFavorites((prev) => {
      if (exists) {
        return prev.filter((fav) => fav.href !== link.href);
      } else {
        return [...prev, link];
      }
    });

    const source = findLinkSource(link.href);
    const levelName = source ? source.cardTitle : '';
    const title = link.text || 'الرابط المختار';
    addToast(title, willBeAdded ? 'add' : 'remove', levelName);
  };

  const isFavorite = (href: string) => {
    return favorites.some((fav) => fav.href === href);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
      
      {/* Toast Notifications Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 max-w-[640px] w-[94vw] sm:w-full px-2 sm:px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }}
              className="favorites-toast-card pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-5 py-4 sm:px-7 sm:py-5 rounded-2xl sm:rounded-3xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-xl text-white font-sans w-full min-h-[72px]"
              style={{
                direction: 'rtl',
                boxShadow: toast.type === 'add'
                  ? '0 16px 36px -6px rgba(0,0,0,0.55), 0 0 24px -2px rgba(34,197,94,0.25)'
                  : '0 16px 36px -6px rgba(0,0,0,0.55), 0 0 24px -2px rgba(239,68,68,0.25)'
              }}
            >
              <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
                {/* Icon status indicator */}
                <div className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shrink-0 ${
                  toast.type === 'add'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 favorites-toast-icon-add'
                    : 'bg-red-500/15 text-red-400 border border-red-500/30 favorites-toast-icon-remove'
                }`}>
                  <Icon name={toast.type === 'add' ? 'fa-heart' : 'fa-trash-alt'} className="text-sm sm:text-base" />
                </div>
                
                {/* Text fields */}
                <div className="flex flex-col text-right pr-0.5 flex-1 min-w-0 justify-center gap-0.5">
                  <span className="font-bold text-xs sm:text-sm text-slate-100 leading-snug break-words favorites-toast-msg">
                    {toast.message}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-normal leading-relaxed break-words line-clamp-2 favorites-toast-sub">
                    {toast.title}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-2 flex items-center justify-center rounded-xl hover:bg-white/10 shrink-0 mr-1 cursor-pointer favorites-toast-close"
                aria-label="إغلاق الإشعار"
              >
                <Icon name="fa-times" className="text-xs sm:text-sm" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
