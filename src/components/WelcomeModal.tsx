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
        <motion.div
          key="welcome-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-overlay"
          onClick={onClose}
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            key="welcome-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl text-center relative overflow-hidden welcome-reminder-box">
                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold welcome-reminder-title">
                  <span>تذكير</span>
                  <i className="fas fa-heart text-[10px]"></i>
                </div>
                <p className="text-xs sm:text-sm font-medium text-center welcome-reminder-text">
                  لا إله إلا أنت سبحانك اني كنت من الظالمين
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

