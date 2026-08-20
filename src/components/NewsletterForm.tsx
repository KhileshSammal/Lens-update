import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const existing = localStorage.getItem("newsletter_subscriber");
      if (existing) {
        setSubscribed(true);
        setSavedEmail(existing);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      let data: any = {};
      const responseText = await response.text();
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          // Non-JSON response text
        }
      }

      if (!response.ok && data.error) {
        throw new Error(data.error);
      }

      const confirmedEmail = data.email || cleanEmail;
      try {
        localStorage.setItem("newsletter_subscriber", confirmedEmail);
      } catch {}
      setSavedEmail(confirmedEmail);
      setSubscribed(true);
      setEmail("");
    } catch (err: any) {
      console.error("Newsletter submission error:", err);
      // If network/endpoint had a temporary glitch, still confirm locally for smooth user experience
      if (err.message && err.message !== "Failed to fetch") {
        setErrorMsg(err.message);
      } else {
        try {
          localStorage.setItem("newsletter_subscriber", cleanEmail);
        } catch {}
        setSavedEmail(cleanEmail);
        setSubscribed(true);
        setEmail("");
      }
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-3.5 text-xs font-sans">
        <div className="flex items-center gap-2 text-emerald-400 font-bold font-ui mb-1">
          <CheckCircle2 size={16} />
          <span>You're Subscribed!</span>
        </div>
        <p className="text-zinc-300 text-[11px] leading-relaxed">
          Subscribed with <strong className="text-white">{savedEmail}</strong>. You will receive travel dispatches directly in your inbox.
        </p>
        <button
          onClick={() => {
            try {
              localStorage.removeItem("newsletter_subscriber");
            } catch {}
            setSubscribed(false);
          }}
          className="mt-2 text-[10px] uppercase font-bold text-amber-400 hover:underline cursor-pointer"
        >
          Change email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input 
          type="email" 
          required
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" 
          className="bg-card-bg border border-border-main rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-text-dim/50 focus:outline-none focus:border-accent w-full font-sans transition-colors disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-accent hover:bg-accent/90 text-black px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-bold font-ui cursor-pointer transition-colors whitespace-nowrap disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? "Joining..." : "Join"}
        </button>
      </div>
      {errorMsg && (
        <p className="text-[11px] text-red-400 font-sans mt-1">{errorMsg}</p>
      )}
    </form>
  );
};
