import { memo } from "react";
import { AppView } from "../utils/routerSeo";

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer = memo(({ onNavigate }: FooterProps) => (
  <footer className="bg-card-bg py-8 px-4 sm:px-6 lg:px-8 border-t border-border-main/50">
    <div className="w-full max-w-[92%] mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] text-text-dim/80 uppercase tracking-widest font-ui font-bold gap-4 text-center">
      <p>&copy; 2026 KHILESH SAMMAL • LENS & LATITUDE. ALL RIGHTS RESERVED.</p>
      
      {/* Consolidated Dedicated Policy Links for SEO */}
      <nav aria-label="Legal and Policies" className="flex flex-wrap justify-center gap-4 md:gap-6">
        <a 
          href="/privacy-policy"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("privacy-policy");
          }} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Privacy Policy
        </a>
        <a 
          href="/terms-of-use"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("terms-of-use");
          }} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Terms of Use
        </a>
        <a 
          href="/disclaimer"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("disclaimer");
          }} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Disclaimer
        </a>
        <a 
          href="/shipping-policy"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("shipping-policy");
          }} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          Shipping Policy
        </a>
        <a 
          href="/return-policy"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("return-policy");
          }} 
          className="hover:text-amber-400 transition-colors cursor-pointer"
        >
          7-Day Return Policy
        </a>
      </nav>
    </div>
  </footer>
));

Footer.displayName = "Footer";

