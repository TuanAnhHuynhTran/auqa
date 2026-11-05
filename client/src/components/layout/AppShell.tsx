import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Fish, Home, Menu, Palette, Sparkles, Waves, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Khám phá', icon: Sparkles },
  { to: '/shop', label: 'Cửa hàng', icon: Fish },
  { to: '/my-home', label: 'Nhà của tôi', icon: Home },
  { to: '/gallery', label: 'Bộ sưu tập', icon: Box },
];

export function AppShell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const designer = location.pathname === '/designer';
  return <div className="min-h-screen bg-[#f3f9fa] text-slate-800">
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-white/10 bg-[#061d2d]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1500px] items-center gap-7 px-5 lg:px-8">
        <NavLink to="/" className="flex shrink-0 items-center gap-3" aria-label="AquaVerse">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-teal-500 shadow-lg shadow-teal-500/25"><Waves size={23} /></span>
          <span className="text-xl font-black tracking-tight">AquaVerse <i className="not-italic text-cyan-300">3D</i></span>
        </NavLink>
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {links.map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white/12 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>{label}</NavLink>)}
        </nav>
        <NavLink to="/designer" className={`hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg transition sm:flex ${designer ? 'bg-white text-teal-700' : 'bg-teal-400 text-[#05242b] shadow-teal-500/20 hover:-translate-y-0.5 hover:bg-teal-300'}`}><Palette size={17} /> Xưởng thiết kế</NavLink>
        <button className="ml-auto md:hidden" onClick={() => setOpen(!open)} aria-label="Mở menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-[#061d2d] p-4 md:hidden">{[...links, { to: '/designer', label: 'Xưởng thiết kế', icon: Palette }].map(({ to, label, icon: Icon }) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className="flex items-center gap-3 rounded-xl p-3 text-slate-200 hover:bg-white/10"><Icon size={18} />{label}</NavLink>)}</nav>}
    </header>
    <main className={designer ? 'h-screen overflow-hidden pt-[72px]' : 'pt-[72px]'}><Outlet /></main>
  </div>;
}
