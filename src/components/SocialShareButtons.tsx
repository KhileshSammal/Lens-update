import React, { useState, memo } from "react";
import { Share2, Check, Copy, Instagram, Linkedin } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
  variant?: "minimal" | "full";
}

/**
 * SocialShareButtons Component:
 * Native web share support + Twitter/X, WhatsApp, LinkedIn, Instagram, and Clipboard Copying.
 */
export const SocialShareButtons = memo(({ 
  title, 
  url, 
  className = "",
  variant = "full"
}: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [instaNotice, setInstaNotice] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://lensandlattitude.in");

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${shareUrl}`)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: shareUrl,
        });
      } catch (err) {
        // Fallback to copy if user cancelled or failed
      }
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInstagram = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setInstaNotice(true);
    setTimeout(() => setInstaNotice(false), 3500);
    window.open("https://instagram.com", "_blank", "noopener,noreferrer");
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-[10px] uppercase font-bold tracking-widest text-text-dim font-ui mr-1">Share:</span>
        
        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className="p-2 rounded-full bg-card-bg border border-border-main hover:border-accent hover:text-accent text-text-main transition-colors cursor-pointer"
            title="Native Share"
          >
            <Share2 size={13} />
          </button>
        )}

        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-card-bg border border-border-main hover:border-amber-400 hover:text-amber-400 text-text-main transition-colors"
          title="Share on Twitter / X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-card-bg border border-border-main hover:border-emerald-500 hover:text-emerald-500 text-text-main transition-colors"
          title="Share on WhatsApp"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>

        <button
          onClick={handleInstagram}
          className="p-2 rounded-full bg-card-bg border border-border-main hover:border-pink-500 hover:text-pink-500 text-text-main transition-colors cursor-pointer"
          title="Share on Instagram"
        >
          <Instagram size={14} />
        </button>

        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-card-bg border border-border-main hover:border-accent hover:text-accent text-text-main transition-colors cursor-pointer"
          title="Copy Link"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-[11px] uppercase font-bold tracking-widest text-text-dim font-ui mr-1 flex items-center gap-1.5">
          <Share2 size={13} className="text-accent" />
          Share Expedition:
        </span>

        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 bg-card-bg border border-border-main hover:border-accent hover:text-accent px-3.5 py-2 rounded-full text-xs font-semibold text-text-main transition-all cursor-pointer font-ui"
          >
            <Share2 size={13} className="text-accent" />
            <span>Share</span>
          </button>
        )}

        {/* Twitter / X */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-card-bg border border-border-main hover:border-amber-400 hover:text-amber-400 px-3.5 py-2 rounded-full text-xs font-medium text-text-main transition-all cursor-pointer font-ui"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>Twitter / X</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-card-bg border border-border-main hover:border-emerald-500 hover:text-emerald-500 px-3.5 py-2 rounded-full text-xs font-medium text-text-main transition-all cursor-pointer font-ui"
        >
          <svg className="w-3.5 h-3.5 fill-current text-emerald-500" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-card-bg border border-border-main hover:border-sky-500 hover:text-sky-500 px-3.5 py-2 rounded-full text-xs font-medium text-text-main transition-all cursor-pointer font-ui"
        >
          <Linkedin size={14} className="text-sky-500" />
          <span>LinkedIn</span>
        </a>

        {/* Instagram */}
        <button
          onClick={handleInstagram}
          className="inline-flex items-center gap-1.5 bg-card-bg border border-border-main hover:border-pink-500 hover:text-pink-500 px-3.5 py-2 rounded-full text-xs font-medium text-text-main transition-all cursor-pointer font-ui"
        >
          <Instagram size={14} className="text-pink-500" />
          <span>Instagram</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 bg-card-bg border border-border-main hover:border-accent hover:text-accent px-3.5 py-2 rounded-full text-xs font-medium text-text-main transition-all cursor-pointer font-ui"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>

      {/* Instagram toast feedback */}
      {instaNotice && (
        <p className="text-[11px] text-pink-400 font-sans bg-pink-500/10 border border-pink-500/30 px-3 py-1.5 rounded-lg w-fit animate-fade-in">
          Link copied to clipboard! Opening Instagram—paste it in your Story, DM, or Bio.
        </p>
      )}
    </div>
  );
});

SocialShareButtons.displayName = "SocialShareButtons";
