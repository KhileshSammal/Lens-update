import { memo } from "react";
import { PolicyTab } from "./PolicyModal";

interface FooterProps {
  onOpenPolicy: (tab: PolicyTab) => void;
}

export const Footer = memo(({ onOpenPolicy }: FooterProps) => (
  <footer className="bg-card-bg py-8 px-4 sm:px-6 lg:px-8 border-t border-border-main/50">
    <div className="w-full max-w-[92%] mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] text-text-dim/80 uppercase tracking-widest font-ui font-bold gap-4 text-center">
      <p>&copy; 2026 KHILESH SAMMAL • LENS & LATITUDE. ALL RIGHTS RESERVED.</p>
      
      {/* Consolidated Non-Redundant Policy Links */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <button 
          onClick={() => onOpenPolicy("privacy")} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
        <button 
          onClick={() => onOpenPolicy("terms")} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Terms of Use
        </button>
        <button 
          onClick={() => onOpenPolicy("disclaimer")} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Disclaimer
        </button>
        <button 
          onClick={() => onOpenPolicy("shipping")} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Shipping Policy
        </button>
        <button 
          onClick={() => onOpenPolicy("returns")} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          7-Day Return Policy
        </button>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";
