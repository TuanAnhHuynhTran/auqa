import { ChevronLeft, Eye, Home, Maximize2, Rotate3D, Undo2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DesignerToolbar } from '../features/designer/DesignerToolbar';
import { CustomTankScene, type CameraView } from '../three/designer/CustomTankScene';
import { useAquariumStore } from '../stores/aquariumStore';
import { usePageTitle } from '../hooks/usePageTitle';

const views: { id: CameraView; label: string; icon: typeof Eye }[] = [
  { id: 'orbit', label: 'Orbit', icon: Rotate3D }, { id: 'front', label: 'Trước', icon: Eye }, { id: 'left', label: 'Trái', icon: ChevronLeft }, { id: 'right', label: 'Phải', icon: ChevronLeft }, { id: 'top', label: 'Trên', icon: Maximize2 }, { id: 'reset', label: 'Reset', icon: Undo2 },
];

export function DesignerPage() {
  usePageTitle('Xưởng thiết kế'); const [view, setView] = useState<CameraView>('reset'); const [viewToken, setViewToken] = useState(0);
  const { objects, config, selectedId, select } = useAquariumStore();
  const chooseView = (next: CameraView) => { setView(next); setViewToken((value) => value + 1); };
  return <div className="flex h-full min-h-0 bg-[#051b29]"><DesignerToolbar /><section className="relative min-w-0 flex-1">
    <div className="absolute left-4 top-4 z-10 flex items-center gap-2"><Link to="/my-home" className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#071f2d]/85 px-3 py-2 text-xs font-bold text-white backdrop-blur"><ChevronLeft size={16} /> Thoát</Link><span className="rounded-xl border border-white/10 bg-[#071f2d]/85 px-3 py-2 text-xs text-slate-300 backdrop-blur">{config.dimensions.length} × {config.dimensions.width} × {config.dimensions.height} cm</span></div>
    <div className="absolute right-4 top-4 z-10 flex overflow-hidden rounded-xl border border-white/10 bg-[#071f2d]/85 p-1 backdrop-blur">{views.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => chooseView(id)} title={label} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition ${view === id ? 'bg-teal-400 text-[#05292b]' : 'text-slate-300 hover:bg-white/10'}`}><Icon size={14} className={id === 'right' ? 'rotate-180' : ''} /><span className="hidden xl:inline">{label}</span></button>)}</div>
    <CustomTankScene config={config} objects={objects} selectedId={selectedId} onSelect={select} view={view} viewToken={viewToken} />
    <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-5 rounded-xl border border-white/10 bg-[#071f2d]/80 px-4 py-2 text-[11px] text-slate-300 backdrop-blur"><span>Kéo trái: xoay</span><span>Cuộn: zoom</span><span>Kéo phải: pan</span><span className="flex items-center gap-1 text-teal-300"><Home size={13} /> Đáy Y = 0</span></div>
  </section></div>;
}
