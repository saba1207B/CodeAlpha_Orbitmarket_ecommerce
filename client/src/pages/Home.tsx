import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { categories, formatPrice, products, type Product } from "@/lib/store";
import { useStore } from "@/contexts/StoreContext";

export function StoreHeader({ onCart, onAuth }: { onCart: () => void; onAuth: () => void }) {
  const { cartCount, account, wishlist } = useStore();
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setMenuOpen(false);
    if (location !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="announcement">
        <span>Complimentary shipping on orders over ₹1,999</span>
        <span className="announcement-dot">✦</span>
        <span>Small batches, considered objects</span>
      </div>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <button className="mobile-menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
          </button>
          <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">O</span>
            <span>
              ORBIT <em>MARKET</em>
            </span>
          </Link>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("shop");
              }}
            >
              Shop
            </a>
            <a
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("collections");
              }}
            >
              Collections
            </a>
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("story");
              }}
            >
              Our story
            </a>
          </nav>
          <div className="header-actions">
            <button
              aria-label="Search"
              className="icon-button desktop-only"
              onClick={() => handleNavClick("shop")}
            >
              <Search size={19} strokeWidth={1.6} />
            </button>
            <button aria-label={account ? "Open account" : "Sign in"} className="icon-button desktop-only" onClick={onAuth}>
              <UserRound size={19} strokeWidth={1.6} />
            </button>
            <button aria-label="Open shopping bag" className="bag-button" onClick={onCart}>
              <ShoppingBag size={19} strokeWidth={1.6} />
              <span>
                Bag <b>{cartCount}</b>
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark">O</span>
            <span>
              ORBIT <em>MARKET</em>
            </span>
          </Link>
          <p>
            Good things for daily life.
            <br />
            Designed to last a little longer.
          </p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <a href="#shop">Shop all</a>
          <a href="#collections">Collections</a>
          <a href="#story">Our story</a>
        </div>
        <div>
          <p className="footer-label">Care</p>
          <a href="#story">Shipping & returns</a>
          <a href="#story">Materials</a>
          <a href="#story">Contact</a>
        </div>
        <div className="newsletter">
          <p className="footer-label">The good list</p>
          <p>Occasional notes on new pieces, studio visits, and things worth keeping.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value = "You’re on the list";
            }}
          >
            <input aria-label="Email address" name="email" placeholder="Email address" type="email" required />
            <button aria-label="Subscribe" type="submit">
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Orbit Market</span>
        <span>Built for slower scrolling</span>
        <span>Considered objects for daily life</span>
      </div>
    </footer>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className={`product-card reveal reveal-${(index % 4) + 1}`}>
      <div className={`product-image-wrap tone-${product.color}`}>
        <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wishlist-btn ${wishlisted ? "active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={15} fill={wishlisted ? "currentColor" : "none"} strokeWidth={1.8} />
        </button>
        <button className={`quick-add ${added ? "added" : ""}`} onClick={handleAdd}>
          {added ? (
            <>
              <Check size={15} /> Added
            </>
          ) : (
            <>
              <Plus size={15} /> Add
            </>
          )}
        </button>
      </div>
      <div className="product-meta">
        <div>
          <p className="product-category">{product.category}</p>
          <Link href={`/product/${product.id}`} className="product-name">
            {product.name}
          </Link>
        </div>
        <div className="price-stack">
          <span className="price">{formatPrice(product.price)}</span>
          {product.compareAt && <span className="compare-price">{formatPrice(product.compareAt)}</span>}
        </div>
      </div>
    </article>
  );
}

function CategoryPills({ selected, onSelect }: { selected: string; onSelect: (category: string) => void }) {
  return (
    <div className="category-pills" role="tablist" aria-label="Product categories">
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? "active" : ""}
          onClick={() => onSelect(category)}
          role="tab"
          aria-selected={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={`scroll-top-btn ${visible ? "visible" : ""}`} onClick={scrollToTop} aria-label="Scroll back to top">
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    let list = category === "All pieces" ? products : products.filter((product) => product.category === category);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) =>
      sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : products.indexOf(a) - products.indexOf(b)
    );
  }, [category, sort, search]);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> New season / 01
          </p>
          <h1>
            Make room
            <br />
            <i>for good.</i>
          </h1>
          <p className="hero-description">
            Everyday objects with a point of view. Thoughtfully sourced, easy to live with, and made to move at the pace of your life.
          </p>
          <a
            href="#shop"
            className="button button-dark"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop the edit <ArrowRight size={17} />
          </a>
          <div className="hero-note">
            <span className="note-mark">✳</span>
            <span>
              Curated in small batches
              <br />
              from makers we admire.
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-sun" />
          <div className="hero-card hero-card-main">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=88" alt="Textured chair in a sunlit room" />
          </div>
          <div className="hero-card hero-card-small">
            <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=500&q=88" alt="Warm minimal interior detail" />
          </div>
          <div className="hero-caption">
            <span>01 / 04</span>
            <span>Objects for living well</span>
          </div>
        </div>
      </section>

      <section className="ticker">
        <div className="ticker-track">
          <span>Made for the everyday</span>
          <span>✦</span>
          <span>Considered materials</span>
          <span>✦</span>
          <span>Small-batch goods</span>
          <span>✦</span>
          <span>Made for the everyday</span>
          <span>✦</span>
          <span>Considered materials</span>
          <span>✦</span>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> The edit
            </p>
            <h2>
              Pieces with <i>presence.</i>
            </h2>
          </div>
          <p className="section-intro">
            A considered collection of useful, beautiful things. Keep the ones that make a room—or a routine—feel more like yours.
          </p>
        </div>

        <div className="shop-toolbar">
          <CategoryPills selected={category} onSelect={setCategory} />
          <div className="shop-toolbar-right">
            <div className="search-bar">
              <Search size={13} className="search-icon" />
              <input
                type="text"
                placeholder="Search pieces..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search catalog"
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={12} />
                </button>
              )}
            </div>
            <label className="sort-select">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
        </div>

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard product={product} index={index} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="empty-cart" style={{ padding: "60px 0" }}>
            <p>No pieces found matching "{search}".</p>
            <button
              className="button button-outline"
              onClick={() => {
                setCategory("All pieces");
                setSearch("");
              }}
            >
              Reset filters <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>

      <section className="collection-section" id="collections">
        <div className="collection-image">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=88" alt="A calm, layered living space" />
        </div>
        <div className="collection-copy">
          <p className="eyebrow eyebrow-light">
            <span className="eyebrow-line" /> Collection no. 01
          </p>
          <h2>
            Soft shapes,
            <br />
            <i>strong feeling.</i>
          </h2>
          <p>
            For spaces that hold you. Our first collection is a study in warm neutrals, tactile textures, and the little rituals that turn a house into home.
          </p>
          <a
            href="#shop"
            className="button button-light"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore the collection <ArrowRight size={17} />
          </a>
          <div className="collection-stamp">
            <span>OM</span>
            <small>
              EST.
              <br />
              2026
            </small>
          </div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-heading">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Why Orbit
          </p>
          <h2>
            Less, but <i>better.</i>
          </h2>
        </div>
        <div className="story-grid">
          <div className="story-stat">
            <span className="story-number">01</span>
            <h3>
              Good design
              <br />
              should feel easy.
            </h3>
            <p>We look for the quiet details: a weight that feels right, a texture you want to touch, an object that earns its place.</p>
          </div>
          <div className="story-stat featured-stat">
            <span className="story-number">02</span>
            <h3>
              Made to be
              <br />
              lived with.
            </h3>
            <p>Nothing precious. Just honest materials, thoughtful function, and a point of view that gets better with time.</p>
          </div>
          <div className="story-stat">
            <span className="story-number">03</span>
            <h3>
              Small is
              <br />a superpower.
            </h3>
            <p>We work with independent makers and small studios so every piece has a story—and a real person behind it.</p>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-mark">“</div>
        <blockquote>The things we keep around us should give something back.</blockquote>
        <p>— Orbit Market, on living with intention</p>
      </section>

      <ScrollToTop />
    </main>
  );
}

export function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const [, navigate] = useLocation();
  const product = products.find((item) => item.id === params?.id);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<"detail" | "main">("detail");
  const [openAccordion, setOpenAccordion] = useState<string | null>("materials");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImage("detail");
  }, [params?.id]);

  if (!product)
    return (
      <div className="not-found">
        <p className="eyebrow">
          <span className="eyebrow-line" /> 404
        </p>
        <h1>
          That piece has
          <br />
          <i>moved on.</i>
        </h1>
        <Link href="/" className="button button-dark">
          Back to shop <ArrowRight size={17} />
        </Link>
      </div>
    );

  const wishlisted = isWishlisted(product.id);
  const add = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const currentDisplayImage = activeImage === "detail" ? product.detailImage : product.image;

  return (
    <main className="detail-page">
      <div className="detail-breadcrumb">
        <button onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to shop
        </button>
        <span>
          {product.category} / {product.name}
        </span>
      </div>

      <div className="detail-layout">
        <div>
          <div className={`detail-image tone-${product.color}`}>
            <img src={currentDisplayImage} alt={product.name} />
            <span className="detail-image-label">Orbit / 01</span>
          </div>
          <div className="gallery-thumbnails">
            <button
              className={`gallery-thumb ${activeImage === "detail" ? "active" : ""}`}
              onClick={() => setActiveImage("detail")}
              aria-label="View detail image"
            >
              <img src={product.detailImage} alt={`${product.name} detail view`} />
            </button>
            <button
              className={`gallery-thumb ${activeImage === "main" ? "active" : ""}`}
              onClick={() => setActiveImage("main")}
              aria-label="View studio image"
            >
              <img src={product.image} alt={`${product.name} studio view`} />
            </button>
          </div>
        </div>

        <div className="detail-copy">
          <div className="stock-pill">
            <span className="stock-pill-dot" />
            <span>Handcrafted batch · Limited run</span>
          </div>
          <p className="eyebrow">
            <span className="eyebrow-line" /> {product.badge || "Considered object"}
          </p>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span className="stars">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </span>
            <span>4.9 / 5 · 18 reviews</span>
          </div>
          <div className="detail-price">
            <span>{formatPrice(product.price)}</span>
            {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="spec-list">
            {product.specs.map((spec) => (
              <div key={spec}>
                <Check size={15} />
                {spec}
              </div>
            ))}
          </div>
          <div className="purchase-row">
            <div className="quantity-control">
              <button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={14} />
              </button>
            </div>
            <button className={`button button-dark add-detail-button ${added ? "success" : ""}`} onClick={add}>
              {added ? (
                <>
                  <Check size={17} /> Added to bag
                </>
              ) : (
                <>
                  Add to bag <ArrowRight size={17} />
                </>
              )}
            </button>
            <button
              className="button button-outline"
              style={{ minWidth: 48, padding: "0 14px" }}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={16} fill={wishlisted ? "currentColor" : "none"} color={wishlisted ? "var(--rust)" : "currentColor"} />
            </button>
          </div>
          <div className="detail-trust">
            <span>Free shipping over ₹1,999</span>
            <span>30-day returns</span>
            <span>Ships in 1–2 days</span>
          </div>

          <div className="craft-accordions">
            <div className={`craft-accordion-item ${openAccordion === "materials" ? "open" : ""}`}>
              <button
                className="craft-accordion-trigger"
                onClick={() => setOpenAccordion(openAccordion === "materials" ? null : "materials")}
              >
                <span>Materials & Origin</span>
                <ChevronDown size={14} />
              </button>
              <div className="craft-accordion-content">
                Individually finished by regional craftspeople using sustainable, durable materials that patina with age. Zero single-use plastics in transport or packaging.
              </div>
            </div>
            <div className={`craft-accordion-item ${openAccordion === "care" ? "open" : ""}`}>
              <button
                className="craft-accordion-trigger"
                onClick={() => setOpenAccordion(openAccordion === "care" ? null : "care")}
              >
                <span>Care & Preservation</span>
                <ChevronDown size={14} />
              </button>
              <div className="craft-accordion-content">
                Wipe gently with a dry or slightly damp natural linen cloth. Avoid harsh household chemicals or abrasive scouring pads to safeguard the organic finish.
              </div>
            </div>
            <div className={`craft-accordion-item ${openAccordion === "shipping" ? "open" : ""}`}>
              <button
                className="craft-accordion-trigger"
                onClick={() => setOpenAccordion(openAccordion === "shipping" ? null : "shipping")}
              >
                <span>Shipping & Thoughtful Returns</span>
                <ChevronDown size={14} />
              </button>
              <div className="craft-accordion-content">
                Dispatched carbon-neutral in recycled pulp mailers. Complimentary returns accepted within 30 days in original presentation box.
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="related-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> You may also like
            </p>
            <h2>
              More to <i>explore.</i>
            </h2>
          </div>
        </div>
        <div className="product-grid related-grid">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
        </div>
      </section>

      <ScrollToTop />
    </main>
  );
}

export function CartDrawer({ open, onClose, onCheckout }: { open: boolean; onClose: () => void; onCheckout: () => void }) {
  const { cartProducts, cartTotal, updateQuantity, removeFromCart } = useStore();
  const freeShippingThreshold = 1999;
  const remaining = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  return (
    <div className={`drawer-backdrop ${open ? "visible" : ""}`} onClick={onClose}>
      <aside className={`cart-drawer ${open ? "open" : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> Your bag
            </p>
            <h2>{cartProducts.length ? "Good choices." : "It’s quiet in here."}</h2>
          </div>
          <button className="close-button" aria-label="Close shopping bag" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {cartProducts.length ? (
          <>
            <div style={{ paddingTop: 18 }}>
              <div className={`shipping-meter ${remaining === 0 ? "unlocked" : ""}`}>
                <div className="shipping-meter-text">
                  <span>
                    {remaining > 0 ? (
                      <>
                        Add <strong>{formatPrice(remaining)}</strong> for complimentary shipping
                      </>
                    ) : (
                      <strong>✦ Complimentary shipping unlocked!</strong>
                    )}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="shipping-meter-bar">
                  <div className="shipping-meter-fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="cart-items">
              {cartProducts.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-copy">
                    <Link href={`/product/${product.id}`} onClick={onClose}>
                      {product.name}
                    </Link>
                    <span>{formatPrice(product.price)}</span>
                    <div className="cart-item-controls">
                      <div className="quantity-control small">
                        <button aria-label="Decrease quantity" onClick={() => updateQuantity(product.id, quantity - 1)}>
                          <Minus size={12} />
                        </button>
                        <span>{quantity}</span>
                        <button aria-label="Increase quantity" onClick={() => updateQuantity(product.id, quantity + 1)}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <button className="remove-button" onClick={() => removeFromCart(product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-summary">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button className="button button-dark checkout-button" onClick={onCheckout}>
                Continue to checkout <ArrowRight size={17} />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-icon">
              <ShoppingBag size={25} />
            </div>
            <p>Add a few pieces that make your everyday feel more like yours.</p>
            <button className="button button-outline" onClick={onClose}>
              Keep browsing <ArrowRight size={16} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export function AuthDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { account, login, register, logout, orders } = useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result =
      mode === "login"
        ? login(String(form.get("email")), String(form.get("password")))
        : register(String(form.get("name")), String(form.get("email")), String(form.get("password")));
    setMessage(result.message);
    if (result.ok) window.setTimeout(onClose, 700);
  };

  return (
    <div className={`modal-backdrop ${open ? "visible" : ""}`} onClick={onClose}>
      <div className="account-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-button modal-close" aria-label="Close account dialog" onClick={onClose}>
          <X size={20} />
        </button>
        {account ? (
          <div className="account-view">
            <div className="account-avatar">{account.name.charAt(0).toUpperCase()}</div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> Your Orbit
            </p>
            <h2>Hi, {account.name.split(" ")[0]}.</h2>
            <p className="account-email">{account.email}</p>
            <div className="account-order-summary">
              <span>{orders.length ? `${orders.length} order${orders.length > 1 ? "s" : ""}` : "No orders yet"}</span>
              <span>{orders.length ? "Thank you for shopping small." : "Your next good thing is out there."}</span>
            </div>
            <button
              className="button button-outline"
              onClick={() => {
                logout();
                setMessage("You’re signed out.");
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <div className="account-tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
              >
                Sign in
              </button>
              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => {
                  setMode("register");
                  setMessage("");
                }}
              >
                Create account
              </button>
            </div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> {mode === "login" ? "Welcome back" : "Join Orbit"}
            </p>
            <h2>{mode === "login" ? "Keep good things close." : "A little more considered."}</h2>
            <p className="modal-intro">
              {mode === "login"
                ? "Sign in to see your orders and save your details for next time."
                : "Create a local account to keep track of orders as you browse."}
            </p>
            <form className="account-form" onSubmit={submit}>
              {mode === "register" && (
                <label>
                  Full name
                  <input name="name" type="text" placeholder="Alex Morgan" required />
                </label>
              )}
              <label>
                Email address
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Password
                <input name="password" type="password" placeholder="6+ characters" minLength={6} required />
              </label>
              <button className="button button-dark" type="submit">
                {mode === "login" ? "Sign in" : "Create account"} <ArrowRight size={17} />
              </button>
            </form>
            {message && (
              <p
                className={`form-message ${
                  message.includes("match") || message.includes("valid") || message.includes("already") ? "error" : ""
                }`}
              >
                {message}
              </p>
            )}
            <p className="demo-note">Stored securely in your local browser session.</p>
          </>
        )}
      </div>
    </div>
  );
}

export function CheckoutDialog({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (id: string) => void;
}) {
  const { account, cartTotal, placeOrder } = useStore();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order = placeOrder({
      name: String(form.get("name")),
      email: String(form.get("email")),
      address: String(form.get("address")),
    });
    onSuccess(order.id);
  };

  return (
    <div className={`modal-backdrop ${open ? "visible" : ""}`} onClick={onClose}>
      <div className="checkout-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-button modal-close" aria-label="Close checkout" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="checkout-header">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Checkout
          </p>
          <h2>
            Almost <i>home.</i>
          </h2>
          <div className="checkout-total">
            <span>Order total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </div>
        <form className="checkout-form" onSubmit={submit}>
          <label>
            Full name
            <input name="name" type="text" defaultValue={account?.name || ""} placeholder="Alex Morgan" required />
          </label>
          <label>
            Email address
            <input name="email" type="email" defaultValue={account?.email || ""} placeholder="you@example.com" required />
          </label>
          <label>
            Shipping address
            <textarea name="address" rows={3} placeholder="Street, city, postal code" required />
          </label>
          <div className="fake-payment">
            <div>
              <span className="payment-dot" />
              <span>Complimentary contactless delivery</span>
            </div>
            <span>Standard Express</span>
          </div>
          <button className="button button-dark" type="submit">
            Place order <ArrowRight size={17} />
          </button>
          <p className="checkout-note">Order confirmation and summary will be saved to your local session.</p>
        </form>
      </div>
    </div>
  );
}

export function OrderSuccess({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  return (
    <div className="modal-backdrop visible">
      <div className="success-modal">
        <div className="success-icon">
          <Check size={27} />
        </div>
        <p className="eyebrow">
          <span className="eyebrow-line" /> Order confirmed
        </p>
        <h2>
          Good things
          <br />
          <i>are on the way.</i>
        </h2>
        <p>
          We saved order <strong>{orderId}</strong> to your account history. Thank you for supporting considered, small-batch goods.
        </p>
        <button className="button button-dark" onClick={onClose}>
          Continue browsing <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
