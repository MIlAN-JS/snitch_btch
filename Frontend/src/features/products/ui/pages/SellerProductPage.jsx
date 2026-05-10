import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineStorefront,
  MdOutlineAdd,
  MdOutlineInventory2,
  MdOutlineShoppingBag,
  MdOutlineSearch,
  MdOutlineMoreVert,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineVisibility,
  MdOutlineWarning,
} from "react-icons/md";
import { RiBox3Line } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbCurrencyEuro, TbCurrencyRupee, TbCurrencyWon } from "react-icons/tb";
import { useState } from "react";
import { useSelector } from "react-redux";
// 🔁 Replace with your actual hook path
import useProduct from "../../hooks/useProduct";

// ── Currency icon helper ───────────────────────────────────
const CurrencyIcon = ({ currency }) => {
  const icons = {
    USD: <BsCurrencyDollar size={13} />,
    EUR: <TbCurrencyEuro size={13} />,
    INR: <TbCurrencyRupee size={13} />,
    KRW: <TbCurrencyWon size={13} />,
  };
  return icons[currency] || <BsCurrencyDollar size={13} />;
};

// ── Status Badge ───────────────────────────────────────────
const StockBadge = ({ stock }) => {
  if (stock === undefined || stock === null)
    return null;
  if (stock === 0)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-red-50 text-red-600 border border-red-200">
        Out of Stock
      </span>
    );
  if (stock <= 5)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
        Low Stock · {stock}
      </span>
    );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">
      In Stock · {stock}
    </span>
  );
};

// ── Skeleton Card ──────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-200" />
    <div className="p-4 space-y-2.5">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="flex justify-between mt-3">
        <div className="h-5 bg-gray-200 rounded w-1/4" />
        <div className="h-8 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  </div>
);

// ── Product Card ───────────────────────────────────────────
const SellerProductCard = ({ product, onView, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Normalize fields
  const id          = product?._id || product?.id;
  const name        = product?.title || product?.name || "Untitled Product";
  const description = product?.description || "";
  const amount      = product?.price?.amount ?? 0;
  const currency    = product?.price?.currency || "USD";
  const image       = product?.images?.[0]?.url || null;
  const imageAlt    = product?.images?.[0]?.alt || name;
  const variants    = product?.variants?.length ?? 0;
  const stock       = product?.stock ?? null;
  const createdAt   = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:border-gray-300 hover:shadow-md transition-all duration-200">

      {/* Image */}
      <div
        onClick={() => onView(id)}
        className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        {image
          ? <img src={image} alt={imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <RiBox3Line size={48} className="text-gray-200" />}

        {/* Variant count pill */}
        {variants > 0 && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold bg-gray-900 text-white px-2 py-0.5 rounded-md">
            {variants} variant{variants !== 1 ? "s" : ""}
          </span>
        )}

        {/* 3-dot menu */}
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-gray-50"
          >
            <MdOutlineMoreVert size={16} className="text-gray-600" />
          </button>

          {menuOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-36 overflow-hidden">
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onView(id); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <MdOutlineVisibility size={15} className="text-gray-400" /> View Details
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit(id); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <MdOutlineEdit size={15} className="text-gray-400" /> Edit Product
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete(id); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <MdOutlineDelete size={15} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] text-gray-400 font-medium mb-0.5">{createdAt}</p>
        <h3
          onClick={() => onView(id)}
          className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug cursor-pointer hover:text-gray-600 transition min-h-[2.5rem]"
        >
          {name}
        </h3>
        {description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{description}</p>
        )}

        {/* Stock badge */}
        <div className="mt-2">
          <StockBadge stock={stock} />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-gray-900 font-bold text-base">
            <CurrencyIcon currency={currency} />
            {amount}
          </div>
          <button
            onClick={() => onView(id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs font-medium rounded-xl transition active:scale-95"
          >
            <MdOutlineVisibility size={13} />
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────
export default function SellerProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // ── Your hook ──────────────────────────────────────────
  const {  getProductHandlerSeller } = useProduct();

  //    SellerProducts,
    // loading,
    // error,

    const SellerProducts = useSelector((state) => state.product.SellerProducts);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    console.log(SellerProducts)

  // ── Fetch on mount ─────────────────────────────────────
  useEffect(() => {
    getProductHandlerSeller();
  }, []);

  // ── Filter + Sort ──────────────────────────────────────
  const products = SellerProducts || [];

  const filtered = products
    .filter(p => {
      const name = p?.title || p?.name || "";
      const desc = p?.description || "";
      const q = search.toLowerCase();
      return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "price_asc")
        return (a.price?.amount ?? 0) - (b.price?.amount ?? 0);
      if (sortBy === "price_desc")
        return (b.price?.amount ?? 0) - (a.price?.amount ?? 0);
      return 0;
    });

    console.log(filtered)

  // ── Stats ──────────────────────────────────────────────
  const totalProducts  = products.length;
  const totalVariants  = products.reduce((acc, p) => acc + (p.variants?.length ?? 0), 0);
  const outOfStock     = products.filter(p => p.stock === 0).length;

  // ── Handlers ───────────────────────────────────────────
  const handleView   = (id) => navigate(`/seller/product/${id}`);
  const handleEdit   = (id) => navigate(`/seller/product/${id}/edit`);
  const handleDelete = (id) => {
    // 🔁 Wire up your deleteProductHandler here
    console.log("Delete product:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition text-gray-600"
          >
            <MdOutlineStorefront size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdOutlineStorefront size={15} className="text-white" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900 tracking-tight hidden sm:block">Vendora</span>
          </div>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
            <button onClick={() => navigate("/dashboard")} className="hover:text-gray-700 transition">Dashboard</button>
            <span className="mx-1">›</span>
            <span className="text-gray-700 font-medium">My Products</span>
          </div>

          {/* Add product */}
          <button
            onClick={() => navigate("/seller/product/create")}
            className="ml-auto flex items-center gap-1.5 px-4 h-9 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition active:scale-95"
          >
            <MdOutlineAdd size={18} /> New Product
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ───────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your listings, variants and inventory.</p>
        </div>

        {/* ── Stats Row ────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Products", value: totalProducts, icon: <RiBox3Line size={20} /> },
            { label: "Total Variants", value: totalVariants, icon: <MdOutlineInventory2 size={20} /> },
            { label: "Out of Stock",   value: outOfStock,    icon: <MdOutlineShoppingBag size={20} />, warn: outOfStock > 0 },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                stat.warn ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"
              }`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + Sort ─────────────────────────────── */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <MdOutlineSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 transition placeholder-gray-400"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 pl-3 pr-8 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-900 transition text-gray-700 font-medium appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* ── Error State ───────────────────────────────── */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            <MdOutlineWarning size={18} />
            {error}
          </div>
        )}

        {/* ── Loading Grid ──────────────────────────────── */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Empty State ───────────────────────────────── */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <RiBox3Line size={52} className="text-gray-200 mb-4" />
            {search ? (
              <>
                <h3 className="text-base font-semibold text-gray-900">No results for "{search}"</h3>
                <p className="text-sm text-gray-400 mt-1">Try a different search term.</p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold text-gray-900">No products yet</h3>
                <p className="text-sm text-gray-400 mt-1 mb-4">Start by listing your first product on Vendora.</p>
                <button
                  onClick={() => navigate("/seller/products/create")}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition"
                >
                  <MdOutlineAdd size={17} /> Create First Product
                </button>
              </>
            )}
          </div>
        )}

        {/* ── Products Grid ─────────────────────────────── */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="text-xs text-gray-400">
              Showing {filtered.length} of {totalProducts} product{totalProducts !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <SellerProductCard
                  key={product._id || product.id}
                  product={product}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}