import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineStorefront,
  MdOutlineTitle,
  MdOutlineDescription,
  MdOutlineAddPhotoAlternate,
  MdOutlineClose,
  MdOutlineInventory2,
  MdOutlineArrowBack,
} from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { TbCurrencyEuro, TbCurrencyPound, TbCurrencyYen } from "react-icons/tb";
import { RiImageAddLine } from "react-icons/ri";
import useProduct from "../../hooks/useProduct";

const CURRENCIES = [
  { code: "USD", label: "US Dollar", icon: <BsCurrencyDollar /> },
  { code: "EUR", label: "Euro", icon: <TbCurrencyEuro /> },
  { code: "GBP", label: "Pound", icon: <TbCurrencyPound /> },
  { code: "JPY", label: "Yen", icon: <TbCurrencyYen /> },
  { code: "BDT", label: "Taka", icon: <HiOutlineCurrencyBangladeshi /> },
];

export default function CreateProductPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "USD",
  });

  const [images, setImages] = useState([]); // { file, preview }
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const mapped = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...mapped].slice(0, 6)); // max 6
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const {createProductHandler} = useProduct();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
     createProductHandler({
        title: form.title,
        description: form.description,
        currency : form.currency,
        amount : form.amount,
        images: images.map((img) => img.file)
    })

    console.log({
      ...form,
      images: images.map((img) => img.file),
    });



    setTimeout(() => {
      setSubmitting(false);
      navigate("/seller-products");
    }, 500);
  };

  const selectedCurrency = CURRENCIES.find((c) => c.code === form.currency);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition text-gray-600"
          >
            <MdOutlineArrowBack size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdOutlineStorefront size={18} className="text-white" />
            </div>
            <span className="text-[15px] font-semibold text-gray-900 tracking-tight">Vendora</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-1">
            <MdOutlineInventory2 size={22} className="text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">List a Product</h1>
          </div>
          <p className="text-sm text-gray-500 mb-8 ml-9">Fill in the details to publish your product to the marketplace.</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Product Title
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdOutlineTitle size={18} />
                </span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Wireless Noise Cancelling Headphones"
                  className="w-full h-10 pl-9 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 focus:bg-white transition placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Description
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">
                  <MdOutlineDescription size={18} />
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your product — features, condition, what's included..."
                  rows={4}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 focus:bg-white transition placeholder-gray-400 resize-none"
                  required
                />
              </div>
            </div>

            {/* Amount + Currency */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Price
              </label>
              <div className="flex gap-2">

                {/* Currency Selector */}
                <div className="relative">
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="h-10 pl-3 pr-8 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 focus:bg-white transition appearance-none cursor-pointer font-medium text-gray-700"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>

                {/* Amount */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                    {selectedCurrency?.icon}
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full h-10 pl-9 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 focus:bg-white transition placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Currency pills */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setForm({ ...form, currency: c.code })}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150 ${
                      form.currency === c.code
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <span>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Product Images <span className="normal-case font-normal text-gray-400">(up to 6)</span>
              </label>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className={`relative flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-150 ${
                  dragOver
                    ? "border-gray-900 bg-gray-100"
                    : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                }`}
              >
                <MdOutlineAddPhotoAlternate size={28} className="text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB each</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                      <img
                        src={img.preview}
                        alt={`preview-${i}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-150" />
                      {/* Remove btn */}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-red-50"
                      >
                        <MdOutlineClose size={14} className="text-gray-700" />
                      </button>
                      {/* Primary badge */}
                      {i === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold bg-gray-900 text-white px-1.5 py-0.5 rounded-md">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Add more slot */}
                  {images.length < 6 && (
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 aspect-square cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition"
                    >
                      <RiImageAddLine size={22} className="text-gray-400" />
                      <span className="text-xs text-gray-400 mt-1">Add more</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 h-11 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 h-11 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 active:scale-[0.99] text-white text-sm font-medium rounded-xl transition-all duration-150 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <MdOutlineInventory2 size={17} />
                    Publish Product
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Your listing will be reviewed before going live on the marketplace.
        </p>

      </div>
    </div>
  );
}