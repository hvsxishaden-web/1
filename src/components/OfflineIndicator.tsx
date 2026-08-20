import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setStatusMessage('online');
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setStatusMessage(null);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsChecking(true);
    
    try {
      // Try to ping or test connectivity with cache-busting
      const response = await fetch(`/?_t=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
      });

      if (response.ok || response.status < 500) {
        setIsOffline(false);
        setStatusMessage('online');
        // Reload page to fetch fresh data if needed
        setTimeout(() => {
          window.location.reload();
        }, 600);
        return;
      }
    } catch {
      // Still offline
      if (navigator.onLine) {
        // navigator says online, let's try reload
        window.location.reload();
        return;
      }
    } finally {
      setTimeout(() => {
        setIsChecking(false);
      }, 800);
    }
  }, []);

  return (
    <AnimatePresence>
      {(isOffline || statusMessage === 'online') && (
        <motion.div
          key="offline-indicator"
          initial={{ opacity: 0, y: -40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="fixed top-4 left-0 right-0 z-[9999] flex justify-center px-3 sm:px-4 pointer-events-none"
          dir="rtl"
        >
          <div
            className={`offline-banner pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-3xl border shadow-xl backdrop-blur-xl max-w-xl w-full transition-all duration-300 ${
              statusMessage === 'online'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100 shadow-emerald-900/20'
                : 'bg-slate-900/95 border-amber-500/30 text-slate-100 shadow-black/40'
            }`}
          >
            {/* Icon & Details */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border offline-indicator-icon ${
                  statusMessage === 'online'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}
              >
                {statusMessage === 'online' ? (
                  <Icon name="fa-check" className="text-sm sm:text-base" />
                ) : (
                  <Icon name="fa-wifi" className="text-sm sm:text-base opacity-80" />
                )}
              </div>

              <div className="flex flex-col text-right min-w-0">
                {statusMessage === 'online' ? (
                  <>
                    <span className="font-bold text-xs sm:text-sm text-emerald-200 leading-tight">
                      تمت استعادة الاتصال بالإنترنت
                    </span>
                    <span className="text-[11px] sm:text-xs text-emerald-300/80 mt-0.5">
                      جاري تحديث البيانات...
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-amber-300 offline-banner-title">
                        أنت غير متصل بالإنترنت
                      </span>
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-300 font-normal leading-relaxed mt-0.5 truncate sm:whitespace-normal offline-banner-desc">
                      البيانات المعروضة حالياً هي نسخة مخزنة مؤقتاً.
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Refresh Button */}
            {statusMessage !== 'online' && (
              <button
                onClick={handleRefresh}
                disabled={isChecking}
                className="offline-refresh-btn flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                title="إعادة المحاولة وتحديث البيانات"
                aria-label="تحديث البيانات"
              >
                <Icon
                  name="fa-sync-alt"
                  className={`text-xs sm:text-sm ${isChecking ? 'animate-spin' : ''}`}
                />
                <span>{isChecking ? 'جاري التحقق...' : 'تحديث'}</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

