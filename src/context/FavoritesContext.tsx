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
    let isAdded = false;
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.href === link.href);
      if (exists) {
        isAdded = false;
        return prev.filter((fav) => fav.href !== link.href);
      } else {
        isAdded = true;
        return [...prev, link];
      }
    });

    const source = findLinkSource(link.href);
    const levelName = source ? source.cardTitle : '';
    const title = link.text || 'الرابط المختار';
    addToast(title, isAdded ? 'add' : 'remove', levelName);
  };

  const isFavorite = (href: string) => {
    return favorites.some((fav) => fav.href === href);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
      
      {/* Toast Notifications Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }}
              className="pointer-events-auto flex items-center justify-between gap-3.5 px-4 py-3 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-md text-white font-sans text-sm w-full"
              style={{
                direction: 'rtl',
                boxShadow: toast.type === 'add'
                  ? '0 10px 25px -5px rgba(0,0,0,0.4), 0 0 15px -3px rgba(34,197,94,0.15)'
                  : '0 10px 25px -5px rgba(0,0,0,0.4), 0 0 15px -3px rgba(239,68,68,0.15)'
              }}
            >
              <div className="flex items-center gap-3">
                {/* Icon status indicator */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 ${
                  toast.type === 'add'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  <Icon name={toast.type === 'add' ? 'fa-heart' : 'fa-trash-alt'} className="text-xs" />
                </div>
                
                {/* Text fields */}
                <div className="flex flex-col text-right pr-1">
                  <span className="font-extrabold text-[13px] text-slate-100 leading-tight">
                    {toast.message}
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans max-w-[200px] truncate leading-normal mt-0.5">
                    {toast.title}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1 flex items-center justify-center rounded-lg hover:bg-white/5 shrink-0"
              >
                <Icon name="fa-times" className="text-xs" />
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
