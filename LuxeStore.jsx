
import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ─── CONTEXTS ────────────────────────────────────────────────────────────────
const CartContext = createContext();
const WishlistContext = createContext();
const ThemeContext = createContext();
const AuthContext = createContext();

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_PRODUCTS = [
  { id: 1, name: "Obsidian Chronograph", price: 12999, originalPrice: 18999, category: "Watches", rating: 4.8, reviews: 234, stock: 12, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80","https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80","https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80"], description: "A masterpiece of horology. Swiss movement, sapphire crystal, 100m water resistant.", sizes: ["38mm","42mm","46mm"], badge: "Sale", color: "#c9a84c" },
  { id: 2, name: "Noir Leather Jacket", price: 8499, originalPrice: 11999, category: "Clothing", rating: 4.9, reviews: 189, stock: 8, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80","https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80"], description: "Hand-stitched genuine Italian leather. Timeless silhouette, modern edge.", sizes: ["XS","S","M","L","XL","XXL"], badge: "Bestseller", color: "#e8e8e8" },
  { id: 3, name: "Crystal Eau de Parfum", price: 4999, originalPrice: 6499, category: "Fragrance", rating: 4.7, reviews: 412, stock: 25, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80", images: ["https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80","https://images.unsplash.com/photo-1588514912908-c3e06f9f8bbd?w=600&q=80"], description: "A symphony of oud, bergamot and white musk. Long-lasting 24hr fragrance.", sizes: ["30ml","50ml","100ml"], badge: "New", color: "#d4a5c9" },
  { id: 4, name: "Titanium Sunglasses", price: 6299, originalPrice: 8999, category: "Accessories", rating: 4.6, reviews: 156, stock: 19, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80"], description: "Ultra-light titanium frame with polarized UV400 lenses. Precision engineered.", sizes: ["One Size"], badge: "Sale", color: "#7ab8d4" },
  { id: 5, name: "Vellum Silk Shirt", price: 3799, originalPrice: 4999, category: "Clothing", rating: 4.5, reviews: 98, stock: 31, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80"], description: "100% pure mulberry silk. Breathable, luxurious and effortlessly elegant.", sizes: ["XS","S","M","L","XL"], badge: null, color: "#f0c0a0" },
  { id: 6, name: "Matte Gold Cufflinks", price: 2199, originalPrice: 2999, category: "Accessories", rating: 4.8, reviews: 67, stock: 45, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80", images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80"], description: "18k gold-plated with engraved geometric patterns. Boxed for gifting.", sizes: ["One Size"], badge: "New", color: "#d4af37" },
  { id: 7, name: "Monaco Sneakers", price: 7499, originalPrice: 9999, category: "Footwear", rating: 4.9, reviews: 321, stock: 14, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80"], description: "Handcrafted Italian leather upper with cloud-like cushioning sole.", sizes: ["UK6","UK7","UK8","UK9","UK10","UK11","UK12"], badge: "Bestseller", color: "#ffffff" },
  { id: 8, name: "Obsidian Backpack", price: 5999, originalPrice: 7999, category: "Bags", rating: 4.7, reviews: 203, stock: 22, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80","https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"], description: "Ballistic nylon with padded laptop compartment. Business meets adventure.", sizes: ["One Size"], badge: "Sale", color: "#2a2a2a" },
];

const CATEGORIES = [
  { name: "All", icon: "◈", count: 8 },
  { name: "Watches", icon: "◷", count: 1 },
  { name: "Clothing", icon: "◻", count: 2 },
  { name: "Fragrance", icon: "◈", count: 1 },
  { name: "Accessories", icon: "◇", count: 2 },
  { name: "Footwear", icon: "◈", count: 1 },
  { name: "Bags", icon: "◻", count: 1 },
];

const TESTIMONIALS = [
  { name: "Arjun Sharma", location: "Mumbai", text: "The quality is absolutely unreal. The watch I bought exceeded every expectation — feel like royalty wearing it.", rating: 5, avatar: "A" },
  { name: "Priya Nair", location: "Bengaluru", text: "Shipping was lightning fast, packaging was premium, and the perfume... I've received so many compliments.", rating: 5, avatar: "P" },
  { name: "Rohan Mehta", location: "Delhi", text: "Best e-commerce experience I've ever had. The order tracking system is a game changer. Truly world-class.", rating: 5, avatar: "R" },
  { name: "Sneha Patel", location: "Ahmedabad", text: "Bought the Monaco sneakers — they fit like a dream and the leather quality is incredible. Will definitely reorder.", rating: 5, avatar: "S" },
];

const ORDER_STEPS = ["Order Placed","Confirmed","Packed","Shipped","Out for Delivery","Delivered"];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
const pct = (o, p) => Math.round(((o - p) / o) * 100);

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Stars({ rating, size = 14 }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.floor(rating) ? "#f0c040" : i - 0.5 <= rating ? "#f0c040" : "#444", opacity: i - 0.5 <= rating ? 1 : 0.35 }}>★</span>
      ))}
    </span>
  );
}

function AnimCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, vis] = useInView();
  useEffect(() => {
    if (!vis) return;
    let start = 0, startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: #0a0a0c;
      --bg2: #111115;
      --bg3: #17171d;
      --surface: #1c1c24;
      --border: rgba(255,255,255,0.07);
      --gold: #c9a84c;
      --gold2: #e8c96a;
      --text: #f0ede8;
      --text2: #a09a90;
      --text3: #60595a;
      --accent: #c9a84c;
      --red: #e05555;
      --green: #4caf7d;
      --r: 12px;
      --trans: all 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    .light-mode {
      --bg: #f7f5f0;
      --bg2: #eeeae0;
      --bg3: #e8e2d4;
      --surface: #ffffff;
      --border: rgba(0,0,0,0.08);
      --text: #1a1510;
      --text2: #6b6055;
      --text3: #b0a898;
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
    
    .cormorant { font-family: 'Cormorant Garamond', serif; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    .fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-left.visible { opacity: 1; transform: translateX(0); }

    .btn-gold {
      background: linear-gradient(135deg, var(--gold), var(--gold2));
      color: #0a0a0c;
      border: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 1px;
      cursor: pointer;
      transition: var(--trans);
      position: relative;
      overflow: hidden;
    }
    .btn-gold::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0);
      transition: background 0.3s;
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.4); }
    .btn-gold:hover::after { background: rgba(255,255,255,0.1); }
    .btn-gold:active { transform: translateY(0); }

    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
      padding: 14px 32px;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 1px;
      cursor: pointer;
      transition: var(--trans);
      backdrop-filter: blur(10px);
    }
    .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

    .card-hover {
      transition: var(--trans);
    }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.4); }

    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); } 50% { box-shadow: 0 0 0 20px rgba(201,168,76,0); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes typing { from { width: 0; } to { width: 100%; } }
    @keyframes blink { 0%,100% { border-color: transparent; } 50% { border-color: var(--gold); } }
    @keyframes slide-in-right { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slide-out-right { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    @keyframes scale-in { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(4); opacity: 0; } }

    .shimmer-text {
      background: linear-gradient(90deg, var(--gold) 0%, #fff5d0 40%, var(--gold) 60%, var(--gold2) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .glass {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border);
    }

    .gold-line {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--gold), transparent);
      margin: 12px 0 20px;
    }

    input, textarea, select {
      font-family: 'DM Sans', sans-serif;
    }

    .tag-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .overlay-dark { background: rgba(0,0,0,0.85); position: fixed; inset: 0; z-index: 999; }

    .progress-bar-fill { transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }

    /* Product image zoom */
    .product-img-wrap { overflow: hidden; }
    .product-img-wrap img { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
    .product-img-wrap:hover img { transform: scale(1.08); }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .mobile-full { width: 100% !important; }
    }
  `}</style>
);

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 18;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(onDone, 400); }
      setPct(Math.min(Math.round(v), 100));
    }, 80);
    return () => clearInterval(id);
  }, [onDone]);
  return (
    <div style={{ position:"fixed", inset:0, background:"#0a0a0c", zIndex:9999, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontSize:48, marginBottom:16, animation:"float 2s ease-in-out infinite" }}>◈</div>
      <h1 className="cormorant" style={{ fontSize:"clamp(28px,5vw,52px)", letterSpacing:8, color:"var(--gold)", marginBottom:8 }}>LUXE</h1>
      <p style={{ color:"var(--text3)", letterSpacing:4, fontSize:11, marginBottom:40 }}>PREMIUM COLLECTION</p>
      <div style={{ width:220, height:1, background:"var(--bg3)", borderRadius:1, overflow:"hidden" }}>
        <div className="progress-bar-fill" style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,var(--gold),var(--gold2))" }} />
      </div>
      <p style={{ color:"var(--text3)", fontSize:12, marginTop:10 }}>{pct}%</p>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, cartCount, wishCount, user, setUser }) {
  const { dark, setDark } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = ["home","shop","about","contact"];
  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:500,
        padding: scrolled ? "12px 5%" : "20px 5%",
        transition:"all 0.4s ease",
        background: scrolled ? "rgba(10,10,12,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        display:"flex", alignItems:"center", justifyContent:"space-between"
      }}>
        <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:20, color:"var(--gold)" }}>◈</span>
          <span className="cormorant" style={{ fontSize:22, fontWeight:700, letterSpacing:4, color:"var(--text)" }}>LUXE</span>
        </button>

        <div className="hide-mobile" style={{ display:"flex", gap:32 }}>
          {nav.map(n => (
            <button key={n} onClick={() => setPage(n)} style={{ background:"none", border:"none", cursor:"pointer", color: page === n ? "var(--gold)" : "var(--text2)", fontSize:13, letterSpacing:2, textTransform:"uppercase", transition:"color 0.3s", fontFamily:"'DM Sans',sans-serif" }}>
              {n}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={() => setDark(!dark)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text2)", fontSize:16, transition:"color 0.3s" }}>
            {dark ? "☀" : "☾"}
          </button>
          <button onClick={() => setPage("wishlist")} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", color:"var(--text2)", fontSize:18 }}>
            ♡
            {wishCount > 0 && <span style={{ position:"absolute", top:-6, right:-8, background:"var(--red)", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{wishCount}</span>}
          </button>
          <button onClick={() => setPage("cart")} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", color:"var(--text)", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:50, padding:"8px 16px", display:"flex", alignItems:"center", gap:6, fontSize:13, transition:"var(--trans)" }}>
            ◻ Cart {cartCount > 0 && <span style={{ background:"var(--gold)", color:"#0a0a0c", borderRadius:"50%", width:18, height:18, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{cartCount}</span>}
          </button>
          {user ? (
            <button onClick={() => setPage("dashboard")} style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold2))", border:"none", cursor:"pointer", color:"#0a0a0c", fontWeight:700, fontSize:14 }}>
              {user.name[0]}
            </button>
          ) : (
            <button onClick={() => setPage("auth")} className="btn-gold" style={{ padding:"8px 20px", fontSize:12 }}>Login</button>
          )}
          <button className="hide-mobile" style={{ display:"none" }} onClick={() => setMobileOpen(true)}>☰</button>
          <button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text)", fontSize:20, display:"none" }} className="show-mobile" onClick={() => setMobileOpen(true)}>☰</button>
        </div>
      </nav>
      <style>{`.show-mobile { display: block !important; } @media(min-width:769px){.show-mobile{display:none!important}}`}</style>

      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:900, background:"var(--bg)", display:"flex", flexDirection:"column", padding:"80px 5% 40px", gap:24 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position:"absolute", top:20, right:20, background:"none", border:"none", cursor:"pointer", color:"var(--text)", fontSize:24 }}>✕</button>
          {nav.map(n => (
            <button key={n} onClick={() => { setPage(n); setMobileOpen(false); }} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text)", fontSize:28, letterSpacing:4, textTransform:"uppercase", fontFamily:"'Cormorant Garamond',serif", textAlign:"left", padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ setPage }) {
  const words = ["Exclusive", "Premium", "Luxurious", "Timeless", "Exquisite"];
  const [wordIdx, setWordIdx] = useState(0);
  const [shown, setShown] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setShown(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setShown(true); }, 400);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"var(--bg)" }}>
      {/* Background elements */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", top:"15%", right:"8%", width:400, height:400, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.08)", animation:"spin-slow 30s linear infinite" }} />
      <div style={{ position:"absolute", top:"20%", right:"12%", width:280, height:280, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.12)", animation:"spin-slow 20s linear infinite reverse" }} />

      {/* Floating icons */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position:"absolute",
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          fontSize: `${14 + i * 4}px`,
          color:"var(--gold)",
          opacity:0.15 + i * 0.04,
          animation:`float ${3 + i}s ease-in-out infinite`,
          animationDelay:`${i * 0.5}s`
        }}>◈</div>
      ))}

      <div style={{ textAlign:"center", zIndex:2, padding:"0 5%", maxWidth:900, margin:"0 auto" }}>
        <p style={{ color:"var(--gold)", letterSpacing:6, fontSize:11, textTransform:"uppercase", marginBottom:20, opacity:0.9 }}>✦ The Finest Collection ✦</p>
        
        <h1 className="cormorant" style={{ fontSize:"clamp(48px,8vw,100px)", lineHeight:1.05, fontWeight:300, marginBottom:8 }}>
          Discover
        </h1>
        <h1 className="cormorant" style={{ fontSize:"clamp(48px,8vw,100px)", lineHeight:1.05, fontWeight:700, marginBottom:24 }}>
          <span style={{
            display:"inline-block",
            color:"var(--gold)",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(-20px)",
            transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)"
          }}>{words[wordIdx]}</span>
          <br />
          <span style={{ color:"var(--text)" }}>Fashion</span>
        </h1>
        
        <p style={{ color:"var(--text2)", fontSize:"clamp(14px,2vw,18px)", lineHeight:1.8, maxWidth:500, margin:"0 auto 40px", fontWeight:300 }}>
          Curated luxury from the world's finest ateliers. Wear what stories are made of.
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-gold" onClick={() => setPage("shop")} style={{ fontSize:14, padding:"16px 40px" }}>
            Shop Now ◈
          </button>
          <button className="btn-outline" onClick={() => setPage("about")} style={{ fontSize:14, padding:"16px 40px" }}>
            Our Story
          </button>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:40, justifyContent:"center", marginTop:60, flexWrap:"wrap" }}>
          {[["10K+","Happy Clients"],["500+","Premium Products"],["98%","Satisfaction Rate"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div className="cormorant" style={{ fontSize:32, fontWeight:700, color:"var(--gold)" }}>{n}</div>
              <div style={{ fontSize:11, color:"var(--text3)", letterSpacing:2, textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:30, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, color:"var(--text3)", fontSize:11, letterSpacing:2 }}>
        <span>SCROLL</span>
        <div style={{ width:1, height:40, background:"linear-gradient(180deg,var(--gold),transparent)", animation:"float 1.5s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── FLASH SALE BANNER ────────────────────────────────────────────────────────
function FlashSale() {
  const [time, setTime] = useState({ h: 5, m: 47, s: 23 });
  const [ref, vis] = useInView();
  useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { h, m, s } = t;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  return (
    <section ref={ref} style={{ background:"linear-gradient(135deg,#1a1000,#0a0a0c)", padding:"60px 5%", textAlign:"center", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
      <div className={`fade-up ${vis ? "visible" : ""}`}>
        <span style={{ background:"var(--red)", color:"#fff", padding:"4px 14px", borderRadius:20, fontSize:11, letterSpacing:2, fontWeight:700 }}>⚡ FLASH SALE</span>
        <h2 className="cormorant" style={{ fontSize:"clamp(32px,5vw,56px)", margin:"16px 0 8px", fontWeight:600 }}>Up to <span style={{ color:"var(--gold)" }}>50% OFF</span> Today</h2>
        <p style={{ color:"var(--text2)", marginBottom:32, fontSize:14 }}>Limited time. Premium pieces. Don't miss out.</p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", alignItems:"center" }}>
          {[["Hours",time.h],["Minutes",time.m],["Seconds",time.s]].map(([l,v]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div className="cormorant" style={{ fontSize:52, fontWeight:700, color:"var(--gold)", width:90, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, lineHeight:1.1, padding:"8px 0" }}>{pad(v)}</div>
              <div style={{ fontSize:10, color:"var(--text3)", letterSpacing:2, marginTop:6 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED PRODUCTS ─────────────────────────────────────────────────────
function ProductCard({ product, onAdd, onWish, wishlist, setPage, setSelectedProduct }) {
  const inWish = wishlist.includes(product.id);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <div className="card-hover" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, overflow:"hidden", cursor:"pointer", position:"relative" }}
      onClick={() => { setSelectedProduct(product); setPage("product"); }}>
      
      {product.badge && (
        <span className="tag-badge" style={{ position:"absolute", top:12, left:12, zIndex:2, background: product.badge === "Sale" ? "var(--red)" : product.badge === "New" ? "var(--green)" : "var(--gold)", color: product.badge === "Bestseller" ? "#0a0a0c" : "#fff" }}>
          {product.badge}
        </span>
      )}

      <button onClick={e => { e.stopPropagation(); onWish(product.id); }} style={{ position:"absolute", top:12, right:12, zIndex:2, background:"rgba(0,0,0,0.4)", border:"none", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:16, color: inWish ? "var(--red)" : "var(--text2)", backdropFilter:"blur(10px)", transition:"all 0.3s" }}>
        {inWish ? "♥" : "♡"}
      </button>

      <div className="product-img-wrap" style={{ height:260, background:"var(--bg2)" }}>
        <img src={product.image} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => e.target.style.display="none"} />
      </div>

      <div style={{ padding:"20px 16px" }}>
        <p style={{ fontSize:10, color:"var(--text3)", letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{product.category}</p>
        <h3 style={{ fontSize:16, fontWeight:600, marginBottom:8, color:"var(--text)" }}>{product.name}</h3>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize:11, color:"var(--text3)" }}>({product.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <span style={{ fontSize:18, fontWeight:700, color:"var(--gold)" }}>{fmt(product.price)}</span>
          <span style={{ fontSize:13, color:"var(--text3)", textDecoration:"line-through" }}>{fmt(product.originalPrice)}</span>
          <span style={{ fontSize:11, color:"var(--green)", fontWeight:600 }}>{pct(product.originalPrice, product.price)}% off</span>
        </div>
        <button className="btn-gold" onClick={handleAdd} style={{ width:"100%", padding:"12px", fontSize:13, transform: added ? "scale(0.97)" : "scale(1)" }}>
          {added ? "✓ Added!" : "+ Add to Cart"}
        </button>
        <button className="btn-outline" onClick={e => { e.stopPropagation(); onAdd(product); setPage("checkout"); }} style={{ width:"100%", padding:"10px", fontSize:13, marginTop:8 }}>
          ⚡ Buy Now
        </button>
      </div>
    </div>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
function Categories({ onFilter, active }) {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} style={{ padding:"80px 5%", background:"var(--bg2)" }}>
      <div className={`fade-up ${vis ? "visible" : ""}`} style={{ textAlign:"center", marginBottom:48 }}>
        <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11, textTransform:"uppercase" }}>Browse By</p>
        <div className="gold-line" style={{ margin:"12px auto 0" }} />
        <h2 className="cormorant" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:600 }}>Shop Categories</h2>
      </div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
        {CATEGORIES.map((cat, i) => (
          <button key={cat.name} onClick={() => onFilter(cat.name)}
            className={`fade-up ${vis ? "visible" : ""}`}
            style={{
              animationDelay:`${i * 0.05}s`,
              background: active === cat.name ? "linear-gradient(135deg,var(--gold),var(--gold2))" : "var(--surface)",
              color: active === cat.name ? "#0a0a0c" : "var(--text)",
              border: `1px solid ${active === cat.name ? "transparent" : "var(--border)"}`,
              borderRadius:50, padding:"10px 20px", cursor:"pointer", fontSize:13, fontWeight:500,
              transition:"var(--trans)", display:"flex", alignItems:"center", gap:6
            }}>
            <span>{cat.icon}</span> {cat.name}
            <span style={{ fontSize:10, opacity:0.6 }}>({cat.count})</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── SHOP PAGE ────────────────────────────────────────────────────────────────
function ShopPage({ onAdd, onWish, wishlist, setPage, setSelectedProduct }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("newest");
  const [priceMax, setPriceMax] = useState(20000);

  const filtered = DEMO_PRODUCTS
    .filter(p => cat === "All" || p.category === cat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= priceMax)
    .sort((a, b) => sort === "low-high" ? a.price - b.price : sort === "high-low" ? b.price - a.price : b.id - a.id);

  return (
    <div style={{ minHeight:"100vh", paddingTop:80, background:"var(--bg)" }}>
      <div style={{ padding:"40px 5% 20px", textAlign:"center" }}>
        <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11 }}>COLLECTION</p>
        <h1 className="cormorant" style={{ fontSize:"clamp(32px,5vw,64px)", fontWeight:300 }}>All Products</h1>
      </div>

      <div style={{ padding:"0 5% 20px", display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
        {/* Search */}
        <div style={{ position:"relative", flex:"1", minWidth:200 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)" }}>⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            style={{ width:"100%", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:50, padding:"12px 16px 12px 36px", color:"var(--text)", fontSize:13, outline:"none" }} />
        </div>
        {/* Sort */}
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:50, padding:"12px 20px", color:"var(--text)", fontSize:13, cursor:"pointer", outline:"none" }}>
          <option value="newest">Newest</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
        {/* Price */}
        <div style={{ display:"flex", alignItems:"center", gap:8, color:"var(--text2)", fontSize:12 }}>
          <span>Max: {fmt(priceMax)}</span>
          <input type="range" min={1000} max={20000} step={500} value={priceMax} onChange={e => setPriceMax(+e.target.value)}
            style={{ accentColor:"var(--gold)", width:100 }} />
        </div>
      </div>

      <Categories onFilter={setCat} active={cat} />

      <div style={{ padding:"20px 5% 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:80, color:"var(--text3)" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>◈</div>
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} onWish={onWish} wishlist={wishlist} setPage={setPage} setSelectedProduct={setSelectedProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL ────────────────────────────────────────────────────────────
function ProductDetail({ product, onAdd, onWish, wishlist, setPage }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const inWish = wishlist.includes(product.id);
  if (!product) return null;
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, padding:"100px 5% 80px", background:"var(--bg)" }}>
      <button onClick={() => setPage("shop")} style={{ background:"none", border:"none", color:"var(--text2)", cursor:"pointer", fontSize:13, marginBottom:32, display:"flex", alignItems:"center", gap:6 }}>
        ← Back to Shop
      </button>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, maxWidth:1100, margin:"0 auto" }} className="mobile-full" >
        <style>{`@media(max-width:768px){.prod-grid{grid-template-columns:1fr!important}}`}</style>
        <div className="prod-grid" style={{ display:"contents" }}>
          {/* Images */}
          <div>
            <div style={{ borderRadius:16, overflow:"hidden", marginBottom:12, background:"var(--bg2)", height:420 }}>
              <img src={product.images[imgIdx]} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"all 0.4s" }} onError={e => e.target.src = product.image} />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {product.images.map((img, i) => (
                <div key={i} onClick={() => setImgIdx(i)} style={{ width:72, height:72, borderRadius:8, overflow:"hidden", border:`2px solid ${i === imgIdx ? "var(--gold)" : "transparent"}`, cursor:"pointer", opacity: i === imgIdx ? 1 : 0.5, transition:"all 0.3s" }}>
                  <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ color:"var(--gold)", letterSpacing:3, fontSize:11, textTransform:"uppercase", marginBottom:8 }}>{product.category}</p>
            <h1 className="cormorant" style={{ fontSize:"clamp(28px,3vw,44px)", fontWeight:600, marginBottom:12 }}>{product.name}</h1>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
              <Stars rating={product.rating} size={16} />
              <span style={{ color:"var(--text3)", fontSize:13 }}>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
              <span className="cormorant" style={{ fontSize:36, fontWeight:700, color:"var(--gold)" }}>{fmt(product.price)}</span>
              <div>
                <span style={{ display:"block", fontSize:14, color:"var(--text3)", textDecoration:"line-through" }}>{fmt(product.originalPrice)}</span>
                <span style={{ fontSize:12, color:"var(--green)", fontWeight:600 }}>Save {fmt(product.originalPrice - product.price)}</span>
              </div>
            </div>
            <p style={{ color:"var(--text2)", lineHeight:1.8, marginBottom:24, fontSize:14 }}>{product.description}</p>

            {/* Sizes */}
            {product.sizes[0] !== "One Size" && (
              <div style={{ marginBottom:24 }}>
                <p style={{ fontSize:12, color:"var(--text3)", letterSpacing:2, marginBottom:8 }}>SELECT SIZE</p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} style={{ padding:"8px 16px", borderRadius:8, border:`1px solid ${size === s ? "var(--gold)" : "var(--border)"}`, background: size === s ? "rgba(201,168,76,0.1)" : "transparent", color: size === s ? "var(--gold)" : "var(--text2)", cursor:"pointer", fontSize:12, transition:"all 0.3s" }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <p style={{ fontSize:12, color: product.stock > 10 ? "var(--green)" : "var(--red)", marginBottom:20 }}>
              {product.stock > 10 ? "✓ In Stock" : `⚠ Only ${product.stock} left!`}
            </p>

            {/* Qty */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:0, border:"1px solid var(--border)", borderRadius:50, overflow:"hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ background:"none", border:"none", width:40, height:40, cursor:"pointer", color:"var(--text)", fontSize:18 }}>-</button>
                <span style={{ padding:"0 16px", color:"var(--text)", fontSize:14 }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ background:"none", border:"none", width:40, height:40, cursor:"pointer", color:"var(--text)", fontSize:18 }}>+</button>
              </div>
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button className="btn-gold" onClick={() => onAdd(product, qty)} style={{ flex:1, minWidth:160 }}>+ Add to Cart</button>
              <button className="btn-gold" onClick={() => { onAdd(product, qty); setPage("checkout"); }} style={{ flex:1, minWidth:160, background:"linear-gradient(135deg,#1a1a1a,#2e2e2e)", color:"var(--gold)", border:"1px solid var(--gold)" }}>⚡ Buy Now</button>
              <button className="btn-outline" onClick={() => onWish(product.id)} style={{ width:"100%", borderColor: inWish ? "var(--red)" : "var(--border)", color: inWish ? "var(--red)" : "var(--text)" }}>
                {inWish ? "♥ Wishlisted" : "♡ Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CART PAGE ─────────────────────────────────────────────────────────────────
function CartPage({ cart, setCart, setPage }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const updateQty = (id, delta) => setCart(c => c.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty + delta)} : i));
  const remove = (id) => setCart(c => c.filter(i => i.id !== id));
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, padding:"100px 5% 80px", background:"var(--bg)" }}>
      <h1 className="cormorant" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:600, marginBottom:40 }}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign:"center", padding:80, color:"var(--text3)" }}>
          <div style={{ fontSize:64, marginBottom:20 }}>◻</div>
          <p style={{ fontSize:18, marginBottom:20 }}>Your cart is empty</p>
          <button className="btn-gold" onClick={() => setPage("shop")}>Start Shopping</button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:40, maxWidth:1100, margin:"0 auto" }}>
          <style>{`@media(max-width:900px){.cart-grid{grid-template-columns:1fr!important}}`}</style>
          <div className="cart-grid" style={{ display:"contents" }}>
            <div>
              {cart.map(item => (
                <div key={item.id} style={{ display:"flex", gap:16, padding:"20px 0", borderBottom:"1px solid var(--border)", alignItems:"center" }}>
                  <div style={{ width:80, height:80, borderRadius:10, overflow:"hidden", flexShrink:0 }}>
                    <img src={item.image} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <h4 style={{ fontSize:15, marginBottom:4 }}>{item.name}</h4>
                    <p style={{ fontSize:12, color:"var(--text3)" }}>{item.category}</p>
                    <p style={{ color:"var(--gold)", fontWeight:600, marginTop:4 }}>{fmt(item.price)}</p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, border:"1px solid var(--border)", borderRadius:50, padding:"4px 12px" }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text)", fontSize:16 }}>-</button>
                    <span style={{ minWidth:20, textAlign:"center", fontSize:13 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text)", fontSize:16 }}>+</button>
                  </div>
                  <span style={{ minWidth:80, textAlign:"right", fontWeight:600 }}>{fmt(item.price * item.qty)}</span>
                  <button onClick={() => remove(item.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", fontSize:18, padding:8 }}>✕</button>
                </div>
              ))}
            </div>

            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:28, alignSelf:"start", position:"sticky", top:100 }}>
              <h3 className="cormorant" style={{ fontSize:24, marginBottom:24 }}>Order Summary</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, color:"var(--text2)" }}>
                  <span>Subtotal ({cart.reduce((s,i) => s + i.qty, 0)} items)</span>
                  <span>{fmt(total)}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, color:"var(--text2)" }}>
                  <span>Shipping</span>
                  <span style={{ color:"var(--green)" }}>{total > 2000 ? "FREE" : fmt(199)}</span>
                </div>
                <div style={{ borderTop:"1px solid var(--border)", paddingTop:12, display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:16 }}>
                  <span>Total</span>
                  <span style={{ color:"var(--gold)" }}>{fmt(total > 2000 ? total : total + 199)}</span>
                </div>
              </div>
              <button className="btn-gold" onClick={() => setPage("checkout")} style={{ width:"100%", padding:14, fontSize:14 }}>
                Proceed to Checkout →
              </button>
              <p style={{ textAlign:"center", fontSize:11, color:"var(--text3)", marginTop:12 }}>🔒 Secure checkout via Razorpay</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RAZORPAY HOOK ────────────────────────────────────────────────────────────
function useRazorpay() {
  const [ready, setReady] = useState(!!window.Razorpay);
  useEffect(() => {
    if (window.Razorpay) { setReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => console.error("Razorpay SDK failed to load");
    document.body.appendChild(script);
    return () => { try { document.body.removeChild(script); } catch {} };
  }, []);
  return ready;
}

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────
function Checkout({ cart, setCart, setPage, setOrders }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", city:"", pin:"" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const razorReady = useRazorpay();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shipping;

  // ── Replace with your actual Razorpay Key ID from https://dashboard.razorpay.com ──
  const RAZORPAY_KEY_ID = "rzp_test_YourKeyHere";

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g,""))) e.phone = "Valid 10-digit phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const createOrder = () => {
    const orderId = "LUXE" + Date.now();
    const order = {
      id: orderId,
      items: [...cart],
      total,
      date: new Date().toLocaleDateString("en-IN"),
      status: 1,
      address: { ...form },
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-IN"),
    };
    setOrders(prev => [...prev, order]);
    setCart([]);
    setLoading(false);
    setPage("success_" + orderId);
  };

  const handlePay = () => {
    if (!validate()) return;

    // ── If no real key provided, fall back to demo simulation ──
    if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === "rzp_test_YourKeyHere") {
      setLoading(true);
      setTimeout(createOrder, 2000);
      return;
    }

    if (!razorReady) { alert("Payment gateway loading, please wait a moment."); return; }

    setLoading(true);

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: total * 100,           // amount in paise
      currency: "INR",
      name: "LUXE",
      description: `Order for ${cart.length} item(s)`,
      image: "https://via.placeholder.com/64x64/c9a84c/000000?text=L",
      // order_id: "order_xxx",       // Pass server-generated Razorpay order ID here for production
      prefill: {
        name:  form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: `${form.address}, ${form.city} - ${form.pin}`,
      },
      theme: { color: "#c9a84c" },
      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
      handler: (response) => {
        // response.razorpay_payment_id  ← real payment ID from Razorpay
        // In production: verify signature on your backend before confirming order
        console.log("✅ Razorpay Payment ID:", response.razorpay_payment_id);
        createOrder();
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setLoading(false);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      setLoading(false);
      alert("Could not open payment window. Please try again.");
      console.error(err);
    }
  };

  const upd = (k, v) => { setForm(f => ({...f, [k]: v})); setErrors(e => ({...e, [k]: ""})); };

  const inp = (key) => ({
    background: "var(--surface)",
    border: `1px solid ${errors[key] ? "var(--red)" : "var(--border)"}`,
    borderRadius: 8,
    padding: "12px 16px",
    color: "var(--text)",
    fontSize: 13,
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s",
    fontFamily: "'DM Sans', sans-serif",
  });

  const errMsg = (key) => errors[key]
    ? <p style={{ fontSize:11, color:"var(--red)", marginTop:4, marginBottom:4 }}>{errors[key]}</p>
    : null;

  return (
    <div style={{ minHeight:"100vh", paddingTop:100, padding:"100px 5% 80px", background:"var(--bg)" }}>
      <h1 className="cormorant" style={{ fontSize:"clamp(28px,4vw,52px)", marginBottom:40 }}>Checkout</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:40, maxWidth:1100, margin:"0 auto" }}>
        <style>{`@media(max-width:900px){.checkout-grid{grid-template-columns:1fr!important}}`}</style>
        <div className="checkout-grid" style={{ display:"contents" }}>

          {/* ── Left: Delivery + Payment Info ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <h3 style={{ fontSize:13, fontWeight:600, letterSpacing:2, color:"var(--text2)", marginBottom:8 }}>DELIVERY DETAILS</h3>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <input placeholder="Full Name *" value={form.name} onChange={e => upd("name",e.target.value)} style={inp("name")} />
                {errMsg("name")}
              </div>
              <div>
                <input placeholder="Email Address *" value={form.email} onChange={e => upd("email",e.target.value)} style={inp("email")} />
                {errMsg("email")}
              </div>
              <div>
                <input placeholder="Phone (10 digits) *" value={form.phone} onChange={e => upd("phone",e.target.value)} style={inp("phone")} />
                {errMsg("phone")}
              </div>
              <div>
                <input placeholder="PIN Code" value={form.pin} onChange={e => upd("pin",e.target.value)} style={inp("pin")} />
              </div>
            </div>
            <div>
              <input placeholder="Street Address *" value={form.address} onChange={e => upd("address",e.target.value)} style={inp("address")} />
              {errMsg("address")}
            </div>
            <div>
              <input placeholder="City *" value={form.city} onChange={e => upd("city",e.target.value)} style={inp("city")} />
              {errMsg("city")}
            </div>

            {/* ── Razorpay badge ── */}
            <h3 style={{ fontSize:13, fontWeight:600, letterSpacing:2, color:"var(--text2)", marginTop:24, marginBottom:8 }}>PAYMENT METHOD</h3>
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                {/* Razorpay logo SVG inline */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ borderRadius:8 }}>
                  <rect width="40" height="40" rx="8" fill="#072654"/>
                  <path d="M12 28L17.5 12H23L26 18.5L28.5 12H34L25 28H20L17.5 22L15 28H12Z" fill="#3395FF"/>
                  <path d="M22 19L24.5 12H30L27 19H22Z" fill="#fff" fillOpacity="0.9"/>
                </svg>
                <div>
                  <p style={{ fontWeight:700, fontSize:14 }}>Razorpay</p>
                  <p style={{ fontSize:11, color:"var(--text3)" }}>India's most trusted payment gateway</p>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:10, color:"var(--green)", background:"rgba(76,175,125,0.12)", border:"1px solid rgba(76,175,125,0.3)", borderRadius:20, padding:"2px 8px", fontWeight:600 }}>🔒 Secured</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {[
                  { label:"UPI", color:"#6B3FA0" },
                  { label:"Visa", color:"#1A1F71" },
                  { label:"Mastercard", color:"#EB001B" },
                  { label:"Paytm", color:"#002970" },
                  { label:"PhonePe", color:"#5F259F" },
                  { label:"Net Banking", color:"#333" },
                  { label:"EMI", color:"#c9a84c" },
                  { label:"Wallets", color:"#1DA462" },
                ].map(({ label, color }) => (
                  <span key={label} style={{ padding:"4px 12px", background:`${color}22`, border:`1px solid ${color}44`, borderRadius:20, fontSize:11, color:"var(--text2)", fontWeight:500 }}>{label}</span>
                ))}
              </div>
              <p style={{ fontSize:11, color:"var(--text3)", marginTop:12 }}>
                You'll be redirected to the Razorpay secure payment window to complete your transaction.
              </p>
            </div>

            {/* ── Key config hint ── */}
            {(!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === "rzp_test_YourKeyHere") && (
              <div style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:10, padding:"12px 16px", fontSize:12, color:"var(--gold)", lineHeight:1.7 }}>
                <strong>⚙ Developer Note:</strong> Replace <code style={{ background:"rgba(0,0,0,0.3)", padding:"1px 6px", borderRadius:4 }}>RAZORPAY_KEY_ID</code> in the source with your key from{" "}
                <strong>dashboard.razorpay.com → Settings → API Keys</strong>. Until then, payments run in demo simulation mode.
              </div>
            )}
          </div>

          {/* ── Right: Order Summary + Pay Button ── */}
          <div style={{ alignSelf:"start", position:"sticky", top:100 }}>
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:24, marginBottom:16 }}>
              <h3 className="cormorant" style={{ fontSize:22, marginBottom:16 }}>Order Summary</h3>
              {cart.map(i => (
                <div key={i.id} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:6, overflow:"hidden", flexShrink:0, background:"var(--bg2)" }}>
                    <img src={i.image} alt={i.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <span style={{ flex:1, fontSize:12, color:"var(--text2)", lineHeight:1.3 }}>{i.name}<br/><span style={{ color:"var(--text3)" }}>× {i.qty}</span></span>
                  <span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{fmt(i.price * i.qty)}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid var(--border)", marginTop:12, paddingTop:12, display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--text2)" }}>
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--text2)" }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? "var(--green)" : "var(--text)" }}>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:16, paddingTop:8, borderTop:"1px solid var(--border)" }}>
                  <span>Total</span>
                  <span style={{ color:"var(--gold)" }}>{fmt(total)}</span>
                </div>
              </div>
            </div>

            <button
              className="btn-gold"
              onClick={handlePay}
              disabled={loading || cart.length === 0}
              style={{ width:"100%", padding:16, fontSize:14, opacity: (loading || cart.length === 0) ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? (
                <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  <span style={{ animation:"spin-slow 1s linear infinite", display:"inline-block" }}>◈</span> Opening Razorpay...
                </span>
              ) : (
                <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  <svg width="18" height="18" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#072654"/><path d="M12 28L17.5 12H23L26 18.5L28.5 12H34L25 28H20L17.5 22L15 28H12Z" fill="#3395FF"/><path d="M22 19L24.5 12H30L27 19H22Z" fill="#fff" fillOpacity="0.9"/></svg>
                  Pay {fmt(total)} via Razorpay
                </span>
              )}
            </button>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12 }}>
              <span style={{ fontSize:12 }}>🔒</span>
              <span style={{ fontSize:11, color:"var(--text3)" }}>256-bit SSL · PCI DSS Compliant</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS PAGE ─────────────────────────────────────────────────────────────
function SuccessPage({ orderId, orders, setPage }) {
  const order = orders.find(o => o.id === orderId);
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", background:"var(--bg)", padding:"5%" }}>
      <div style={{ textAlign:"center", opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.8)", transition:"all 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ fontSize:80, marginBottom:20, animation:"pulse-gold 2s infinite" }}>◈</div>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"var(--green)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 24px", animation:"scale-in 0.5s ease" }}>✓</div>
        <h1 className="cormorant" style={{ fontSize:"clamp(32px,5vw,64px)", fontWeight:600, marginBottom:8 }}>Order Confirmed!</h1>
        <p style={{ color:"var(--text2)", marginBottom:24, fontSize:16 }}>Thank you for your purchase. Your order is being processed.</p>
        {order && (
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:24, maxWidth:400, margin:"0 auto 32px", textAlign:"left" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"var(--text3)", fontSize:13 }}>Order ID</span>
              <span style={{ color:"var(--gold)", fontWeight:600, fontSize:13 }}>{order.id}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"var(--text3)", fontSize:13 }}>Total Paid</span>
              <span style={{ fontWeight:700 }}>{fmt(order.total)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:"var(--text3)", fontSize:13 }}>Est. Delivery</span>
              <span style={{ color:"var(--green)", fontSize:13 }}>{order.estimatedDelivery}</span>
            </div>
          </div>
        )}
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-gold" onClick={() => setPage("tracking")}>Track Order</button>
          <button className="btn-outline" onClick={() => setPage("shop")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

// ─── ORDER TRACKING ────────────────────────────────────────────────────────────
function TrackingPage({ orders }) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(null);
  const handleSearch = () => {
    const found = orders.find(o => o.id.toLowerCase() === search.toLowerCase());
    setOrder(found || null);
    if (!found && search) alert("Order not found. Try demo order IDs from your past orders.");
  };
  const demoOrder = orders[orders.length - 1];
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, padding:"100px 5% 80px", background:"var(--bg)" }}>
      <div style={{ textAlign:"center", marginBottom:60 }}>
        <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11 }}>REAL-TIME</p>
        <h1 className="cormorant" style={{ fontSize:"clamp(28px,4vw,56px)", fontWeight:600 }}>Order Tracking</h1>
        <p style={{ color:"var(--text2)", marginTop:8 }}>Enter your Order ID to track your delivery</p>
      </div>

      <div style={{ maxWidth:500, margin:"0 auto 60px", display:"flex", gap:12 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter Order ID (e.g. LUXE...)"
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          style={{ flex:1, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:50, padding:"14px 20px", color:"var(--text)", fontSize:13, outline:"none" }} />
        <button className="btn-gold" onClick={handleSearch} style={{ padding:"14px 24px", whiteSpace:"nowrap" }}>Track →</button>
      </div>

      {demoOrder && !order && (
        <p style={{ textAlign:"center", color:"var(--text3)", fontSize:13, marginBottom:40 }}>
          Try: <button onClick={() => { setSearch(demoOrder.id); setOrder(demoOrder); }} style={{ background:"none", border:"none", color:"var(--gold)", cursor:"pointer", textDecoration:"underline" }}>{demoOrder.id}</button>
        </p>
      )}

      {order && (
        <div style={{ maxWidth:700, margin:"0 auto", animation:"scale-in 0.5s ease" }}>
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:32, marginBottom:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:24 }}>
              <div>
                <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:2 }}>ORDER ID</p>
                <p style={{ fontWeight:700, color:"var(--gold)" }}>{order.id}</p>
              </div>
              <div>
                <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:2 }}>PLACED ON</p>
                <p style={{ fontWeight:600 }}>{order.date}</p>
              </div>
              <div>
                <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:2 }}>EST. DELIVERY</p>
                <p style={{ fontWeight:600, color:"var(--green)" }}>{order.estimatedDelivery}</p>
              </div>
              <div>
                <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:2 }}>TOTAL</p>
                <p style={{ fontWeight:700 }}>{fmt(order.total)}</p>
              </div>
            </div>

            {/* Progress timeline */}
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", top:20, left:"calc(10% + 20px)", right:"calc(10% + 20px)", height:2, background:"var(--bg3)", zIndex:0 }} />
              <div style={{ position:"absolute", top:20, left:"calc(10% + 20px)", height:2, background:"linear-gradient(90deg,var(--gold),var(--gold2))", zIndex:1, width:`${Math.max(0,(order.status - 1) / (ORDER_STEPS.length - 1) * 100)}%`, transition:"width 1s ease" }} />
              <div style={{ display:"flex", justifyContent:"space-between", position:"relative", zIndex:2 }}>
                {ORDER_STEPS.map((step, i) => (
                  <div key={step} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                    <div style={{
                      width:40, height:40, borderRadius:"50%",
                      background: i < order.status ? "linear-gradient(135deg,var(--gold),var(--gold2))" : i === order.status ? "var(--surface)" : "var(--bg3)",
                      border: i === order.status ? "2px solid var(--gold)" : "2px solid transparent",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: i < order.status ? 16 : 12,
                      color: i < order.status ? "#0a0a0c" : i === order.status ? "var(--gold)" : "var(--text3)",
                      transition:"all 0.5s ease",
                      animation: i === order.status ? "pulse-gold 2s infinite" : "none"
                    }}>
                      {i < order.status ? "✓" : i + 1}
                    </div>
                    <p style={{ fontSize:9, color: i <= order.status ? "var(--text)" : "var(--text3)", marginTop:8, textAlign:"center", letterSpacing:0.5, fontWeight: i === order.status ? 600 : 400 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ordered items */}
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:24 }}>
            <h3 style={{ fontSize:15, fontWeight:600, marginBottom:16, letterSpacing:1, color:"var(--text2)" }}>ORDER ITEMS</h3>
            {order.items.map(item => (
              <div key={item.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
                <div style={{ width:50, height:50, borderRadius:8, overflow:"hidden" }}>
                  <img src={item.image} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:600 }}>{item.name}</p>
                  <p style={{ fontSize:12, color:"var(--text3)" }}>Qty: {item.qty}</p>
                </div>
                <span style={{ color:"var(--gold)", fontWeight:600 }}>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AUTH PAGE ─────────────────────────────────────────────────────────────────
function AuthPage({ setUser, setPage }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const upd = (k,v) => setForm(f => ({...f,[k]:v}));
  const inp = { background:"var(--surface)", border:"1px solid var(--border)", borderRadius:8, padding:"14px 16px", color:"var(--text)", fontSize:13, outline:"none", width:"100%", marginBottom:12, transition:"border-color 0.3s" };
  const handleSubmit = () => {
    if (!form.email || !form.password) { alert("Please fill in all fields"); return; }
    const user = { name: form.name || form.email.split("@")[0], email: form.email };
    setUser(user);
    setPage("home");
  };
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)", padding:"5%" }}>
      <div style={{ width:"100%", maxWidth:420, animation:"scale-in 0.4s ease" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <span style={{ fontSize:32, color:"var(--gold)" }}>◈</span>
          <h1 className="cormorant" style={{ fontSize:40, fontWeight:600, marginTop:8 }}>{mode === "login" ? "Welcome Back" : "Join LUXE"}</h1>
          <p style={{ color:"var(--text2)", fontSize:14, marginTop:4 }}>{mode === "login" ? "Sign in to your account" : "Create your premium account"}</p>
        </div>

        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:32 }}>
          {mode === "signup" && <input placeholder="Full Name" value={form.name} onChange={e => upd("name",e.target.value)} style={inp} />}
          <input placeholder="Email Address" value={form.email} onChange={e => upd("email",e.target.value)} style={inp} />
          <input type="password" placeholder="Password" value={form.password} onChange={e => upd("password",e.target.value)} style={inp} />
          <button className="btn-gold" onClick={handleSubmit} style={{ width:"100%", padding:14, fontSize:14, marginTop:8 }}>
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
          <p style={{ textAlign:"center", fontSize:13, color:"var(--text2)", marginTop:20 }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(m => m === "login" ? "signup" : "login")} style={{ background:"none", border:"none", color:"var(--gold)", cursor:"pointer", textDecoration:"underline" }}>
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ user, orders, setPage, setUser }) {
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, padding:"100px 5% 80px", background:"var(--bg)" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:40 }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold2))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:700, color:"#0a0a0c" }}>{user.name[0]}</div>
          <div>
            <h1 className="cormorant" style={{ fontSize:32, fontWeight:600 }}>Welcome, {user.name}</h1>
            <p style={{ color:"var(--text2)", fontSize:13 }}>{user.email}</p>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:40 }}>
          {[["Total Orders", orders.length, "◻"],["Wishlist Items","0","♡"],["Member Since","2024","◈"]].map(([l,v,i]) => (
            <div key={l} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:20, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:24, color:"var(--gold)" }}>{i}</span>
              <div>
                <p className="cormorant" style={{ fontSize:28, fontWeight:700, lineHeight:1 }}>{v}</p>
                <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:1 }}>{l}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize:18, fontWeight:600, marginBottom:20, letterSpacing:1, color:"var(--text2)" }}>MY ORDERS</h2>
        {orders.length === 0 ? (
          <div style={{ textAlign:"center", padding:40, color:"var(--text3)", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12 }}>
            <p>No orders yet. <button onClick={() => setPage("shop")} style={{ background:"none", border:"none", color:"var(--gold)", cursor:"pointer" }}>Start shopping</button></p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:20, marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
              <div>
                <p style={{ fontWeight:600, color:"var(--gold)", fontSize:14 }}>{order.id}</p>
                <p style={{ fontSize:12, color:"var(--text3)" }}>{order.date} · {order.items.length} item(s)</p>
              </div>
              <div style={{ textAlign:"center" }}>
                <span className="tag-badge" style={{ background:"rgba(201,168,76,0.15)", color:"var(--gold)", border:"1px solid rgba(201,168,76,0.3)" }}>
                  {ORDER_STEPS[order.status - 1] || "Processing"}
                </span>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontWeight:700 }}>{fmt(order.total)}</p>
                <button onClick={() => setPage("tracking")} style={{ background:"none", border:"none", color:"var(--gold)", cursor:"pointer", fontSize:12, textDecoration:"underline" }}>Track Order</button>
              </div>
            </div>
          ))
        )}

        <button onClick={() => setUser(null)} style={{ marginTop:32, background:"none", border:"1px solid var(--border)", borderRadius:50, padding:"10px 24px", color:"var(--text2)", cursor:"pointer", fontSize:13, transition:"all 0.3s" }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── WISHLIST ──────────────────────────────────────────────────────────────────
function WishlistPage({ wishlist, onWish, onAdd, setPage, setSelectedProduct }) {
  const items = DEMO_PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, padding:"100px 5% 80px", background:"var(--bg)" }}>
      <h1 className="cormorant" style={{ fontSize:"clamp(28px,4vw,52px)", marginBottom:40 }}>My Wishlist</h1>
      {items.length === 0 ? (
        <div style={{ textAlign:"center", padding:80, color:"var(--text3)" }}>
          <div style={{ fontSize:64, marginBottom:20 }}>♡</div>
          <p style={{ marginBottom:20 }}>Your wishlist is empty</p>
          <button className="btn-gold" onClick={() => setPage("shop")}>Explore Products</button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24 }}>
          {items.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onWish={onWish} wishlist={wishlist} setPage={setPage} setSelectedProduct={setSelectedProduct} />)}
        </div>
      )}
    </div>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} style={{ padding:"100px 5%", background:"var(--bg2)" }}>
      <div className={`fade-up ${vis ? "visible" : ""}`} style={{ textAlign:"center", marginBottom:60 }}>
        <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11, textTransform:"uppercase" }}>What They Say</p>
        <div className="gold-line" style={{ margin:"12px auto 0" }} />
        <h2 className="cormorant" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:600 }}>Client Stories</h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24, maxWidth:1100, margin:"0 auto" }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className={`fade-up ${vis ? "visible" : ""} card-hover glass`} style={{ borderRadius:16, padding:28, animationDelay:`${i*0.1}s`, border:"1px solid var(--border)" }}>
            <Stars rating={t.rating} size={16} />
            <p style={{ color:"var(--text2)", lineHeight:1.8, margin:"16px 0", fontSize:14, fontStyle:"italic" }}>"{t.text}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold2))", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#0a0a0c", flexShrink:0 }}>{t.avatar}</div>
              <div>
                <p style={{ fontWeight:600, fontSize:14 }}>{t.name}</p>
                <p style={{ fontSize:11, color:"var(--text3)" }}>{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [ref, vis] = useInView();
  return (
    <section ref={ref} style={{ padding:"80px 5%", background:"var(--bg)", textAlign:"center" }}>
      <div className={`fade-up ${vis ? "visible" : ""}`} style={{ maxWidth:560, margin:"0 auto" }}>
        <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11, textTransform:"uppercase" }}>Stay Exclusive</p>
        <h2 className="cormorant" style={{ fontSize:"clamp(24px,3vw,40px)", margin:"12px 0 8px", fontWeight:600 }}>Join the Inner Circle</h2>
        <p style={{ color:"var(--text2)", marginBottom:32, fontSize:14 }}>Get early access to new drops, exclusive offers, and premium lifestyle content.</p>
        {done ? (
          <p style={{ color:"var(--green)", fontSize:16, fontWeight:600 }}>✓ You're in! Welcome to LUXE.</p>
        ) : (
          <div style={{ display:"flex", gap:8, maxWidth:400, margin:"0 auto", flexWrap:"wrap", justifyContent:"center" }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
              style={{ flex:1, minWidth:200, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:50, padding:"14px 20px", color:"var(--text)", fontSize:13, outline:"none" }} />
            <button className="btn-gold" onClick={() => { if(email.includes("@")) setDone(true); }} style={{ padding:"14px 24px" }}>Subscribe</button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── STATS SECTION ─────────────────────────────────────────────────────────────
function Stats() {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} style={{ padding:"80px 5%", background:"linear-gradient(135deg,rgba(201,168,76,0.05),transparent)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:32, maxWidth:900, margin:"0 auto", textAlign:"center" }}>
        {[["10,000+","Happy Customers"],["500+","Premium Products"],["50+","Luxury Brands"],["4.9★","Average Rating"]].map(([n,l], i) => (
          <div key={l} className={`fade-up ${vis ? "visible" : ""}`} style={{ animationDelay:`${i * 0.1}s` }}>
            <div className="cormorant shimmer-text" style={{ fontSize:40, fontWeight:700 }}>{n}</div>
            <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:2, textTransform:"uppercase", marginTop:6 }}>{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const [ref, vis] = useInView();
  return (
    <div style={{ minHeight:"100vh", paddingTop:80, background:"var(--bg)" }}>
      <div style={{ padding:"80px 5%", maxWidth:900, margin:"0 auto" }}>
        <div ref={ref} className={`fade-up ${vis ? "visible" : ""}`} style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11 }}>OUR STORY</p>
          <h1 className="cormorant" style={{ fontSize:"clamp(36px,6vw,80px)", fontWeight:300, marginTop:8 }}>The Art of<br/><em>Refinement</em></h1>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }}>
          <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
          <div className="about-grid" style={{ display:"contents" }}>
            <div>
              <p style={{ color:"var(--text2)", lineHeight:2, fontSize:15, marginBottom:20 }}>LUXE was founded on a singular belief: that exceptional quality should be accessible to those who appreciate it. We curate only the finest — from master watchmakers in Switzerland to silk weavers in Lyon.</p>
              <p style={{ color:"var(--text2)", lineHeight:2, fontSize:15 }}>Every product in our collection is personally vetted by our team of connoisseurs. We don't just sell products — we sell stories, heritage, and the quiet confidence that comes from owning something truly special.</p>
            </div>
            <div style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))", border:"1px solid rgba(201,168,76,0.2)", borderRadius:20, padding:32 }}>
              {[["2018","Founded with vision"],["2020","10,000 happy clients"],["2022","Pan-India delivery"],["2024","Global expansion"]].map(([y,t]) => (
                <div key={y} style={{ display:"flex", gap:16, marginBottom:20, alignItems:"flex-start" }}>
                  <span className="cormorant" style={{ color:"var(--gold)", fontWeight:700, fontSize:20, minWidth:48 }}>{y}</span>
                  <p style={{ color:"var(--text2)", fontSize:14, paddingTop:3 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Stats />
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const inp = { background:"var(--surface)", border:"1px solid var(--border)", borderRadius:8, padding:"14px 16px", color:"var(--text)", fontSize:13, outline:"none", width:"100%", marginBottom:16, fontFamily:"'DM Sans',sans-serif" };
  return (
    <div style={{ minHeight:"100vh", paddingTop:80, padding:"80px 5%", background:"var(--bg)" }}>
      <div style={{ maxWidth:600, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11 }}>GET IN TOUCH</p>
          <h1 className="cormorant" style={{ fontSize:"clamp(28px,4vw,56px)", marginTop:8, fontWeight:600 }}>Contact Us</h1>
        </div>
        {sent ? (
          <div style={{ textAlign:"center", padding:48, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16 }}>
            <div style={{ fontSize:48, marginBottom:12 }}>✓</div>
            <h3 className="cormorant" style={{ fontSize:28 }}>Message Received!</h3>
            <p style={{ color:"var(--text2)", marginTop:8 }}>We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:36 }}>
            <input placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))} style={inp} />
            <input placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))} style={inp} />
            <textarea placeholder="Your Message" value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} rows={5} style={{...inp, resize:"vertical"}} />
            <button className="btn-gold" onClick={() => { if(form.name && form.email) setSent(true); }} style={{ width:"100%", padding:14 }}>Send Message</button>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginTop:40, textAlign:"center" }}>
          {[["📍","Visit Us","Mumbai, India"],["📧","Email","hello@luxe.in"],["📞","Call","1800-LUXE-99"]].map(([e,l,v]) => (
            <div key={l} style={{ padding:20, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12 }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{e}</div>
              <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:1, marginBottom:4 }}>{l}</p>
              <p style={{ fontSize:13, fontWeight:600 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ orders, setOrders }) {
  const [tab, setTab] = useState("orders");
  const [newProduct, setNewProduct] = useState({ name:"", price:"", category:"", description:"" });
  const updateOrderStatus = (id, delta) => {
    setOrders(prev => prev.map(o => o.id === id ? {...o, status: Math.min(6, Math.max(1, o.status + delta))} : o));
  };
  const totalRevenue = orders.reduce((s,o) => s + o.total, 0);
  return (
    <div style={{ minHeight:"100vh", paddingTop:80, background:"var(--bg)" }}>
      <div style={{ display:"flex", borderBottom:"1px solid var(--border)", padding:"0 5%" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"20px 0 20px", marginRight:40 }}>
          <span style={{ color:"var(--gold)", fontSize:18 }}>◈</span>
          <span className="cormorant" style={{ fontSize:20, fontWeight:700, letterSpacing:3 }}>ADMIN</span>
        </div>
        {["orders","products","analytics"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background:"none", border:"none", cursor:"pointer", padding:"20px 16px", color: tab === t ? "var(--gold)" : "var(--text2)", borderBottom: tab === t ? "2px solid var(--gold)" : "2px solid transparent", fontSize:13, letterSpacing:1, textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>{t}</button>
        ))}
      </div>

      <div style={{ padding:"40px 5%" }}>
        {tab === "analytics" && (
          <div>
            <h2 className="cormorant" style={{ fontSize:32, marginBottom:32 }}>Sales Analytics</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20, marginBottom:40 }}>
              {[["Total Revenue", fmt(totalRevenue), "▲"],["Total Orders", orders.length, "◻"],["Avg Order Value", orders.length ? fmt(Math.round(totalRevenue/orders.length)) : "₹0","◈"],["Products", DEMO_PRODUCTS.length, "◇"]].map(([l,v,i]) => (
                <div key={l} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:24 }}>
                  <p style={{ fontSize:11, color:"var(--text3)", letterSpacing:2, marginBottom:8 }}>{l.toUpperCase()}</p>
                  <p className="cormorant" style={{ fontSize:32, fontWeight:700, color:"var(--gold)" }}>{v}</p>
                </div>
              ))}
            </div>
            {/* Simple bar chart */}
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:24 }}>
              <h3 style={{ fontSize:15, marginBottom:20, color:"var(--text2)", letterSpacing:1 }}>REVENUE BY CATEGORY</h3>
              {["Watches","Clothing","Fragrance","Accessories","Footwear","Bags"].map((cat, i) => {
                const w = [85, 65, 45, 55, 70, 40][i];
                return (
                  <div key={cat} style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
                      <span style={{ color:"var(--text2)" }}>{cat}</span>
                      <span style={{ color:"var(--gold)", fontWeight:600 }}>{w}%</span>
                    </div>
                    <div style={{ height:6, background:"var(--bg3)", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${w}%`, background:"linear-gradient(90deg,var(--gold),var(--gold2))", borderRadius:3, transition:"width 1s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h2 className="cormorant" style={{ fontSize:32, marginBottom:32 }}>Manage Orders</h2>
            {orders.length === 0 ? (
              <p style={{ color:"var(--text3)", textAlign:"center", padding:40 }}>No orders yet.</p>
            ) : (
              orders.map(order => (
                <div key={order.id} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:20, marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                    <div>
                      <p style={{ fontWeight:700, color:"var(--gold)" }}>{order.id}</p>
                      <p style={{ fontSize:12, color:"var(--text3)" }}>{order.date} · {order.items.length} item(s) · {fmt(order.total)}</p>
                      {order.address && <p style={{ fontSize:12, color:"var(--text3)" }}>{order.address.name}, {order.address.city}</p>}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontSize:13, color:"var(--gold)", background:"rgba(201,168,76,0.1)", padding:"4px 12px", borderRadius:20, fontWeight:600 }}>
                        {ORDER_STEPS[order.status - 1]}
                      </span>
                      <button onClick={() => updateOrderStatus(order.id, -1)} style={{ background:"var(--bg3)", border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", color:"var(--text)", fontSize:12 }}>← Prev</button>
                      <button onClick={() => updateOrderStatus(order.id, 1)} style={{ background:"linear-gradient(135deg,var(--gold),var(--gold2))", border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", color:"#0a0a0c", fontWeight:600, fontSize:12 }}>Next →</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "products" && (
          <div>
            <h2 className="cormorant" style={{ fontSize:32, marginBottom:32 }}>Manage Products</h2>
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:24, marginBottom:32 }}>
              <h3 style={{ fontSize:15, marginBottom:20, letterSpacing:1, color:"var(--text2)" }}>ADD NEW PRODUCT</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                {[["name","Product Name"],["price","Price (₹)"],["category","Category"]].map(([k,ph]) => (
                  <input key={k} placeholder={ph} value={newProduct[k]} onChange={e => setNewProduct(p => ({...p,[k]:e.target.value}))}
                    style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:8, padding:"12px 16px", color:"var(--text)", fontSize:13, outline:"none" }} />
                ))}
              </div>
              <button className="btn-gold" style={{ padding:"12px 24px", fontSize:13 }}>+ Add Product</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
              {DEMO_PRODUCTS.map(p => (
                <div key={p.id} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
                  <div style={{ height:140, overflow:"hidden" }}>
                    <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div style={{ padding:12 }}>
                    <p style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{p.name}</p>
                    <p style={{ fontSize:12, color:"var(--gold)" }}>{fmt(p.price)}</p>
                    <div style={{ display:"flex", gap:6, marginTop:10 }}>
                      <button style={{ flex:1, background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.3)", borderRadius:6, padding:"4px 8px", color:"var(--gold)", cursor:"pointer", fontSize:11 }}>Edit</button>
                      <button style={{ background:"rgba(224,85,85,0.1)", border:"1px solid rgba(224,85,85,0.3)", borderRadius:6, padding:"4px 8px", color:"var(--red)", cursor:"pointer", fontSize:11 }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, onAdd, onWish, wishlist, setSelectedProduct }) {
  const [ref, vis] = useInView();
  return (
    <div>
      <Hero setPage={setPage} />
      
      {/* Featured Products */}
      <section style={{ padding:"100px 5%", background:"var(--bg)" }}>
        <div ref={ref} className={`fade-up ${vis ? "visible" : ""}`} style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11, textTransform:"uppercase" }}>Handpicked For You</p>
          <div className="gold-line" style={{ margin:"12px auto 0" }} />
          <h2 className="cormorant" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:600 }}>Featured Collection</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24 }}>
          {DEMO_PRODUCTS.slice(0,4).map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onWish={onWish} wishlist={wishlist} setPage={setPage} setSelectedProduct={setSelectedProduct} />
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:48 }}>
          <button className="btn-outline" onClick={() => setPage("shop")} style={{ padding:"14px 40px" }}>View All Products →</button>
        </div>
      </section>

      <FlashSale />
      <Categories onFilter={() => setPage("shop")} active="All" />

      {/* Best Sellers */}
      <section style={{ padding:"100px 5%", background:"var(--bg)" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11, textTransform:"uppercase" }}>Top Picks</p>
          <div className="gold-line" style={{ margin:"12px auto 0" }} />
          <h2 className="cormorant" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:600 }}>Best Sellers</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24 }}>
          {DEMO_PRODUCTS.filter(p => p.badge === "Bestseller" || p.rating >= 4.8).map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onWish={onWish} wishlist={wishlist} setPage={setPage} setSelectedProduct={setSelectedProduct} />
          ))}
        </div>
      </section>

      <Stats />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)", padding:"60px 5% 30px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
        <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}`}</style>
        <div className="footer-grid" style={{ display:"contents" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <span style={{ color:"var(--gold)", fontSize:22 }}>◈</span>
              <span className="cormorant" style={{ fontSize:24, fontWeight:700, letterSpacing:4 }}>LUXE</span>
            </div>
            <p style={{ color:"var(--text3)", fontSize:13, lineHeight:2, maxWidth:240 }}>Curating the world's finest luxury products for the discerning few.</p>
            <div style={{ display:"flex", gap:12, marginTop:20 }}>
              {["Instagram","Twitter","Pinterest","YouTube"].map(s => (
                <div key={s} style={{ width:36, height:36, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:12, color:"var(--text3)", transition:"all 0.3s" }}>{s[0]}</div>
              ))}
            </div>
          </div>
          {[
            ["Quick Links", ["home","shop","about","contact","admin"]],
            ["Support", ["FAQ","Return Policy","Privacy Policy","Track Order","Size Guide"]],
            ["Categories", ["Watches","Clothing","Fragrance","Accessories","Footwear"]]
          ].map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize:12, letterSpacing:3, color:"var(--text2)", marginBottom:20, textTransform:"uppercase", fontWeight:600 }}>{title}</h4>
              {links.map(l => (
                <button key={l} onClick={() => setPage(l.toLowerCase().replace(/ /g,""))} style={{ display:"block", background:"none", border:"none", color:"var(--text3)", fontSize:13, cursor:"pointer", marginBottom:10, textAlign:"left", fontFamily:"'DM Sans',sans-serif", transition:"color 0.3s" }}>{l}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:"1px solid var(--border)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontSize:12, color:"var(--text3)" }}>© 2024 LUXE. All rights reserved.</p>
        <p style={{ fontSize:12, color:"var(--text3)" }}>Secured by Razorpay · Made with ◈ in India</p>
      </div>
    </footer>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────────────────────
function FAQPage() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["How long does delivery take?","Standard delivery takes 3-7 business days. Express delivery (1-2 days) is available at checkout for select locations."],
    ["What is your return policy?","We offer a 30-day hassle-free return policy. Items must be unused and in original packaging."],
    ["Is my payment information secure?","Absolutely. All payments are processed through Razorpay with 256-bit SSL encryption. We never store card details."],
    ["Do you ship internationally?","Currently we ship pan-India. International shipping is coming soon."],
    ["How do I track my order?","Use our Order Tracking page with your Order ID. You'll also receive email/SMS updates at each stage."],
    ["Can I cancel my order?","Orders can be cancelled within 2 hours of placement. After dispatch, return policy applies."],
  ];
  return (
    <div style={{ minHeight:"100vh", paddingTop:80, padding:"80px 5%", background:"var(--bg)" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ color:"var(--gold)", letterSpacing:4, fontSize:11 }}>HELP CENTER</p>
          <h1 className="cormorant" style={{ fontSize:"clamp(28px,4vw,56px)", fontWeight:600, marginTop:8 }}>Frequently Asked</h1>
        </div>
        {faqs.map(([q, a], i) => (
          <div key={q} style={{ borderBottom:"1px solid var(--border)", marginBottom:2 }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width:"100%", background:"none", border:"none", padding:"20px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, textAlign:"left", fontFamily:"'DM Sans',sans-serif" }}>
              <span style={{ fontSize:15, fontWeight:600, color:"var(--text)" }}>{q}</span>
              <span style={{ color:"var(--gold)", fontSize:20, transition:"transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </button>
            {open === i && (
              <p style={{ color:"var(--text2)", fontSize:14, lineHeight:1.8, paddingBottom:20, animation:"scale-in 0.2s ease" }}>{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem("luxe_cart") || "[]"); } catch { return []; } });
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => { try { localStorage.setItem("luxe_cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { document.documentElement.className = dark ? "" : "light-mode"; }, [dark]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? {...i, qty: i.qty + qty} : i);
      return [...prev, {...product, qty}];
    });
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Parse success page
  let successOrderId = null;
  if (page.startsWith("success_")) successOrderId = page.replace("success_", "");

  const renderPage = () => {
    if (page === "home") return <HomePage setPage={setPage} onAdd={addToCart} onWish={toggleWishlist} wishlist={wishlist} setSelectedProduct={setSelectedProduct} />;
    if (page === "shop") return <ShopPage onAdd={addToCart} onWish={toggleWishlist} wishlist={wishlist} setPage={setPage} setSelectedProduct={setSelectedProduct} />;
    if (page === "product" && selectedProduct) return <ProductDetail product={selectedProduct} onAdd={addToCart} onWish={toggleWishlist} wishlist={wishlist} setPage={setPage} />;
    if (page === "cart") return <CartPage cart={cart} setCart={setCart} setPage={setPage} />;
    if (page === "checkout") return <Checkout cart={cart} setCart={setCart} setPage={setPage} setOrders={setOrders} />;
    if (page === "tracking") return <TrackingPage orders={orders} />;
    if (page === "auth") return <AuthPage setUser={setUser} setPage={setPage} />;
    if (page === "dashboard" && user) return <Dashboard user={user} orders={orders} setPage={setPage} setUser={setUser} />;
    if (page === "wishlist") return <WishlistPage wishlist={wishlist} onWish={toggleWishlist} onAdd={addToCart} setPage={setPage} setSelectedProduct={setSelectedProduct} />;
    if (page === "about") return <AboutPage />;
    if (page === "contact") return <ContactPage />;
    if (page === "admin") return <AdminPanel orders={orders} setOrders={setOrders} />;
    if (page === "faq") return <FAQPage />;
    if (page === "returnpolicy") return <div style={{ minHeight:"100vh", paddingTop:80, padding:"80px 5%", background:"var(--bg)" }}><h1 className="cormorant" style={{ fontSize:52 }}>Return Policy</h1><p style={{ color:"var(--text2)", marginTop:20, lineHeight:2, maxWidth:600 }}>We offer a 30-day return policy on all unused items in original packaging. Contact us at hello@luxe.in to initiate a return. Refunds are processed within 5-7 business days.</p></div>;
    if (page === "privacypolicy") return <div style={{ minHeight:"100vh", paddingTop:80, padding:"80px 5%", background:"var(--bg)" }}><h1 className="cormorant" style={{ fontSize:52 }}>Privacy Policy</h1><p style={{ color:"var(--text2)", marginTop:20, lineHeight:2, maxWidth:600 }}>Your privacy is important to us. We collect only what's necessary to process your orders. We never sell your data. All transactions are encrypted via Razorpay's secure infrastructure.</p></div>;
    if (page.startsWith("success_")) return <SuccessPage orderId={successOrderId} orders={orders} setPage={setPage} />;
    return <HomePage setPage={setPage} onAdd={addToCart} onWish={toggleWishlist} wishlist={wishlist} setSelectedProduct={setSelectedProduct} />;
  };

  if (!loaded) return (
    <>
      <GlobalStyles />
      <LoadingScreen onDone={() => setLoaded(true)} />
    </>
  );

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <GlobalStyles />
      <div style={{ minHeight:"100vh", background:"var(--bg)", color:"var(--text)" }}>
        <Navbar page={page} setPage={setPage} cartCount={cartCount} wishCount={wishlist.length} user={user} setUser={setUser} />
        <main>{renderPage()}</main>
        {!page.startsWith("success") && page !== "auth" && <Footer setPage={setPage} />}
      </div>
    </ThemeContext.Provider>
  );
}
