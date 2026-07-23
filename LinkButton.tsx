import React, { useState, useRef } from 'react';
import { BaseLink } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { SITE_DATA } from '../data';
import Icon from './Icon';

interface LinkButtonProps {
  link: BaseLink;
  showSource?: boolean;
  key?: any;
}

export function findLinkSource(href: string) {
  for (const card of SITE_DATA) {
    if (card.links) {
      const match = card.links.find(l => l.href === href);
      if (match) {
        return { cardTitle: card.title, sectionTitle: '' };
      }
    }
    if (card.sections) {
      for (const section of card.sections) {
        if (section.links) {
          const match = section.links.find(l => l.href === href);
          if (match) {
            return { cardTitle: card.title, sectionTitle: section.title };
          }
        }
      }
    }
    if (card.initiatives && card.initiatives.links) {
      const match = card.initiatives.links.find(l => l.href === href);
      if (match) {
        return { cardTitle: card.title, sectionTitle: card.initiatives.title };
      }
    }
    if (card.departments) {
      for (const dept of card.departments) {
        if (dept.links) {
          const match = dept.links.find(l => l.href === href);
          if (match) {
            return { cardTitle: card.title, sectionTitle: dept.title };
          }
        }
      }
    }
  }
  return null;
}

export default function LinkButton({ link, showSource = false }: LinkButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [clickState, setClickState] = useState<'normal' | 'loading' | 'failed' | 'fading-out' | 'removed'>('normal');
  const lastClickTime = useRef<number>(0);
  const timeouts = useRef<number[]>([]);

  const favorited = isFavorite(link.href);
  const source = showSource ? findLinkSource(link.href) : null;

  if (clickState === 'removed') return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (link.specialAction === 'ghim-fail') {
      e.preventDefault();

      const DBL_CLICK_THRESHOLD = 400;
      const now = new Date().getTime();
      const lastClick = lastClickTime.current;

      if (now - lastClick < DBL_CLICK_THRESHOLD) {
        timeouts.current.forEach(t => window.clearTimeout(t));
        setClickState('normal');
        window.open(link.href, '_blank', 'noopener,noreferrer');
      } else {
        lastClickTime.current = now;

        if (clickState !== 'normal') return;

        const t1 = window.setTimeout(() => setClickState('loading'), 10);
        const t2 = window.setTimeout(() => setClickState('failed'), 1500);
        const t3 = window.setTimeout(() => setClickState('fading-out'), 3500);
        const t4 = window.setTimeout(() => setClickState('removed'), 4100);

        timeouts.current = [t1, t2, t3, t4];
      }
    }
  };

  const getButtonClass = () => {
    let cls = 'link-button';
    if (clickState === 'loading') cls += ' is-loading';
    if (clickState === 'failed') cls += ' is-failed';
    if (clickState === 'fading-out') cls += ' is-fading-out';
    return cls;
  };

  const isGhim = link.specialAction === 'ghim-fail';

  return (
    <div className="relative w-full group z-10">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${getButtonClass()} pl-14 pr-6`}
        onClick={handleClick}
      >
        <span className="btn-content-wrapper">
          <span className="btn-content original flex flex-col md:flex-row md:items-center justify-center gap-1.5 md:gap-3">
            <span className="flex flex-col items-center justify-center gap-0.5">
              <span className="flex items-center gap-2">
                {link.icon && <Icon name={link.icon} />}
                <span>{link.text}</span>
              </span>
              {link.subtext && (
                <span className="text-[11px] font-medium text-amber-300/90 leading-tight">
                  {link.subtext}
                </span>
              )}
            </span>
            {showSource && source && (
              <span className="inline-flex items-center text-[10px] md:text-[11px] font-medium bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full border border-amber-400/20 whitespace-nowrap self-center transition-all leading-none">
                {source.cardTitle}{source.sectionTitle ? ` • ${source.sectionTitle}` : ''}
              </span>
            )}
          </span>
          
          {isGhim && (
            <>
              <span className="btn-content loading">
                <i className="fas fa-spinner fa-spin"></i>
                <span>جاري التحميل...</span>
              </span>
              <span className="btn-content failed">
                <i className="fas fa-exclamation-circle"></i>
                <span>فشل التحميل</span>
              </span>
            </>
          )}
        </span>
      </a>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(link);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-amber-400 cursor-pointer hover:bg-amber-400/20 hover:border-amber-400/40 active:scale-90 transition-all duration-200"
        aria-label={favorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        title={favorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      >
        <i className={`${favorited ? 'fas fa-star text-amber-400' : 'far fa-star text-gray-400 group-hover:text-amber-400/80'} text-base`} />
      </button>
    </div>
  );
}
