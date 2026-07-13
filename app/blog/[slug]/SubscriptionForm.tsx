"use client";

import React, { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

/**
 * SubscriptionForm Component:
 * Renders a client-side subscription block for readers to sign up for travel newsletter updates.
 * Features built-in live email regex validation, transient loading/submitting cycles,
 * error state feedback, and persistent local success confirmations.
 */
export default function SubscriptionForm() {
  // Local state hook for current email input value
  const [email, setEmail] = useState("");
  
  // Status tracker for local workflow execution phase
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  // Custom error message returned from validations or mock failures
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles newsletter subscription submissions.
   * Performs standard input validation, handles loading stages, and updates outcome state.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Standard client-side email format regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Simulate network request round-trip latency (1 second timeout)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full mt-12 pt-10 border-t border-white/5">
      <div className="bg-zinc-950/60 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm">
        {/* Decorative background glow for high-end cinematic aesthetics */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
        
        {status === "success" ? (
          /* SUCCESS STATE PANEL */
          <div className="flex flex-col items-center text-center py-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-400">
              <Check size={24} />
            </div>
            <h3 className="text-lg md:text-xl font-serif text-white mb-2">You are on the list!</h3>
            <p className="text-zinc-400 text-xs md:text-sm max-w-sm leading-relaxed">
              Thank you for subscribing. Future travel blueprints and visual dispatches will land directly in your inbox.
            </p>
          </div>
        ) : (
          /* INTERACTIVE INPUT FORM STATE */
          <div className="space-y-4">
            <div className="space-y-2">
              {/* Category tag metadata line */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold font-mono">Newsletter</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold font-mono">Travel Blueprints</span>
              </div>
              {/* Heading and teaser */}
              <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">
                Stay updated on future expeditions
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed">
                Subscribe to get clean, optimized itineraries, camera gear setups, and slow-living blueprints delivered straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  {/* Absolute aligned mail icon decor */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail size={16} />
                  </div>
                  {/* Controlled input element */}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Enter your email address"
                    disabled={status === "submitting"}
                    className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-amber-400/80 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-400/20 disabled:opacity-50 transition-all font-sans"
                  />
                </div>
                {/* Submit trigger button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-amber-400 hover:bg-amber-500 text-black font-semibold text-xs md:text-sm uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all font-mono font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.98]"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Subscribing
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Graceful validation error text block */}
              {status === "error" && (
                <p className="text-red-400 text-xs mt-2 font-mono pl-1 animate-fade-in">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
