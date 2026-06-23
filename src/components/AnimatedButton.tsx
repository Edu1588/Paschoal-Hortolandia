import React from 'react';

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  className?: string;
  color?: string;
  hoverText?: string;
  children: React.ReactNode;
};

export function AnimatedButton({ 
  children, 
  href, 
  className = "", 
  color = "var(--color-horto-orange)", 
  hoverText = "var(--color-deep-green)",
  ...props 
}: AnimatedButtonProps) {
  const Element = href ? 'a' : 'button';
  
  return (
    <Element 
      href={href} 
      className={`animated-button ${className}`}
      {...(props as any)}
      style={{ 
        '--btn-color': color, 
        '--btn-hover-text': hoverText,
        ...(props.style || {})
      } as React.CSSProperties}
    >
      <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
      <span className="text">{children}</span>
      <span className="circle"></span>
      <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </Element>
  );
}
