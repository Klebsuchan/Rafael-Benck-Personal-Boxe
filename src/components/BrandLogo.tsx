import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <a
      href="#top"
      aria-label="Rafael Benck - Início"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#E50914] font-display text-xl leading-none tracking-tight text-black transition-transform duration-150 group-hover:scale-105">
        RB
      </span>
      <span className="flex flex-col leading-[0.88] font-display text-[17px] tracking-wide text-white uppercase">
        <span>RAFAEL</span>
        <span>BENCK</span>
      </span>
    </a>
  );
};
