import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineStorefront,
  MdOutlineSearch,
  MdOutlineShoppingCart,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineTune,
  MdOutlineGridView,
  MdOutlineViewList,
  MdOutlineStar,
  MdOutlineLocalShipping,
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { RiBox3Line } from "react-icons/ri";
 import { useSelector } from "react-redux";
 import useProduct from "../../hooks/useProduct";
 import { useEffect } from "react";

// ── Mock Products ──────────────────────────────────────────
// const PRODUCTS = [
//   { id: 1, name: "Wireless Noise Cancelling Headphones", price: 129, originalPrice: 179, category: "Electronics", rating: 4.8, reviews: 2341, seller: "TechZone", badge: "Best Seller", stock: 24, description: "Premium sound with active noise cancellation. 30-hour battery life." },
//   { id: 2, name: "Mechanical Keyboard RGB Backlit", price: 89, originalPrice: 120, category: "Electronics", rating: 4.6, reviews: 1872, seller: "KeyMaster", badge: "Hot Deal", stock: 11, description: "Tactile typing experience with customizable RGB lighting." },
//   { id: 3, name: "USB-C Hub 7-in-1 Multiport", price: 45, originalPrice: 45, category: "Electronics", rating: 4.5, reviews: 983, seller: "HubWorld", badge: null, stock: 0, description: "Connect everything. HDMI 4K, 3x USB-A, SD card, PD charging." },
//   { id: 4, name: "Ergonomic Laptop Stand Aluminum", price: 35, originalPrice: 50, category: "Accessories", rating: 4.7, reviews: 754, seller: "DeskPro", badge: "Sale", stock: 56, description: "Adjustable aluminum stand for better posture and airflow." },
//   { id: 5, name: "LED Desk Lamp with Wireless Charging", price: 58, originalPrice: 75, category: "Home", rating: 4.4, reviews: 421, seller: "LightUp", badge: null, stock: 3, description: "10W wireless charging pad built right into the base." },
//   { id: 6, name: "Wireless Ergonomic Mouse", price: 55, originalPrice: 70, category: "Electronics", rating: 4.6, reviews: 1103, seller: "TechZone", badge: null, stock: 30, description: "Vertical design reduces wrist strain. 3-month battery life." },
//   { id: 7, name: "Portable Bluetooth Speaker IPX7", price: 79, originalPrice: 99, category: "Electronics", rating: 4.7, reviews: 2109, seller: "SoundBox", badge: "Top Rated", stock: 18, description: "360° surround sound, waterproof, 20 hours playtime." },
//   { id: 8, name: "Smart Watch Fitness Tracker", price: 149, originalPrice: 199, category: "Wearables", rating: 4.5, reviews: 3204, seller: "FitGear", badge: "Best Seller", stock: 7, description: "Health monitoring, GPS, 7-day battery, water resistant." },
//   { id: 9, name: "4K Webcam with Ring Light", price: 95, originalPrice: 130, category: "Electronics", rating: 4.3, reviews: 678, seller: "StreamPro", badge: null, stock: 14, description: "Ultra HD video for meetings, streaming and content creation." },
//   { id: 10, name: "Cable Management Box", price: 22, originalPrice: 22, category: "Accessories", rating: 4.2, reviews: 312, seller: "DeskPro", badge: null, stock: 99, description: "Hide ugly cables and power strips in a clean wooden box." },
//   { id: 11, name: "Noise Cancelling Earbuds Pro", price: 119, originalPrice: 159, category: "Electronics", rating: 4.9, reviews: 4512, seller: "TechZone", badge: "Top Rated", stock: 22, description: "6-hour playtime per charge, 24hr total with case. IPX4." },
//   { id: 12, name: "Monitor Light Bar USB-C", price: 42, originalPrice: 55, category: "Accessories", rating: 4.6, reviews: 887, seller: "LightUp", badge: "Sale", stock: 45, description: "Reduces eye strain, no screen glare. Touch dimmer control." },
// ];



const CATEGORIES = ["All", "Electronics", "Accessories", "Home", "Wearables"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Reviews"];

// ── Star Rating ────────────────────────────────────────────

// ── Product Card ───────────────────────────────────────────

// ── Star Rating ────────────────────────────────────────────


// ── Product Card ───────────────────────────────────────────


const ProductCard = ({ product, onNavigate, wishlist, toggleWishlist, gridView }) => {
  // ── Normalize fields from real API ──
  const id          = product?._id || product?.id;
  const name        = product?.title || product?.name || "Untitled Product";
  const description = product?.description || "";
  const amount      = product?.price?.amount ?? product?.price ?? 0;
  const currency    = product?.price?.currency || "USD";
  const image       = product?.images?.[0]?.url || null;
  const imageAlt    = product?.images?.[0]?.alt || name;
  const seller      = product?.seller || "";
  const category    = product?.category || "";
  const rating      = product?.rating ?? 0;
  const reviews     = product?.reviews ?? 0;
  const stock       = product?.stock ?? 1;   // default to in-stock if your API doesn't send stock yet
  const badge       = product?.badge || null;
  const originalPrice = product?.originalPrice || null;

  const discount = originalPrice && originalPrice > amount
    ? Math.round(((originalPrice - amount) / originalPrice) * 100)
    : null;

  // ── List View ──────────────────────────────────────────
  if (!gridView) {
    return (
      <div
        onClick={() => onNavigate(id)}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-4 p-4 cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
      >
        {/* Image */}
        <div className="w-28 h-28 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 relative overflow-hidden">
          {image ? (
            <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <RiBox3Line size={32} className="text-gray-300" />
          )}
          {badge && (
            <span className="absolute top-1.5 left-1.5 text-[10px] font-semibold bg-gray-900 text-white px-1.5 py-0.5 rounded-md">
              {badge}
            </span>
          )}
          {stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-500">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {(category || seller) && (
            <p className="text-xs text-gray-400 mb-0.5">
              {category}{category && seller ? " · " : ""}{seller}
            </p>
          )}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-gray-700 transition line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{description}</p>
          )}
          {rating > 0 && (
            <div className="flex items-center gap-2 mt-1.5">
              <Stars rating={rating} />
              <span className="text-xs text-gray-400">{rating} ({reviews.toLocaleString()})</span>
            </div>
          )}
          <div className="flex items-center gap-2 mt-1">
            <MdOutlineLocalShipping size={13} className="text-green-600" />
            <span className="text-xs text-green-600 font-medium">Free delivery</span>
          </div>
        </div>

        {/* Price + Actions */}
        <div className="flex flex-col items-end justify-between shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(id); }}
            className="text-gray-300 hover:text-red-500 transition"
          >
            {wishlist.includes(id)
              ? <MdOutlineFavorite size={18} className="text-red-500" />
              : <MdOutlineFavoriteBorder size={18} />}
          </button>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {currency} {amount}
            </p>
            {discount && <p className="text-xs text-gray-400 line-through">{currency} {originalPrice}</p>}
            {discount && <p className="text-xs text-green-600 font-medium">{discount}% off</p>}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            disabled={stock === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 transition active:scale-95"
          >
            <MdOutlineShoppingCart size={14} />
            {stock === 0 ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  }

  // ── Grid View ──────────────────────────────────────────
  return (
    <div
      onClick={() => onNavigate(id)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-200 group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <RiBox3Line size={48} className="text-gray-200" />
        )}

        {badge && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold bg-gray-900 text-white px-2 py-0.5 rounded-md">
            {badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
        {stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-500">Out of Stock</span>
          </div>
        )}
        {stock > 0 && stock <= 5 && (
          <span className="absolute bottom-3 left-3 text-[10px] font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-md">
            Only {stock} left!
          </span>
        )}

        {/* Wishlist hover button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(id); }}
          className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 hover:scale-110"
          style={badge && discount ? { top: "2.25rem" } : {}}
        >
          {wishlist.includes(id)
            ? <MdOutlineFavorite size={15} className="text-red-500" />
            : <MdOutlineFavoriteBorder size={15} className="text-gray-500" />}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        {seller && <p className="text-[11px] text-gray-400 mb-0.5 font-medium">{seller}</p>}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-700 transition min-h-[2.5rem]">
          {name}
        </h3>
        {rating > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <Stars rating={rating} />
            <span className="text-[11px] text-gray-400">{rating} ({reviews.toLocaleString()})</span>
          </div>
        )}
        <div className="flex items-center gap-1 mt-1.5">
          <MdOutlineLocalShipping size={12} className="text-green-600" />
          <span className="text-[11px] text-green-600 font-medium">Free delivery</span>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-gray-900 leading-none">
              {currency} {amount}
            </p>
            {discount && (
              <p className="text-xs text-gray-400 line-through mt-0.5">{currency} {originalPrice}</p>
            )}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            disabled={stock === 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 transition active:scale-95"
          >
            <MdOutlineShoppingCart size={13} />
            {stock === 0 ? "Sold Out" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
// Compatible with real API shape:
// { _id, title, description, price: { amount, currency }, images: [{ url, alt }], seller, createdAt }



// ── Main Page ──────────────────────────────────────────────
export default function ProductListingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [gridView, setGridView] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [cartCount, setCartCount] = useState(0);

  const {getAllProductHandler  , getProductHandler} = useProduct()

  useEffect(() => {
    getAllProductHandler()
  }, []);
 

  const PRODUCTS = useSelector(state => state.product.allProducts)
  const loading = useSelector(state => state.product.loading)
  
console.log(PRODUCTS)


  const toggleWishlist = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  // Filter + Sort
 let filtered = PRODUCTS.filter((p) => {
  console.log(p)
  const cleanTitle = p?.title
    ?.replaceAll('"', '')
    ?.toLowerCase()
    console.log(cleanTitle)

  // const matchesSearch =
  //   cleanTitle?.includes(search.toLowerCase())

  // const matchesPrice =
  //   Number(p?.price?.amount) >= priceRange[0] &&
  //   Number(p?.price?.amount) <= priceRange[1]

  // return matchesSearch && matchesPrice
   return cleanTitle
})
console.log(filtered)

  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "Top Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === "Most Reviews") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  return (

    loading ? <div>loading</div> :

    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdOutlineStorefront size={16} className="text-white" />
            </div>
            <span className="text-[15px] font-semibold text-gray-900 tracking-tight hidden sm:block">Vendora</span>
          </div>

          {/* Search */}
          <div className="flex-1 relative max-w-xl">
            <MdOutlineSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, brands, sellers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 focus:bg-white transition placeholder-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                <MdOutlineClose size={16} />
              </button>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleWishlist(-1)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <MdOutlineFavoriteBorder size={18} className="text-gray-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              onClick={() => setCartCount(c => c + 1)}
            >
              <MdOutlineShoppingCart size={18} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
                ${activeCategory === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {activeCategory === "All" ? "All Products" : activeCategory}
            </h2>
            <p className="text-sm text-gray-400">{filtered.length} results {search && `for "${search}"`}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition ${filterOpen ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
            >
              <MdOutlineTune size={16} /> Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-900 transition text-gray-700 cursor-pointer font-medium"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <MdOutlineKeyboardArrowDown size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Grid/List toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setGridView(true)}
                className={`px-2.5 py-2 transition ${gridView ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-700"}`}
              >
                <MdOutlineGridView size={17} />
              </button>
              <button
                onClick={() => setGridView(false)}
                className={`px-2.5 py-2 transition ${!gridView ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-700"}`}
              >
                <MdOutlineViewList size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Filter Products</h3>
              <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-gray-700">
                <MdOutlineClose size={18} />
              </button>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                Price Range: <span className="text-gray-900 normal-case font-bold">${priceRange[0]} – ${priceRange[1]}</span>
              </p>
              <input
                type="range"
                min={0}
                max={200}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span><span>$200</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid / List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RiBox3Line size={48} className="text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search term.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setPriceRange([0, 200]); }}
              className="mt-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={gridView
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            : "flex flex-col gap-3"
          }>
                  {filtered.map((product) => (
          <ProductCard
            key={product._id}   // 👈 changed from product.id
            product={product}
            onNavigate={
              (id) => {
                getProductHandler(id)
                navigate(`/product/${id}`)
               }
            
            }
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            gridView={gridView}
          />
        ))}
          </div>
        )}
      </div>
    </div>
  );
}