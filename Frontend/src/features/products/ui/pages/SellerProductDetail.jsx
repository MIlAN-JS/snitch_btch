import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdOutlineStorefront,
  MdOutlineArrowBack,
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineSave,
  MdOutlineClose,
  MdOutlineAddPhotoAlternate,
  MdOutlineInventory2,
  MdOutlineCheckCircle,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineWarning,
} from "react-icons/md";
import { RiBox3Line, RiImageAddLine } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbCurrencyEuro, TbCurrencyRupee, TbCurrencyWon } from "react-icons/tb";

// 🔁 Replace with your actual hook path
import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";

// ── Constants ──────────────────────────────────────────────
const CURRENCIES = ["USD", "EUR", "INR", "KRW"];

const CURRENCY_ICONS = {
  USD: <BsCurrencyDollar size={14} />,
  EUR: <TbCurrencyEuro size={14} />,
  INR: <TbCurrencyRupee size={14} />,
  KRW: <TbCurrencyWon size={14} />,
};

const PRESET_ATTRIBUTES = ["Color", "Size", "Material", "Style", "Weight"];

// ── Helpers ────────────────────────────────────────────────
const emptyVariant = (defaultCurrency = "USD") => ({
  _tempId: Date.now() + Math.random(),
  images: [],       // { file, preview } for new | { url, alt } for existing
  stocks: 0,
  attributes: {},
  price: { amount: 0, currency: defaultCurrency },
  _attrEntries: [{ key: "", value: "" }],
  _saved: false,
  _saving: false,
  _error: null,
});

// ── Loading Skeleton ───────────────────────────────────────
const Skeleton = () => (
  <div className="animate-pulse space-y-6 max-w-4xl mx-auto px-4 py-8">
    <div className="h-8 bg-gray-200 rounded w-1/3" />
    <div className="h-24 bg-gray-200 rounded-2xl" />
    <div className="h-64 bg-gray-200 rounded-2xl" />
  </div>
);

// ── Variant Card ───────────────────────────────────────────
const VariantCard = ({ variant, index, onChange, onRemove, onSave }) => {
  const [expanded, setExpanded] = useState(true);
  const fileInputRef = useRef(null);

  const handleAttrChange = (i, field, value) => {
    const updated = [...variant._attrEntries];
    updated[i] = { ...updated[i], [field]: value };
    const attrs = {};
    updated.forEach(({ key, value: val }) => { if (key.trim()) attrs[key.trim()] = val; });
    onChange({ ...variant, _attrEntries: updated, attributes: attrs });
  };

  const addAttrRow = () => {
    onChange({ ...variant, _attrEntries: [...variant._attrEntries, { key: "", value: "" }] });
  };

  const removeAttrRow = (i) => {
    const updated = variant._attrEntries.filter((_, idx) => idx !== i);
    const attrs = {};
    updated.forEach(({ key, value }) => { if (key.trim()) attrs[key.trim()] = value; });
    onChange({ ...variant, _attrEntries: updated, attributes: attrs });
  };

  const handleImageFiles = (files) => {
    const mapped = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .map(file => ({ file, preview: URL.createObjectURL(file), alt: "variant image" }));
    onChange({ ...variant, images: [...variant.images, ...mapped].slice(0, 4) });
  };

  const removeImage = (i) => {
    onChange({ ...variant, images: variant.images.filter((_, idx) => idx !== i) });
  };

  // label shown in collapsed header
  const attrLabel = Object.keys(variant.attributes).length > 0
    ? Object.entries(variant.attributes).map(([k, v]) => `${k}: ${v}`).join(" · ")
    : `Variant ${index + 1}`;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
      variant._error ? "border-red-300" : variant._saved ? "border-green-300" : "border-gray-200"
    }`}>

      {/* ── Header ──────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-xs font-bold shrink-0">
            {index + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{attrLabel}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {variant.price.currency} {variant.price.amount} · {variant.stocks} in stock
              {variant._saved && <span className="ml-2 text-green-600 font-medium">✓ Saved</span>}
              {variant._error && <span className="ml-2 text-red-500 font-medium">✗ Failed</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <MdOutlineDelete size={16} />
          </button>
          {expanded
            ? <MdOutlineKeyboardArrowUp size={20} className="text-gray-400" />
            : <MdOutlineKeyboardArrowDown size={20} className="text-gray-400" />}
        </div>
      </div>

      {/* ── Body ────────────────────────────────────── */}
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-gray-100">

          {/* Error banner */}
          {variant._error && (
            <div className="flex items-center gap-2 mt-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
              <MdOutlineWarning size={15} />
              {variant._error}
            </div>
          )}

          {/* Attributes */}
          <div className="pt-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Attributes <span className="normal-case font-normal text-gray-400">(e.g. Color: Red, Size: XL)</span>
            </label>
            <div className="space-y-2">
              {variant._attrEntries.map((entry, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="e.g. Color"
                    value={entry.key}
                    onChange={(e) => handleAttrChange(i, "key", e.target.value)}
                    list={`attr-presets-${variant._tempId}-${i}`}
                    className="flex-1 h-9 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:bg-white transition placeholder-gray-400"
                  />
                  <datalist id={`attr-presets-${variant._tempId}-${i}`}>
                    {PRESET_ATTRIBUTES.map(a => <option key={a} value={a} />)}
                  </datalist>
                  <span className="text-gray-300 font-bold">:</span>
                  <input
                    type="text"
                    placeholder="e.g. Red"
                    value={entry.value}
                    onChange={(e) => handleAttrChange(i, "value", e.target.value)}
                    className="flex-1 h-9 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:bg-white transition placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttrRow(i)}
                    disabled={variant._attrEntries.length === 1}
                    className="w-8 h-9 flex items-center justify-center text-gray-300 hover:text-red-400 transition disabled:opacity-30"
                  >
                    <MdOutlineClose size={15} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addAttrRow}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-900 transition"
            >
              <MdOutlineAdd size={14} /> Add attribute
            </button>
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Price</label>
              <div className="flex gap-2">
                <select
                  value={variant.price.currency}
                  onChange={(e) => onChange({ ...variant, price: { ...variant.price, currency: e.target.value } })}
                  className="h-9 pl-2 pr-6 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition appearance-none cursor-pointer font-medium text-gray-700"
                >
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {CURRENCY_ICONS[variant.price.currency]}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.price.amount}
                    onChange={(e) => onChange({ ...variant, price: { ...variant.price, amount: Number(e.target.value) } })}
                    className="w-full h-9 pl-7 pr-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Stock</label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-9">
                <button
                  type="button"
                  onClick={() => onChange({ ...variant, stocks: Math.max(0, variant.stocks - 1) })}
                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
                >
                  <MdOutlineRemove size={15} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={variant.stocks}
                  onChange={(e) => onChange({ ...variant, stocks: Math.max(0, Number(e.target.value)) })}
                  className="flex-1 text-center text-sm font-semibold text-gray-900 bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => onChange({ ...variant, stocks: variant.stocks + 1 })}
                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
                >
                  <MdOutlineAdd size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Variant Images */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Variant Images <span className="normal-case font-normal text-gray-400">(up to 4)</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {variant.images.map((img, i) => (
                <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 group bg-gray-100">
                  {/* preview for new files, url for existing */}
                  <img
                    src={img.preview || img.url}
                    alt={img.alt || "variant"}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <MdOutlineClose size={16} className="text-white" />
                  </button>
                </div>
              ))}
              {variant.images.length < 4 && (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition"
                >
                  <RiImageAddLine size={18} className="text-gray-400" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageFiles(e.target.files)}
              />
            </div>
          </div>

          {/* Save this variant */}
          <button
            type="button"
            onClick={onSave}
            disabled={variant._saving}
            className={`w-full h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95
              ${variant._saved
                ? "bg-green-600 text-white"
                : "bg-gray-900 hover:bg-gray-700 text-white disabled:bg-gray-300"}`}
          >
            {variant._saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Saving Variant...
              </>
            ) : variant._saved ? (
              <><MdOutlineCheckCircle size={17} /> Variant Saved!</>
            ) : (
              <><MdOutlineSave size={17} /> Save Variant</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────
export default function SellerProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ── Your custom hook ───────────────────────────────────
  // Destructure whatever your hook exposes
  const {
    getProductHandler,
    createVariantHandler  // call this to load the product by id — rename to match your hook
  } = useProduct();

//   product,        // single product from state.product
//     SellerProducts, // all seller products from state.SellerProducts
//     loading,
//     error,
//     createVariantHandler,

const product = useSelector(state => state.product.product);
const loading = useSelector(state => state.product.loading);
const SellerProducts = useSelector(state => state.product.SellerProducts);
const error = useSelector(state => state.product.error);

  const [variants, setVariants] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const mainFileRef = useRef(null);

  // ── Load product on mount ──────────────────────────────
  useEffect(() => {
    if (id) {
      // 🔁 Replace with the handler name from your hook that fetches a single product
      getProductHandler(id);
    }
  }, [id]);

  // ── Sync existing variants from redux state ────────────
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const normalized = product.variants.map(v => ({
        ...v,
        _tempId: v._id || Date.now() + Math.random(),
        // Convert mongoose Map back to key-value entries for UI
        _attrEntries: v.attributes && Object.keys(v.attributes).length > 0
          ? Object.entries(v.attributes).map(([key, value]) => ({ key, value }))
          : [{ key: "", value: "" }],
        _saved: false,
        _saving: false,
        _error: null,
      }));
      setVariants(normalized);
    }
  }, [product]);

  // ── Add new empty variant ──────────────────────────────
  const addVariant = () => {
    setVariants(prev => [...prev, emptyVariant(product?.price?.currency || "USD")]);
    setActiveTab("variants");
  };

  // ── Update variant in local state ─────────────────────
  const updateVariant = (tempId, updated) => {
    setVariants(prev => prev.map(v => v._tempId === tempId ? updated : v));
  };

  // ── Remove variant from local state ───────────────────
  const removeVariant = (tempId) => {
    setVariants(prev => prev.filter(v => v._tempId !== tempId));
  };

  // ── Save a single variant via your handler ─────────────
  // Matches your createVariantHandler signature exactly:
  // { amount, currency, attributes, images, id }
  const handleSaveVariant = async (tempId) => {
    const variant = variants.find(v => v._tempId === tempId);
    if (!variant) return;

    // Mark as saving
    updateVariant(tempId, { ...variant, _saving: true, _error: null });

    try {
      // Extract only the actual File objects from images array
      // (new uploads have .file, existing DB images have .url only)
      const imageFiles = variant.images
        .filter(img => img.file instanceof File)
        .map(img => img.file);

      await createVariantHandler({
        amount:     variant.price.amount,
        currency:   variant.price.currency,
        attributes: variant.attributes,  // plain object — your service does JSON.stringify
        images:     imageFiles,          // array of File objects
        id,                              // product id from useParams
      });

      // Mark as saved
      updateVariant(tempId, { ...variant, _saving: false, _saved: true, _error: null });

      // Reset saved badge after 3s
      setTimeout(() => {
        setVariants(prev =>
          prev.map(v => v._tempId === tempId ? { ...v, _saved: false } : v)
        );
      }, 3000);

    } catch (err) {
      updateVariant(tempId, {
        ...variant,
        _saving: false,
        _saved: false,
        _error: err?.message || "Failed to save variant. Please try again.",
      });
    }
  };

  // ── Normalize product fields from redux state ──────────
  const name        = product?.title || product?.name || "Product";
  const description = product?.description || "";
  const amount      = product?.price?.amount ?? 0;
  const currency    = product?.price?.currency || "USD";
  const images      = product?.images || [];

  // ── Loading / Error ────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
            <MdOutlineStorefront size={15} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Vendora</span>
        </header>
        <Skeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MdOutlineWarning size={48} className="text-gray-200 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">Something went wrong</h2>
          <p className="text-sm text-gray-400 mt-1 mb-4">{error || "Product not found."}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center gap-4">
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
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
            <button onClick={() => navigate("/dashboard")} className="hover:text-gray-700 transition">Dashboard</button>
            <span className="mx-1">›</span>
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{name}</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Product Summary ──────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-center">
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
            {images[0]?.url
              ? <img src={images[0].url} alt={name} className="w-full h-full object-cover" />
              : <RiBox3Line size={28} className="text-gray-300" />}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{name}</h1>
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{description}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">{currency} {amount}</span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-500">{variants.length} variant{variants.length !== 1 ? "s" : ""}</span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-500">{images.length} image{images.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/seller/products/${id}/edit`)}
            className="shrink-0 w-9 h-9 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-500"
          >
            <MdOutlineEdit size={17} />
          </button>
        </div>

        {/* ── Tabs ─────────────────────────────────────── */}
        <div className="flex border-b border-gray-200">
          {["details", "variants"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize transition border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
              {tab === "variants" && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {variants.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Details Tab ──────────────────────────────── */}
        {activeTab === "details" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-semibold text-gray-900">Product Images</h2>
            <div className="flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className={`w-20 h-20 rounded-xl border-2 overflow-hidden ${i === 0 ? "border-gray-900" : "border-gray-200"}`}>
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="block text-center text-[9px] font-bold bg-gray-900 text-white py-0.5">COVER</span>
                  )}
                </div>
              ))}
              <div
                onClick={() => mainFileRef.current.click()}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition"
              >
                <MdOutlineAddPhotoAlternate size={20} className="text-gray-400" />
                <span className="text-[10px] text-gray-400 mt-1">Add</span>
              </div>
              <input ref={mainFileRef} type="file" accept="image/*" multiple className="hidden" />
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Title</label>
                <input
                  type="text"
                  defaultValue={name}
                  className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  defaultValue={description}
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:bg-white transition resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Base Price</label>
                <div className="flex gap-2">
                  <select
                    defaultValue={currency}
                    className="h-10 pl-3 pr-7 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition appearance-none font-medium text-gray-700"
                  >
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input
                    type="number"
                    defaultValue={amount}
                    className="flex-1 h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Variants Tab ─────────────────────────────── */}
        {activeTab === "variants" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Product Variants</h2>
                <p className="text-xs text-gray-400 mt-0.5">Each variant is saved individually to your API.</p>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 px-4 h-9 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition active:scale-95"
              >
                <MdOutlineAdd size={17} /> Add Variant
              </button>
            </div>

            {/* Empty state */}
            {variants.length === 0 && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 py-16 flex flex-col items-center justify-center text-center">
                <MdOutlineInventory2 size={40} className="text-gray-200 mb-3" />
                <h3 className="text-sm font-semibold text-gray-700">No variants yet</h3>
                <p className="text-xs text-gray-400 mt-1 mb-4 max-w-xs">
                  Add variants to offer different colors, sizes, or materials to your buyers.
                </p>
                <button
                  onClick={addVariant}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition"
                >
                  <MdOutlineAdd size={16} /> Add First Variant
                </button>
              </div>
            )}

            {/* Variant Cards */}
            {variants.map((variant, index) => (
              <VariantCard
                key={variant._tempId}
                variant={variant}
                index={index}
                onChange={(updated) => updateVariant(variant._tempId, updated)}
                onRemove={() => removeVariant(variant._tempId)}
                onSave={() => handleSaveVariant(variant._tempId)}
              />
            ))}

            {/* Bottom add button */}
            {variants.length > 0 && (
              <button
                type="button"
                onClick={addVariant}
                className="w-full h-11 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-medium text-gray-400 hover:border-gray-400 hover:text-gray-700 hover:bg-white transition flex items-center justify-center gap-2"
              >
                <MdOutlineAdd size={18} /> Add Another Variant
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}