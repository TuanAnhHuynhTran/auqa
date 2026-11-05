import { Box, Fish, Heart, Palette, Plus, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AquariumScene } from '../three/AquariumScene';
import { useAquariumStore } from '../stores/aquariumStore';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { usePageTitle } from '../hooks/usePageTitle';

export function MyHomePage() {
  usePageTitle('Nhà của tôi'); const objects = useAquariumStore((s) => s.objects); const tankSize = useAquariumStore((s) => s.tankSize);
  const fishes = objects.filter((x) => x.kind === 'fish').length;
  return <div className="mx-auto max-w-7xl px-6 py-12"><PageHeader eyebrow="Không gian cá nhân" title="Chào buổi sáng, Nhà thám hiểm!" description="Hồ cá của bạn đang khỏe mạnh và chờ được ghé thăm." action={<Link to="/designer" className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-bold text-white shadow-lg shadow-teal-500/20"><Plus size={18} /> Tạo hồ mới</Link>} />
    <div className="mt-8 grid gap-4 sm:grid-cols-3"><StatCard icon={Fish} value={String(fishes)} label="Người bạn đang nuôi" /><StatCard icon={Waves} value="92%" label="Chất lượng nước" tone="blue" /><StatCard icon={Heart} value="Tuyệt vời" label="Trạng thái hồ" tone="orange" /></div>
    <section className="mt-8 overflow-hidden rounded-[28px] bg-[#062a3b] shadow-2xl"><div className="grid min-h-[480px] lg:grid-cols-[1fr_300px]"><AquariumScene objects={objects} tankSize={tankSize} interactive /><aside className="border-t border-white/10 bg-[#082333] p-7 text-white lg:border-l lg:border-t-0"><p className="text-xs font-black uppercase tracking-widest text-teal-300">Hồ đang hoạt động</p><h2 className="mt-2 text-2xl font-black">Vịnh Ngọc Lam</h2><p className="mt-2 text-sm leading-6 text-slate-400">Một hệ sinh thái nhỏ đầy sức sống.</p><div className="mt-8 space-y-5">{[['Nhiệt độ', '25°C'], ['Độ pH', '7.2'], ['Ánh sáng', '72%']].map(([k, v]) => <div key={k}><div className="flex justify-between text-sm"><span className="text-slate-400">{k}</span><b>{v}</b></div><div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-teal-400" /></div></div>)}</div><Link to="/designer" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 py-3 font-bold hover:bg-white/15"><Palette size={17} /> Chỉnh sửa hồ</Link></aside></div></section>
    <div className="mt-8 grid gap-5 md:grid-cols-2"><Link to="/designs" className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600"><Box /></span><div><b className="text-lg">Thiết kế đã lưu</b><p className="text-sm text-slate-500">Quản lý các phiên bản hồ của bạn</p></div></Link><Link to="/gallery" className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-600"><Waves /></span><div><b className="text-lg">Khám phá cảm hứng</b><p className="text-sm text-slate-500">Ghé thăm thế giới của cộng đồng</p></div></Link></div>
  </div>;
}
