import { motion, AnimatePresence } from 'motion/react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLevel1?: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose} style={{ pointerEvents: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              title="إغلاق"
              aria-label="إغلاق"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-header">أهلًا بك في كلية الحاسب!💻💫</h2>
            <div className="welcome-modal-body text-right">
              <p>دليلك الأكاديمي للوصول إلى ما تحتاج خلال رحلتك الجامعية</p>
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 mt-9 sm:mt-10 text-center relative overflow-hidden welcome-reminder-box">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold mb-1 welcome-reminder-title">
                  <span>تذكير</span>
                  <i className="fas fa-heart text-[10px]"></i>
                </div>
                <p className="text-xs sm:text-sm font-medium text-amber-100/90 leading-relaxed m-0 welcome-reminder-text">
                  لا إله إلا أنت سبحانك اني كنت من الظالمين
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

