import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Trash2, 
  Minus, 
  Plus, 
  CreditCard, 
  ShieldCheck, 
  Tag, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  RefreshCw,
  QrCode
} from "lucide-react";

interface CartItem {
  name: string;
  price: number;
  img: string;
  quantity: number;
}

interface CheckoutViewProps {
  cartItems: CartItem[];
  onRemoveFromCart: (name: string) => void;
  onUpdateQuantity: (name: string, quantity: number) => void;
  onClearCart: () => void;
  onBackToHome: () => void;
}

export const CheckoutView = ({
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  onBackToHome
}: CheckoutViewProps) => {
  // Coupon state
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "stripe">("card");

  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Loading and Receipt views
  const [progressStep, setProgressStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [stripeError, setStripeError] = useState("");
  const [formError, setFormError] = useState("");

  // Promotion code trigger
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (coupon.trim().toUpperCase() === "EXPEDITION") {
      setDiscountPercent(15);
      setCouponSuccess("Promo code 'EXPEDITION' applied: 15% discount!");
    } else {
      setCouponError("Invalid coupon code. Try 'EXPEDITION'");
    }
  };

  // Card formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      const formatted = value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value;
      setCardExpiry(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardCvv(value.slice(0, 3));
  };

  // Order Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return Math.floor(subtotal * (discountPercent / 100));
  }, [subtotal, discountPercent]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal > 2000 ? 0 : 150; // free shipping on orders over ₹2,000
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal - discountAmount + shipping;
  }, [subtotal, discountAmount, shipping]);

  // Loading Steps texts
  const steps = [
    "Verifying secure transaction node...",
    "Securing credentials and certificates...",
    "Injecting regional tax matrices...",
    "Establishing direct payment handshake...",
    "Verifying balances on safe ledger...",
    "Finalizing luxury ticket booking..."
  ];

  // Placed Order Simulator
  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (isProcessing) return;

    if (!fullName || !email || !address || !city || !pinCode) {
      setFormError("Please fill in all delivery coordinate fields.");
      return;
    }

    if (paymentMethod === "card") {
      if (cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
        setFormError("Please complete the secure credit card credentials.");
        return;
      }
    }

    // Trigger processing flow animation
    setIsProcessing(true);
    setProgressStep(0);
  };

  // Staggered loading progress
  useEffect(() => {
    if (isProcessing && progressStep < steps.length) {
      const interval = setTimeout(() => {
        setProgressStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(interval);
    } else if (isProcessing && progressStep >= steps.length) {
      // Completed! Define order id and launch receipt state
      const randomId = `LL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(randomId);
      setOrderCompleted(true);
      setIsProcessing(false);
    }
  }, [isProcessing, progressStep]);

  // Handle actual Stripe redirection
  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setStripeError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.img
          }))
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe did not return a checkout session URL.");
      }
    } catch (err: any) {
      console.error("Stripe Checkout Session compilation failed:", err);
      setStripeError(err.message || "Checkout compiled failure. Stripe tokens or API configuration may be unset.");
      setIsProcessing(false);
    }
  };

  // Render Order success Cinematic receipt state
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-bg text-white pt-28 pb-32 px-4 md:px-8 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-2xl bg-[#090909] border border-zinc-900 rounded-sm p-6 md:p-12 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-accent" />
          </div>
          
          <p className="text-accent text-[10px] uppercase font-bold tracking-[0.4em] mb-2 font-ui">Expedition Finalised</p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-none tracking-tight">Purchase Successful</h2>
          
          <p className="text-zinc-500 font-serif italic text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
            "Your ticket has been written into the celestial record ledger. Secure copies have been sent to your primary coordinate inbox."
          </p>

          <div className="border border-zinc-900 bg-[#060606] p-6 text-left space-y-4 rounded-sm font-sans mb-10">
            <div className="flex justify-between border-b border-zinc-900 pb-3 text-xs uppercase tracking-wider text-zinc-500 font-bold font-ui">
              <span>Receipt details</span>
              <span className="text-white font-mono">{orderId}</span>
            </div>

            <div className="space-y-2 text-sm text-zinc-400">
              <p className="flex justify-between"><span className="text-zinc-500">Recipient Name:</span> <span className="text-zinc-200 font-bold">{fullName}</span></p>
              <p className="flex justify-between"><span className="text-zinc-500">Coordinate Inbox:</span> <span className="text-zinc-200">{email}</span></p>
              <p className="flex justify-between"><span className="text-zinc-500">Destination Hub:</span> <span className="text-zinc-200">{city}, PIN {pinCode}</span></p>
              <p className="flex justify-between"><span className="text-zinc-500">Gateway Route:</span> <span className="text-zinc-200 italic">{paymentMethod === "card" ? "Secure Ledger API" : "Simulated UPI Coordinate"}</span></p>
            </div>

            <div className="border-t border-zinc-900 pt-4 space-y-2">
              {cartItems.map((item) => (
                <div key={item.name} className="flex justify-between text-xs text-zinc-400">
                  <span>{item.name} <span className="text-zinc-600">x{item.quantity}</span></span>
                  <span className="font-mono">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-emerald-500 font-bold">
                  <span>EXPEDITION (15% Code)</span>
                  <span className="font-mono">-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              {shipping > 0 ? (
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Courier Routing Fee</span>
                  <span className="font-mono">₹{shipping}</span>
                </div>
              ) : (
                <div className="flex justify-between text-xs text-accent uppercase tracking-widest font-bold">
                  <span>Courier Routing Fee</span>
                  <span>FREE</span>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-sm font-bold">
              <span className="uppercase text-zinc-400 font-ui tracking-wider text-xs">Settled Sum</span>
              <span className="text-white font-mono text-lg">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              onClearCart();
              onBackToHome();
            }}
            className="px-8 py-4 bg-white hover:bg-zinc-200 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all rounded-sm font-ui flex items-center justify-center gap-2 mx-auto w-full md:w-auto"
          >
            <ShoppingBag size={14} /> Back to Hub Pages
          </button>
        </motion.div>
      </div>
    );
  }

  // Render intermediate full screen cinematic progress overlay
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-bg text-white flex flex-col justify-center items-center px-6">
        <div className="max-w-md w-full text-center space-y-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            className="w-16 h-16 border-t-2 border-r-2 border-accent border-b border-l border-zinc-900 rounded-full mx-auto"
          />
          <div className="space-y-2">
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Secure Ledger Node</p>
            <h3 className="text-xl font-serif text-white h-8 flex items-center justify-center italic">
              {steps[Math.min(progressStep, steps.length - 1)]}
            </h3>
            <p className="text-[10px] text-accent uppercase font-bold tracking-[0.3em] font-ui pt-3">
              Step {Math.min(progressStep + 1, steps.length)} of {steps.length}
            </p>
          </div>
          <div className="h-1 bg-zinc-950 w-full rounded-full overflow-hidden border border-zinc-900">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${(Math.min(progressStep, steps.length) / steps.length) * 100}%` }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              className="h-full bg-accent"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white pt-28 pb-32">
      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button navigation link */}
        <button 
          onClick={onBackToHome}
          className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-ui font-bold mb-10"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Continue Exploring
        </button>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* LEFT COLUMN: Shipping & Payment Checkout Forms (7 Units) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-accent uppercase tracking-widest text-[9px] font-bold mb-2 block font-ui">Secure Gateway</span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white mb-2">Checkout Carriage</h2>
              <p className="text-slate-500 text-sm font-serif italic">Securely settle of curated tools and photography presets.</p>
            </div>

            {/* Empty state safeguard */}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-[#090909] border border-zinc-900 rounded-sm">
                <ShoppingBag size={40} className="mx-auto text-zinc-800 mb-4" />
                <h3 className="font-serif text-lg mb-2">Cart is empty</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">Select curations from the Travel Shop or add presets from the Expedition Hub.</p>
                <button 
                  onClick={onBackToHome}
                  className="px-6 py-3 bg-white text-slate-950 text-xs uppercase tracking-widest font-bold hover:bg-slate-200 transition-colors"
                >
                  Visit Shop
                </button>
              </div>
            ) : (
              <form onSubmit={handleSimulatedSubmit} className="space-y-8 font-sans">
                {/* 1. Shipping Section */}
                <div className="bg-[#090909] border border-zinc-900 p-4 sm:p-6 md:p-8 rounded-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                    <div className="w-8 h-8 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center">
                      <Truck size={14} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-lg">1. Delivery Coordinates</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Carrier Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Khilesh Sammal" 
                        className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Recipient Email Coordinate</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="khileshsammal.business@gmail.com" 
                        className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Destination Street Address</label>
                    <textarea 
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Street address, apartment, suite or studio hub coordinate" 
                      rows={2}
                      className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">City Hub</label>
                      <input 
                        type="text" 
                        required
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Dehradun, Uttarakhand" 
                        className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Postal PIN Code</label>
                      <input 
                        type="text" 
                        required
                        value={pinCode}
                        onChange={e => setPinCode(e.target.value)}
                        placeholder="248001" 
                        className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Section */}
                <div className="bg-[#090909] border border-zinc-900 p-4 sm:p-6 md:p-8 rounded-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                    <div className="w-8 h-8 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center">
                      <CreditCard size={14} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-lg">2. Settlement Interface</h3>
                  </div>

                  {/* Gateway selector buttons */}
                  <div className="grid grid-cols-3 gap-2 border border-zinc-900 p-1 rounded-sm bg-black">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-3 text-[10px] uppercase font-bold tracking-widest rounded-sm transition-all focus:outline-none font-ui ${
                        paymentMethod === "card" 
                          ? "bg-zinc-800 text-white shadow-md border border-zinc-700" 
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      Secure Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`py-3 text-[10px] uppercase font-bold tracking-widest rounded-sm transition-all focus:outline-none font-ui ${
                        paymentMethod === "upi" 
                          ? "bg-zinc-800 text-white shadow-md border border-zinc-700" 
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      Instant UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("stripe")}
                      className={`py-3 text-[10px] uppercase font-bold tracking-widest rounded-sm transition-all focus:outline-none font-ui ${
                        paymentMethod === "stripe" 
                          ? "bg-zinc-800 text-white shadow-md border border-zinc-700" 
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      Stripe (Live)
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Credit Card Number</label>
                        <input 
                          type="text" 
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4122 5678 1234 5678" 
                          className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Expiry (MM/YY)</label>
                          <input 
                            type="text" 
                            required
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="12/28" 
                            className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Security CVV</label>
                          <input 
                            type="password" 
                            required
                            value={cardCvv}
                            onChange={handleCvvChange}
                            placeholder="***" 
                            className="w-full bg-[#060606] border border-zinc-850 focus:border-accent focus:outline-none p-3.5 rounded-sm text-sm text-white transition-colors font-mono"
                          />
                        </div>
                      </div>

                      <div className="p-3 border border-zinc-900 bg-black/40 flex items-center gap-3 text-xs text-zinc-500 rounded-sm">
                        <ShieldCheck size={16} className="text-zinc-600 flex-shrink-0" />
                        <span>Mock checkout card settlement. Enter any 16 digits to check fully functional transaction flows.</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="text-center py-6 border border-zinc-900 bg-black/50 rounded-sm p-4 space-y-4 animate-fadeIn">
                      <QrCode size={120} className="mx-auto text-white p-2 border border-zinc-800 rounded-sm bg-zinc-950" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-300">Fast UPI Scan</p>
                        <p className="text-[10px] text-zinc-500 max-w-sm mx-auto">Scan with any mobile bank client (GPay, PhonePe, Paytm). The checkout page will validate automatically as soon as you press complete.</p>
                      </div>
                      <div className="text-xs p-2 font-mono text-accent bg-black border border-white/5 inline-block">
                        Merchant: khilesh@upi
                      </div>
                    </div>
                  )}

                  {paymentMethod === "stripe" && (
                    <div className="text-center py-8 border border-zinc-900 bg-black/50 p-6 rounded-sm space-y-4 animate-fadeIn">
                      <Sparkles size={28} className="mx-auto text-accent animate-pulse" />
                      <p className="text-xs font-bold">Stripe Payments Gate</p>
                      <p className="text-[11px] text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Redirects you safely to external high-security Stripe Checkout portals. Requires environment <code className="text-accent bg-black px-1.5 py-0.5 rounded-sm font-mono text-[9px]">STRIPE_SECRET_KEY</code> configuration.
                      </p>

                      {stripeError && (
                        <div className="p-3 border border-red-950/40 bg-red-950/10 text-red-400 text-xs text-left rounded-sm space-y-1">
                          <p className="font-bold">Execution message:</p>
                          <p className="font-mono text-[10px] leading-relaxed select-all">{stripeError}</p>
                          <p className="text-[10px] text-zinc-500 font-sans mt-2">No worries! Switch to "Secure Card" or "Instant UPI" above to test the entire cinematic checkout, billing, and receipt flows without credentials.</p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleStripeCheckout}
                        disabled={isProcessing}
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-bold font-ui text-[10px] tracking-widest uppercase text-white rounded-sm transition-all"
                      >
                        Compilate Stripe Redirect
                      </button>
                    </div>
                  )}
                </div>

                {formError && (
                  <div className="p-4 border border-rose-950/40 bg-rose-950/10 text-rose-400 text-xs rounded-sm font-sans animate-fadeIn">
                    <p className="font-bold uppercase tracking-wider mb-1">Validation Alert</p>
                    <p>{formError}</p>
                  </div>
                )}

                {/* Submit Trigger - Only shown for non stripe */}
                {paymentMethod !== "stripe" && (
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-amber-400 text-black py-5 uppercase text-xs tracking-widest font-bold transition-all shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 font-ui"
                  >
                    Settle Ledger payment — ₹{total.toLocaleString("en-IN")}
                  </button>
                )}
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: Cart Summary review panel (5 Units) */}
          <div className="lg:col-span-5 bg-[#090909] border border-zinc-900 rounded-sm p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-xl border-b border-zinc-900 pb-4">Article Basket</h3>

            {cartItems.length === 0 ? (
              <p className="text-zinc-600 text-xs italic font-serif">Empty list carriage.</p>
            ) : (
              <div className="space-y-5">
                {/* Cart list items */}
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 no-scrollbar border-b border-zinc-900 pb-5">
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.name} 
                      layout
                      className="flex gap-4 items-center"
                    >
                      <div className="w-16 h-16 bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden flex-shrink-0">
                        <img src={item.img} className="w-full h-full object-cover" alt={`Cart item thumbnail for ${item.name}`} />
                      </div>

                      <div className="flex-grow space-y-1">
                        <h4 className="text-sm font-bold text-zinc-200 leading-tight">{item.name}</h4>
                        <p className="text-xs text-accent font-bold font-ui">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>

                      {/* Quantity counters */}
                      <div className="flex items-center space-x-1 font-mono border border-zinc-900 bg-black p-1 rounded-sm">
                        <button 
                          type="button"
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.name, item.quantity - 1);
                            } else {
                              onRemoveFromCart(item.name);
                            }
                          }}
                          className="p-1 hover:text-white text-zinc-500 rounded-sm hover:bg-zinc-900 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-bold text-white px-2 text-center min-w-5">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => {
                            onUpdateQuantity(item.name, item.quantity + 1);
                          }}
                          className="p-1 hover:text-white text-zinc-500 rounded-sm hover:bg-zinc-900 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Delete */}
                      <button 
                        type="button"
                        onClick={() => onRemoveFromCart(item.name)}
                        className="p-2 hover:text-red-400 text-zinc-600 transition-colors focus:outline-none"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Coupon component form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 border-b border-zinc-900 pb-5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 font-ui block">Apply Promo Coupon</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Try code: EXPEDITION" 
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      className="flex-grow bg-[#050505] border border-zinc-850 p-2 text-xs focus:outline-none text-white rounded-sm font-mono uppercase"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 border border-zinc-800 text-white font-ui font-semibold text-[10px] uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-rose-500 text-[10px] font-sans pt-1 font-medium">{couponError}</p>}
                  {couponSuccess && <p className="text-emerald-400 text-[10px] font-sans pt-1 font-medium">{couponSuccess}</p>}
                </form>

                {/* Recipient summary mathematical calculations list */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Expedition Gear Cart Sum</span>
                    <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-500 font-semibold">
                      <span>EXPEDITION Coupon Applied (15%)</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-zinc-400">
                    <span>Routing Courier Fee</span>
                    <span className="font-mono">
                      {shipping > 0 ? `₹${shipping}` : <span className="text-accent uppercase tracking-widest font-ui font-extrabold text-[9px]">FREE</span>}
                    </span>
                  </div>

                  <div className="border-t border-zinc-900 pt-4 flex justify-between text-white font-bold text-sm">
                    <span className="uppercase text-zinc-400 text-xs font-ui tracking-wider leading-relaxed">Combined Value</span>
                    <span className="font-mono text-base text-white">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
