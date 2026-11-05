import { ArrowRight, Box, Fish, Leaf, Palette, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroOcean } from '../three/AquariumScene';
import { usePageTitle } from '../hooks/usePageTitle';

export function HomePage() {
  usePageTitle('Khám phá đại dương');
  return <>
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#061d2d] text-white">
      <HeroOcean />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#061d2d] via-[#061d2d]/75 to-transparent" />
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1500px] items-center px-6 py-20 lg:px-12">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200 backdrop-blur"><Sparkles size={15} /> Thế giới thủy sinh trong tầm tay</div>
          <h1 className="text-5xl font-black leading-[1.04] tracking-[-.045em] sm:text-6xl lg:text-7xl">Kiến tạo đại dương<br /><span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">của riêng bạn.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Thiết kế hồ cá 3D, lựa chọn những người bạn nhỏ và ngắm thế giới dưới nước sống động mỗi ngày.</p>
          <div className="pointer-events-auto mt-9 flex flex-wrap gap-4"><Link to="/designer" className="flex items-center gap-2 rounded-2xl bg-teal-400 px-6 py-3.5 font-extrabold text-[#05242b] shadow-xl shadow-teal-500/20 transition hover:-translate-y-1 hover:bg-teal-300">Bắt đầu thiết kế <ArrowRight size={19} /></Link><Link to="/gallery" className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 font-bold backdrop-blur transition hover:bg-white/15"><Play size={18} fill="white" /> Khám phá cộng đồng</Link></div>
          <div className="mt-12 flex flex-wrap gap-7 text-sm text-slate-400"><span className="flex items-center gap-2"><ShieldCheck size={17} className="text-teal-300" /> Miễn phí sáng tạo</span><span className="flex items-center gap-2"><Box size={17} className="text-teal-300" /> Trải nghiệm 3D thật</span></div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden rounded-2xl border border-white/10 bg-white/10 p-4 text-sm backdrop-blur-xl lg:block"><p className="text-slate-300">Đang khám phá</p><b className="mt-1 block text-lg">Rạn san hô Azure</b></div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-24"><div className="text-center"><p className="text-xs font-black uppercase tracking-[.22em] text-teal-600">Sáng tạo không giới hạn</p><h2 className="mt-3 text-4xl font-black tracking-tight">Một thế giới, do chính bạn tạo nên</h2></div><div className="mt-12 grid gap-6 md:grid-cols-3">{[
      [Palette, 'Thiết kế trực quan', 'Thêm và sắp xếp cá, cây thủy sinh, đá trang trí ngay trong không gian 3D.'],
      [Fish, 'Hệ sinh thái sống động', 'Mỗi chú cá có chuyển động tự nhiên, màu sắc và cá tính riêng.'],
      [Leaf, 'Không gian thư giãn', 'Một góc đại dương yên bình để bạn chăm sóc và ngắm nhìn mỗi ngày.'],
    ].map(([Icon, title, copy]) => { const I = Icon as typeof Palette; return <div key={title as string} className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span className="grid h-13 w-13 place-items-center rounded-2xl bg-teal-50 text-teal-600"><I /></span><h3 className="mt-6 text-xl font-extrabold">{title as string}</h3><p className="mt-3 leading-7 text-slate-500">{copy as string}</p></div>; })}</div></section>
  </>;
}
