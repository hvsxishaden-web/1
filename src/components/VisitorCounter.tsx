import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Icon from './Icon';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // ONLY show counter if secret parameter exists directly in the URL query string
    // e.g. ?admin=true or ?stats=true or ?sher=true
    const params = new URLSearchParams(window.location.search);
    const hasAdminParam =
      params.get('admin') === 'true' ||
      params.get('stats') === 'true' ||
      params.get('sher') === 'true' ||
      params.has('admin') ||
      params.has('stats');

    // Clean up any old localStorage keys so clicking will never trigger it
    localStorage.removeItem('is_admin_viewer');

    if (hasAdminParam) {
      setIsAdmin(true);
    }

    const counterDocRef = doc(db, 'stats', 'visitors');

    // 1. Check if visited in this session to prevent spamming count on simple refresh
    const sessionKey = 'has_recorded_visit_' + new Date().toISOString().slice(0, 10);
    const hasVisitedToday = sessionStorage.getItem(sessionKey);

    const recordVisit = async () => {
      try {
        if (!hasVisitedToday) {
          const docSnap = await getDoc(counterDocRef);
          if (!docSnap.exists()) {
            await setDoc(counterDocRef, {
              totalVisits: 1,
              lastVisitedAt: new Date().toISOString(),
              createdAt: new Date().toISOString()
            });
          } else {
            await updateDoc(counterDocRef, {
              totalVisits: increment(1),
              lastVisitedAt: new Date().toISOString()
            });
          }
          sessionStorage.setItem(sessionKey, 'true');
        }
      } catch (err) {
        console.error('Error updating visitor count:', err);
      }
    };

    recordVisit();

    // 2. Realtime listener to reflect live visitor count (only actively syncs if admin parameter is present)
    if (hasAdminParam) {
      const unsubscribe = onSnapshot(
        counterDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setVisitorCount(data.totalVisits ?? 0);
          } else {
            setVisitorCount(1);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Error listening to visitor count:', error);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  // For regular visitors without the URL parameter, render completely nothing
  if (!isAdmin) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl text-xs font-medium backdrop-blur-xl border transition-all duration-300 shadow-lg visitor-counter-badge group hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }}
      title="لوحة إحصائيات الزيارات الخاصة بالمسؤول"
      aria-label="إجمالي عدد الزيارات"
    >
      {/* Live Pulsing Indicator & Icon Tag */}
      <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        </span>
        <span className="text-[10px] tracking-wider text-emerald-400 font-bold uppercase">LIVE</span>
      </div>

      {/* Counter Main Display */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
          <Icon name="fa-chart-simple" className="text-[10px]" />
        </div>

        <div className="flex flex-col text-right leading-none">
          <span className="text-[10px] text-slate-400 font-medium pb-0.5">الزيارات</span>
          <div className="flex items-baseline gap-1">
            {isLoading ? (
              <span className="inline-block w-8 h-3.5 bg-white/10 rounded animate-pulse"></span>
            ) : (
              <span className="font-mono font-black text-sm tracking-tight text-white drop-shadow-sm">
                {visitorCount ? Number(visitorCount).toLocaleString('ar-EG') : '١'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Admin Tag */}
      <span className="bg-indigo-500/15 text-indigo-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-indigo-400/20">
        إداري
      </span>
    </div>
  );
}
