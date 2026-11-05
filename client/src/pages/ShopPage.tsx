import { useEffect, useMemo, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { Box, ChevronLeft, ChevronRight, Cuboid, Droplets, Eye, Fish, Layers3, Maximize2, Rotate3D, Ruler, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShowroomScene, type ShowroomView } from '../three/showroom/ShowroomScene';
import { templateService } from '../services/api';
import { useAquariumStore } from '../stores/aquariumStore';
import { usePageTitle } from '../hooks/usePageTitle';
import type { AquariumTemplate } from '../types/aquarium';

const viewOptions: { id: ShowroomView; label: string; icon: typeof Eye }[] = [
  { id: 'perspective', label: '360°', icon: Rotate3D }, { id: 'front', label: 'Mặt trước', icon: Eye }, { id: 'side', label: 'Mặt bên', icon: Layers3 }, { id: 'top', label: 'Mặt trên', icon: Maximize2 },
];

export function ShopPage() {
  usePageTitle('Showroom 3D');
  const [templates, setTemplates] = useState<AquariumTemplate[]>([]); const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<ShowroomView>('perspective'); const [autoRotate, setAutoRotate] = useState(false); const [loading, setLoading] = useState(true); const [error, setError] = useState(false);
  const useTemplate = useAquariumStore((state) => state.useTemplate); const navigate = useNavigate();
  useEffect(() => { templateService.list().then(setTemplates).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  const selected = useMemo(() => templates.find((item) => item.id === selectedId), [templates, selectedId]);
  const select = (id: string) => { setSelectedId(id); setView('perspective'); setAutoRotate(false); };
  const step = (direction: number) => { if (!templates.length) return; const current = Math.max(0, templates.findIndex((item) => item.id === selectedId)); select(templates[(current + direction + templates.length) % templates.length].id); };
  const chooseView = (next: ShowroomView) => { setView(next); setAutoRotate(next === 'perspective' ? !autoRotate : false); };
  const apply = (customize: boolean) => { if (!selected) return; useTemplate(selected, !customize); message.success(customize ? 'Đã tạo bản tùy chỉnh từ mẫu' : 'Đã thêm bản sao vào thiết kế của bạn'); navigate(customize ? '/designer' : '/designs'); };

  return <div className="relative h-[calc(100vh-72px)] min-h-[650px] overflow-hidden bg-[#08141b] text-white">
    {loading ? <div className="grid h-full place-items-center"><Spin size="large" /><p className="absolute mt-20 text-sm text-slate-400">Đang chuẩn bị showroom...</p></div> : error ? <div className="grid h-full place-items-center text-center"><div><Cuboid className="mx-auto text-teal-300" size={44} /><h2 className="mt-4 text-xl font-black">Không thể mở showroom</h2><p className="mt-2 text-slate-400">Hãy đảm bảo AquaVerse API đang chạy tại cổng 3001.</p><Button className="mt-5" onClick={() => location.reload()}>Thử lại</Button></div></div> : <ShowroomScene templates={templates} selectedId={selectedId} onSelect={select} view={view} autoRotate={autoRotate} />}

    <div className="pointer-events-none absolute left-6 top-6 max-w-md"><div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-200 backdrop-blur"><Sparkles size={14} /> Aqua Gallery</div><h1 className="mt-3 text-3xl font-black tracking-tight drop-shadow-lg">Showroom hồ cá 3D</h1><p className="mt-1 text-sm text-slate-300 drop-shadow">Kéo để khám phá · Cuộn để phóng to · Chọn một hồ để xem</p></div>

    <div className="absolute left-6 top-36 hidden flex-col gap-2 xl:flex">{viewOptions.map(({ id, label, icon: Icon }) => <button key={id} disabled={!selected} onClick={() => chooseView(id)} className={`flex w-32 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold backdrop-blur transition disabled:cursor-not-allowed disabled:opacity-30 ${view === id ? 'border-teal-300 bg-teal-400 text-[#06282b]' : 'border-white/10 bg-[#071821]/80 text-slate-200 hover:bg-white/10'}`}><Icon size={16} />{label}{id === 'perspective' && autoRotate && <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-white" />}</button>)}</div>

    {selected && <aside className="absolute bottom-24 right-6 top-6 flex w-[350px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#071821]/92 shadow-2xl backdrop-blur-xl">
      <div className="relative h-28 shrink-0 p-5" style={{ background: selected.thumbnail }}><div className="absolute inset-0 bg-gradient-to-t from-[#071821] to-transparent" /><button onClick={() => setSelectedId(null)} className="absolute right-4 top-4 rounded-full bg-black/20 p-2 backdrop-blur hover:bg-black/30"><X size={16} /></button><span className="absolute bottom-4 left-5 rounded-full bg-black/25 px-3 py-1 text-xs font-bold backdrop-blur">{selected.waterType}</span></div>
      <div className="flex-1 overflow-y-auto px-5 pb-5"><h2 className="text-2xl font-black">{selected.name}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{selected.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2"><div className="info-chip"><Ruler size={16} /><span><small>Kích thước</small><b>{selected.dimensions.width} × {selected.dimensions.height} × {selected.dimensions.depth}</b></span></div><div className="info-chip"><Droplets size={16} /><span><small>Hệ nước</small><b>{selected.waterType}</b></span></div><div className="info-chip"><Fish size={16} /><span><small>Cá mẫu</small><b>{selected.sampleFish.length} loài</b></span></div><div className="info-chip"><Box size={16} /><span><small>Trang trí</small><b>{selected.decorations.length} vật thể</b></span></div></div>
        <div className="mt-5"><p className="text-[10px] font-black uppercase tracking-[.18em] text-slate-500">Thành phần mẫu</p><div className="mt-2 flex flex-wrap gap-2">{[...selected.sampleFish, ...selected.decorations].map((object) => <span key={object.id} className="rounded-lg border border-white/8 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">{object.name}</span>)}</div></div>
      </div>
      <div className="grid shrink-0 gap-2 border-t border-white/10 bg-[#07141c] p-4"><Button size="large" type="primary" onClick={() => apply(false)}>Sử dụng mẫu này</Button><Button size="large" ghost onClick={() => apply(true)}>Tùy chỉnh thiết kế</Button></div>
    </aside>}

    <div className={`absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 transition-all ${selected ? 'max-w-[calc(100%-410px)] xl:pr-24' : 'max-w-[calc(100%-48px)]'}`}><button onClick={() => step(-1)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-[#071821]/85 backdrop-blur hover:bg-white/10"><ChevronLeft size={19} /></button><div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#071821]/85 p-2 backdrop-blur">{templates.map((template, index) => <button key={template.id} onClick={() => select(template.id)} className={`flex shrink-0 items-center gap-3 rounded-xl border p-2 pr-4 text-left transition ${selectedId === template.id ? 'border-teal-300 bg-teal-400/15' : 'border-transparent hover:bg-white/8'}`}><span className="grid h-9 w-12 place-items-center rounded-lg text-xs font-black" style={{ background: template.thumbnail }}>{String(index + 1).padStart(2, '0')}</span><span><b className="block whitespace-nowrap text-xs">{template.name}</b><small className="text-[10px] text-slate-400">{template.tankSize}</small></span></button>)}</div><button onClick={() => step(1)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-[#071821]/85 backdrop-blur hover:bg-white/10"><ChevronRight size={19} /></button></div>
  </div>;
}
