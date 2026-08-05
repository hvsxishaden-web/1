import { CardData } from '../types';
import LinkButton from './LinkButton';
import Icon from './Icon';
import { motion } from 'motion/react';

interface LinkCardProps {
  card: CardData;
  index: number;
  key?: any;
}

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.35,
      ease: [0.215, 0.61, 0.355, 1]
    } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98,
    transition: { 
      duration: 0.2, 
      ease: [0.55, 0.055, 0.675, 0.19]
    } 
  }
};

export default function LinkCard({ card, index }: LinkCardProps) {
  const isMultiDept = card.type === 'multi-department';

  return (
    <motion.section
      variants={cardVariants}
      className={`link-card ${isMultiDept ? 'span-full-width' : ''}`}
      data-category={card.category}
      data-level={card.level}
    >
      {/* Header */}
      <div className="card-header">
        <Icon name={card.icon} className="icon" />
        <h2 className="card-title">{card.title}</h2>
      </div>

      {/* Normal links directly in the card */}
      {card.links && (
        <div className="button-group">
          {card.links.map((link, idx) => (
            <LinkButton key={idx} link={link} />
          ))}
        </div>
      )}

      {/* Sections structure inside levels (e.g. Level 1 to 3) */}
      {card.sections && (
        <>
          {card.sections.map((section, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {section.title && (
                <h3 className="card-section-title">
                  <Icon name={section.icon} />
                  <span>{section.title}</span>
                </h3>
              )}
              <div className="button-group">
                {section.links.map((link, lIdx) => (
                  <LinkButton key={lIdx} link={link} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Multi-department structure inside higher levels (e.g. Level 4 to 6) */}
      {isMultiDept && (
        <div>
          {card.initiatives && (
            <div className="mb-8">
              <h3 className="card-section-title flex justify-center">
                <Icon name={card.initiatives.icon} style={{ color: 'var(--primary-dark)' }} />
                <span>{card.initiatives.title}</span>
              </h3>
              <div className="max-w-[400px] mx-auto button-group">
                {card.initiatives.links.map((link, idx) => (
                  <LinkButton key={idx} link={link} />
                ))}
              </div>
              <hr className="card-separator" />
            </div>
          )}

          <div className="departments-container">
            {card.departments && card.departments.map((dept, idx) => (
              <div key={idx} className="department-section">
                <h4 className="department-title">
                  <Icon name={dept.icon} />
                  <span>{dept.title}</span>
                </h4>
                <div className="button-group mt-4">
                  {dept.links.map((link, lIdx) => (
                    <LinkButton key={lIdx} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
