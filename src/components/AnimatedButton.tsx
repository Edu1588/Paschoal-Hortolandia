import React from 'react';

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  className?: string;
  color?: string;
  textColor?: string;
  hoverText?: string;
  children: React.ReactNode;
};

export function AnimatedButton({ 
  children, 
  href, 
  className = "", 
  color = "var(--color-horto-orange)", 
  textColor = "var(--color-ink)",
  hoverText,
  ...props 
}: AnimatedButtonProps) {
  const Element = href ? 'a' : 'button';
  const actualHoverText = hoverText || textColor;
  
  return (
    <Element 
      href={href} 
      className={`animated-button group flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase tracking-widest text-xs transition-all hover:brightness-95 active:scale-[0.98] rounded-full ${className}`}
      {...(props as any)}
      style={{ 
        backgroundColor: color,
        color: textColor,
        ...(props.style || {})
      } as React.CSSProperties}
    >
      <span className="relative z-10 transition-transform group-hover:-translate-x-1">{children}</span>
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current relative z-10 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </Element>
  );
}
