import { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdOutlineStorefront,
  MdOutlineShoppingCart,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineStar,
  MdOutlineLocalShipping,
  MdOutlineVerified,
  MdOutlineArrowBack,
  MdOutlineShare,
  MdOutlineShield,
  MdOutlineLoop,
  MdOutlineCheckCircle,
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RiBox3Line } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";

// ── Mock Reviews (replace with API later) ─────────────────
const REVIEWS = [
  { name: "Arjun M.", rating: 5, date: "Apr 28, 2026", comment: "Absolutely love it! Exceeded my expectations. Build quality is top notch and it arrived super fast." },
  { name: "Sofia L.", rating: 4, date: "Apr 15, 2026", comment: "Great product overall. Setup was easy and works exactly as described. Would recommend to friends." },
  { name: "James O.", rating: 5, date: "Mar 30, 2026", comment: "Best purchase I've made this year. The quality is incredible for the price. Very happy!" },
];

// ── Stars ──────────────────────────────────────────────────
const Stars = ({ rating = 0, size = 15 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <MdOutlineStar
        key={s}
        size={size}
        className={s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}
      />
    ))}
  </div>
);

// ── Loading Skeleton ───────────────────────────────────────
const Skeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-96 bg-gray-200 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-10 bg-gray-200 rounded w-1/4" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-11 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────
export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────
  const [related, setRelated]       = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlist, setWishlist]     = useState(false);
  const [qty, setQty]               = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab]   = useState("description");


  const {getProductHandler} = useProduct()
  const loading = useSelector(state => state.product.loading)
  const product = useSelector(state => state.product.product)
  console.log(loading)
  // ── Fetch product by ID ────────────────────────────────
  useEffect(() => {

   getProductHandler(id)
     
    
  }, [id]);

  // ── Normalize API fields ───────────────────────────────
  const pid         = product?._id || product?.id;
  const name        = product?.title || product?.name || "Untitled Product";
  const description = product?.description || "";
  const amount      = product?.price?.amount ?? product?.price ?? 0;
  const currency    = product?.price?.currency || "USD";
  const images      = product?.images || [];
  const seller      = product?.seller || "";
  const category    = product?.category || "";
  const rating      = product?.rating ?? 0;
  const reviews     = product?.reviews ?? 0;
  const stock       = product?.stock ?? 1; // default in-stock if API doesn't send stock
  const badge       = product?.badge || null;
  const features    = product?.features || [];
  const originalPrice = product?.originalPrice || null;

  const discount = originalPrice && originalPrice > amount
    ? Math.round(((originalPrice - amount) / originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // ── Loading / Error states ─────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 shadow-sm px-4 py-3.5 flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
            <MdOutlineStorefront size={15} className="text-white" />
          </div>
          <span className="text-[14px] font-semibold text-gray-900">Vendora</span>
        </header>
        <Skeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RiBox3Line size={48} className="text-gray-200 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">Product not found</h2>
          <p className="text-sm text-gray-400 mt-1 mb-4">This product may have been removed.</p>
          <button
            onClick={() => navigate("/shop")}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition text-gray-600"
          >
            <MdOutlineArrowBack size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdOutlineStorefront size={15} className="text-white" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900 tracking-tight hidden sm:block">Vendora</span>
          </div>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
            <button onClick={() => navigate("/shop")} className="hover:text-gray-700 transition">Shop</button>
            <MdOutlineKeyboardArrowRight size={14} />
            {category && <><span className="text-gray-500">{category}</span><MdOutlineKeyboardArrowRight size={14} /></>}
            <span className="text-gray-700 font-medium truncate max-w-[160px]">{name}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition text-gray-600">
              <MdOutlineShare size={17} />
            </button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              {wishlist
                ? <MdOutlineFavorite size={17} className="text-red-500" />
                : <MdOutlineFavoriteBorder size={17} className="text-gray-600" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Product Main Section ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* Image Panel */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-80 sm:h-96 flex items-center justify-center relative overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[activeImage]?.url}
                  alt={images[activeImage]?.alt || name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <RiBox3Line size={96} className="text-gray-200" />
              )}
              {badge && (
                <span className="absolute top-4 left-4 text-xs font-semibold bg-gray-900 text-white px-2.5 py-1 rounded-lg">
                  {badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-red-500 text-white px-2.5 py-1 rounded-lg">
                  -{discount}% OFF
                </span>
              )}
              {stock === 0 && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-400">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Thumbnail strip — real images from API */}
            <div className="flex gap-2">
              {images.length > 0 ? (
                images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl border-2 bg-white overflow-hidden transition ${
                      activeImage === i ? "border-gray-900" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img src={img.url} alt={img.alt || name} className="w-full h-full object-cover" />
                  </button>
                ))
              ) : (
                // fallback placeholder thumbs
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-16 h-16 rounded-xl border-2 bg-white flex items-center justify-center transition ${i === 1 ? "border-gray-900" : "border-gray-200"}`}>
                    <RiBox3Line size={24} className="text-gray-300" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-5">

            {/* Title & Seller */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {category && (
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{category}</span>
                )}
                {category && seller && <span className="text-gray-200">·</span>}
                {seller && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MdOutlineVerified size={13} className="text-blue-500" />
                    {seller}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{name}</h1>
            </div>

            {/* Rating — only show if API sends it */}
            {rating > 0 && (
              <div className="flex items-center gap-3">
                <Stars rating={rating} />
                <span className="text-sm font-semibold text-gray-900">{rating}</span>
                <span className="text-sm text-gray-400">({Number(reviews).toLocaleString()} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {currency} {amount}
              </span>
              {discount && (
                <>
                  <span className="text-lg text-gray-400 line-through mb-0.5">
                    {currency} {originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-green-600 mb-0.5">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Delivery info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-100">
              <div className="flex items-center gap-3">
                <BsTruck size={16} className="text-green-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free delivery</p>
                  <p className="text-xs text-gray-400">Estimated delivery: 3–5 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineLoop size={16} className="text-gray-500 shrink-0" />
                <p className="text-sm text-gray-700">30-day free returns</p>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineShield size={16} className="text-gray-500 shrink-0" />
                <p className="text-sm text-gray-700">1-year warranty included</p>
              </div>
            </div>

            {/* Stock warnings */}
            {stock > 0 && stock <= 10 && (
              <p className="text-sm font-medium text-orange-600">
                ⚡ Only {stock} left in stock — order soon!
              </p>
            )}
            {stock === 0 && (
              <p className="text-sm font-medium text-red-500">❌ Currently out of stock</p>
            )}

            {/* Qty + Cart */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                >
                  <MdOutlineRemove size={16} />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty(q => stock > 0 ? Math.min(stock, q + 1) : q)}
                  disabled={stock === 0}
                  className="w-9 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition disabled:opacity-30"
                >
                  <MdOutlineAdd size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
                  ${addedToCart
                    ? "bg-green-600 text-white"
                    : stock === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-gray-700 text-white"}`}
              >
                {addedToCart
                  ? <><MdOutlineCheckCircle size={18} /> Added to Cart!</>
                  : <><MdOutlineShoppingCart size={18} /> Add to Cart</>}
              </button>

              <button
                onClick={() => setWishlist(!wishlist)}
                className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                {wishlist
                  ? <MdOutlineFavorite size={20} className="text-red-500" />
                  : <MdOutlineFavoriteBorder size={20} className="text-gray-500" />}
              </button>
            </div>

            {/* Buy Now */}
            {stock > 0 && (
              <button className="w-full h-11 border-2 border-gray-900 text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200 active:scale-95">
                Buy Now
              </button>
            )}
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="flex border-b border-gray-100">
            {["description", "features", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 text-sm font-medium capitalize transition border-b-2 ${
                  activeTab === tab
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab}{tab === "reviews" && ` (${REVIEWS.length})`}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {description || "No description available for this product."}
              </p>
            )}
            {activeTab === "features" && (
              features.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <MdOutlineCheckCircle size={16} className="text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No features listed for this product.</p>
              )
            )}
            {activeTab === "reviews" && (
              <div className="space-y-5">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{r.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <Stars rating={r.rating} size={13} />
                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ─────────────────────────── */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => {
                const relId     = p._id || p.id;
                const relName   = p.title || p.name || "Product";
                const relAmount = p.price?.amount ?? p.price ?? 0;
                const relCurrency = p.price?.currency || "USD";
                const relImage  = p.images?.[0]?.url || null;
                const relRating = p.rating ?? 0;
                const relDisc   = p.originalPrice && p.originalPrice > relAmount
                  ? Math.round(((p.originalPrice - relAmount) / p.originalPrice) * 100)
                  : null;

                return (
                  <div
                    key={relId}
                    onClick={() => navigate(`/product/${relId}`)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden group"
                  >
                    <div className="h-36 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                      {relImage
                        ? <img src={relImage} alt={relName} className="w-full h-full object-cover" />
                        : <RiBox3Line size={36} className="text-gray-200" />}
                      {relDisc && (
                        <span className="absolute top-2 right-2 text-[10px] font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded-md">
                          -{relDisc}%
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-gray-700 transition">
                        {relName}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-gray-900">{relCurrency} {relAmount}</span>
                        {relRating > 0 && (
                          <div className="flex items-center gap-0.5">
                            <MdOutlineStar size={12} className="text-yellow-400" />
                            <span className="text-xs text-gray-500">{relRating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}