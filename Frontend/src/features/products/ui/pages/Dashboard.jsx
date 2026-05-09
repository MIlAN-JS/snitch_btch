import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineStorefront,
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineShoppingBag,
  MdOutlineBarChart,
  MdOutlineSettings,
  MdOutlineNotifications,
  MdOutlineSearch,
  MdOutlineAdd,
  MdOutlineTrendingUp,
  MdOutlineTrendingDown,
  MdOutlinePeople,
  MdOutlineAttachMoney,
  MdOutlineMoreVert,
  MdOutlineVisibility,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineMenu,
  MdOutlineClose,
  MdOutlineLogout,
  MdOutlineLocalShipping,
  MdOutlineCheckCircle,
  MdOutlinePending,
  MdOutlineCancel,
} from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiBox3Line } from "react-icons/ri";

// ── Mock Data ─────────────────────────────────────────────
const STATS = [
  {
    label: "Total Revenue",
    value: "$24,530",
    change: "+12.5%",
    up: true,
    icon: <MdOutlineAttachMoney size={22} />,
    bg: "bg-gray-900",
    text: "text-white",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    up: true,
    icon: <MdOutlineShoppingBag size={22} />,
    bg: "bg-white",
    text: "text-gray-900",
  },
  {
    label: "Active Products",
    value: "48",
    change: "-2",
    up: false,
    icon: <RiBox3Line size={22} />,
    bg: "bg-white",
    text: "text-gray-900",
  },
  {
    label: "Total Customers",
    value: "3,921",
    change: "+5.1%",
    up: true,
    icon: <MdOutlinePeople size={22} />,
    bg: "bg-white",
    text: "text-gray-900",
  },
];

const ORDERS = [
  { id: "#ORD-9821", customer: "Arjun Mehta", product: "Wireless Headphones", amount: "$129.00", status: "delivered", date: "May 8, 2026" },
  { id: "#ORD-9820", customer: "Sofia Laurent", product: "Mechanical Keyboard", amount: "$89.00", status: "shipped", date: "May 8, 2026" },
  { id: "#ORD-9819", customer: "James Okafor", product: "USB-C Hub 7-in-1", amount: "$45.00", status: "pending", date: "May 7, 2026" },
  { id: "#ORD-9818", customer: "Yuki Tanaka", product: "Laptop Stand", amount: "$35.00", status: "delivered", date: "May 7, 2026" },
  { id: "#ORD-9817", customer: "Maria Santos", product: "LED Desk Lamp", amount: "$28.00", status: "cancelled", date: "May 6, 2026" },
  { id: "#ORD-9816", customer: "Liam Chen", product: "Wireless Mouse", amount: "$55.00", status: "shipped", date: "May 6, 2026" },
];

const PRODUCTS = [
  { id: 1, name: "Wireless Noise Cancelling Headphones", price: "$129.00", stock: 24, sold: 182, status: "active" },
  { id: 2, name: "Mechanical Keyboard RGB", price: "$89.00", stock: 11, sold: 97, status: "active" },
  { id: 3, name: "USB-C Hub 7-in-1", price: "$45.00", stock: 0, sold: 310, status: "out_of_stock" },
  { id: 4, name: "Ergonomic Laptop Stand", price: "$35.00", stock: 56, sold: 74, status: "active" },
  { id: 5, name: "LED Desk Lamp", price: "$28.00", stock: 3, sold: 45, status: "low_stock" },
];

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: <MdOutlineDashboard size={19} /> },
  { key: "products", label: "Products", icon: <RiBox3Line size={19} /> },
  { key: "orders", label: "Orders", icon: <MdOutlineShoppingBag size={19} /> },
  { key: "analytics", label: "Analytics", icon: <MdOutlineBarChart size={19} /> },
  { key: "settings", label: "Settings", icon: <MdOutlineSettings size={19} /> },
];

// ── Status Badge ───────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    delivered: { label: "Delivered", cls: "bg-green-50 text-green-700 border-green-200", icon: <MdOutlineCheckCircle size={13} /> },
    shipped:   { label: "Shipped",   cls: "bg-blue-50 text-blue-700 border-blue-200",   icon: <MdOutlineLocalShipping size={13} /> },
    pending:   { label: "Pending",   cls: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: <MdOutlinePending size={13} /> },
    cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600 border-red-200",      icon: <MdOutlineCancel size={13} /> },
    active:       { label: "Active",       cls: "bg-green-50 text-green-700 border-green-200" },
    out_of_stock: { label: "Out of Stock", cls: "bg-red-50 text-red-600 border-red-200" },
    low_stock:    { label: "Low Stock",    cls: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  };
  const s = map[status] || {};
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
};

// ── Main Component ─────────────────────────────────────────
export default function SellerDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = ORDERS.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

      {/* ── Sidebar ─────────────────────────────────────── */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-30 h-full w-60 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdOutlineStorefront size={16} className="text-white" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900 tracking-tight">Vendora</span>
          </div>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <MdOutlineClose size={20} />
          </button>
        </div>

        {/* Seller Info */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Jane Doe</p>
              <p className="text-xs text-gray-400">Seller Account</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveNav(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${activeNav === item.key
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition">
            <MdOutlineLogout size={19} />
            Log out
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-5 py-3.5 flex items-center gap-4">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <MdOutlineMenu size={22} />
          </button>

          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-900 capitalize">{activeNav}</h1>
            <p className="text-xs text-gray-400">Welcome back, Jane 👋</p>
          </div>

          {/* Search */}
          <div className="relative hidden sm:block">
            <MdOutlineSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 h-9 pl-8 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/8 focus:bg-white transition placeholder-gray-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition">
            <MdOutlineNotifications size={19} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Add Product */}
          <button
            onClick={() => navigate("/create-product")}
            className="hidden sm:flex items-center gap-1.5 h-9 px-4 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition active:scale-95"
          >
            <MdOutlineAdd size={18} />
            New Product
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

          {/* ── Stats Cards ─────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-gray-100 p-5 shadow-sm ${s.bg}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`${s.text === "text-white" ? "text-white/70" : "text-gray-400"}`}>
                    {s.icon}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full
                      ${s.up
                        ? s.text === "text-white" ? "bg-white/20 text-white" : "bg-green-50 text-green-700"
                        : s.text === "text-white" ? "bg-white/20 text-white" : "bg-red-50 text-red-600"}`}
                  >
                    {s.up ? <MdOutlineTrendingUp size={13} /> : <MdOutlineTrendingDown size={13} />}
                    {s.change}
                  </span>
                </div>
                <p className={`text-2xl font-bold tracking-tight ${s.text}`}>{s.value}</p>
                <p className={`text-xs mt-1 ${s.text === "text-white" ? "text-white/60" : "text-gray-400"}`}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Recent Orders + Top Products ────────────── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            {/* Orders Table */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{ORDERS.length} orders this week</p>
                </div>
                <button className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 transition">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Order</th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Customer</th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide hidden md:table-cell">Product</th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Amount</th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(search ? filteredOrders : ORDERS).map((order, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-50 hover:bg-gray-50 transition"
                      >
                        <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{order.id}</td>
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                              {order.customer.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="text-sm text-gray-700 font-medium whitespace-nowrap">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-sm text-gray-500 hidden md:table-cell max-w-[160px] truncate">{order.product}</td>
                        <td className="px-3 py-3.5 text-sm font-semibold text-gray-900">{order.amount}</td>
                        <td className="px-3 py-3.5"><StatusBadge status={order.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Your Products</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{PRODUCTS.length} total listings</p>
                </div>
                <button
                  onClick={() => navigate("/create-product")}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
                >
                  <MdOutlineAdd size={16} />
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {PRODUCTS.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition group">
                    {/* Thumb placeholder */}
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <RiBox3Line size={18} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500 font-semibold">{p.price}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400">{p.sold} sold</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={p.status} />
                      {/* Action icons on hover */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button className="text-gray-400 hover:text-gray-700 transition">
                          <MdOutlineEdit size={14} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 transition">
                          <MdOutlineDelete size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Quick Actions ────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Add Product", icon: <MdOutlineAdd size={20} />, action: () => navigate("/create-product") },
              { label: "View Orders", icon: <MdOutlineShoppingBag size={20} />, action: () => setActiveNav("orders") },
              { label: "Inventory", icon: <MdOutlineInventory2 size={20} />, action: () => setActiveNav("products") },
              { label: "Analytics", icon: <MdOutlineBarChart size={20} />, action: () => setActiveNav("analytics") },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-md active:scale-95 transition-all duration-150 text-gray-600 hover:text-gray-900"
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}