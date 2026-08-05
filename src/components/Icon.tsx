import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function OwlIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: 'inline-block',
        width: '1em',
        height: '1em',
        verticalAlign: 'middle',
        ...style
      }}
    >
      {/* Owl body outline with tufted ears/horns */}
      <path d="M12 3c-1.2 0-2.4.2-3.5.7L5.5 2l-.5 1.5 1.2 2.8C4.9 7.8 4 10 4 12.5V16c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6v-3.5c0-2.5-.9-4.7-2.2-6.2L19 3.5 18.5 2l-3 1.7c-1.1-.5-2.3-.7-3.5-.7z" />
      
      {/* Eye patches / feathers */}
      <circle cx="8" cy="11.5" r="3" className="stroke-current opacity-85" />
      <circle cx="16" cy="11.5" r="3" className="stroke-current opacity-85" />
      
      {/* Pupils / Eyes */}
      <circle cx="8" cy="11.5" r="1.2" fill="currentColor" />
      <circle cx="16" cy="11.5" r="1.2" fill="currentColor" />
      
      {/* Owl Beak */}
      <polygon points="12,12.5 10.5,14.5 13.5,14.5" fill="currentColor" />
      
      {/* Cute wing lines */}
      <path d="M5 13c1 2.5 2.5 4 4 4.5" />
      <path d="M19 13c-1 2.5-2.5 4-4 4.5" />
      
      {/* Cute belly feathers / markings */}
      <path d="M9.5 18c.8.8 1.7.8 2.5 0" />
      <path d="M12 18c.8.8 1.7.8 2.5 0" />
    </svg>
  );
}

export default function Icon({ name, className = '', style }: IconProps) {
  // Check if it's the custom owl icon
  if (name && name.includes('owl')) {
    return <OwlIcon className={className} style={style} />;
  }

  // Ensure FontAwesome icons have their prefix (e.g. fas, far, fab)
  let fullClass = name || '';
  if (fullClass.startsWith('fa-')) {
    fullClass = `fas ${fullClass}`;
  } else if (!fullClass.startsWith('fa ') && !fullClass.startsWith('fas') && !fullClass.startsWith('far') && !fullClass.startsWith('fab')) {
    fullClass = `fas fa-${fullClass}`;
  }

  return <i className={`${fullClass} ${className}`} style={style} />;
}
