import { Box, Fish, Leaf, RotateCcw, Save, Trash2 } from 'lucide-react';
import { Button, Input, InputNumber, Segmented, Select, Slider, message } from 'antd';
import { useAquariumStore } from '../../stores/aquariumStore';
import { aquariumService } from '../../services/api';
import type { ObjectKind, TankStyle, WaterType } from '../../types/aquarium';

const tools: { kind: ObjectKind; label: string; icon: typeof Fish }[] = [{ kind: 'fish', label: 'Cá cảnh', icon: Fish }, { kind: 'plant', label: 'Cây thủy sinh', icon: Leaf }, { kind: 'rock', label: 'Đá trang trí', icon: Box }];
const dimensionFields = [{ key: 'length' as const, label: 'Dài', min: 30, max: 300 }, { key: 'width' as const, label: 'Rộng', min: 20, max: 150 }, { key: 'height' as const, label: 'Cao', min: 20, max: 150 }];

export function DesignerToolbar() {
  const { config, updateConfig, addObject, selectedId, objects, removeSelected, updateScale, saveDesign, reset } = useAquariumStore();
  const selected = objects.find((object) => object.id === selectedId);
  const save = async () => { const design = saveDesign(config.name.trim() || 'Hồ cá chưa đặt tên'); try { await aquariumService.create(design); message.success('Đã lưu hồ cá và toàn bộ cấu hình 3D'); } catch { message.warning('Đã lưu trên thiết bị; API hiện không kết nối'); } };
  return <aside className="flex h-full w-[310px] shrink-0 flex-col border-r border-slate-200 bg-white">
    <div className="border-b border-slate-100 p-4"><div className="flex items-center gap-2"><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-widest text-teal-600">Cấu hình hồ</p><Input variant="borderless" value={config.name} onChange={(event) => updateConfig({ name: event.target.value })} className="-ml-3 mt-0 font-extrabold" /></div><Button type="primary" icon={<Save size={15} />} onClick={save}>Lưu</Button></div></div>
    <div className="flex-1 overflow-y-auto p-4">
      <section><p className="tool-label">Kích thước (cm)</p><div className="grid grid-cols-3 gap-2">{dimensionFields.map((field) => <label key={field.key} className="text-[10px] font-bold text-slate-500">{field.label}<InputNumber className="mt-1 w-full" min={field.min} max={field.max} value={config.dimensions[field.key]} onChange={(value) => value && updateConfig({ dimensions: { [field.key]: value } })} /></label>)}</div><p className="mt-2 text-[10px] leading-4 text-slate-400">Dài 30–300 · Rộng/Cao 20–150. Mô hình cập nhật tức thì.</p></section>
      <section className="mt-5"><p className="tool-label">Hệ nước</p><Segmented block value={config.waterType} onChange={(value) => updateConfig({ waterType: value as WaterType })} options={[{ label: 'Nước ngọt', value: 'freshwater' }, { label: 'Nước mặn', value: 'saltwater' }]} /></section>
      <section className="mt-5"><p className="tool-label">Kiểu hồ</p><Select className="w-full" value={config.style} onChange={(value: TankStyle) => updateConfig({ style: value })} options={[{ value: 'rimless', label: 'Không viền' }, { value: 'framed', label: 'Có khung' }, { value: 'openTop', label: 'Hồ mở nắp' }]} /></section>
      <section className="mt-6"><p className="tool-label">Thêm vào hồ</p><div className="grid grid-cols-3 gap-2">{tools.map(({ kind, label, icon: Icon }) => <button onClick={() => addObject(kind)} key={kind} className="rounded-xl border border-slate-100 bg-slate-50 p-2 text-center text-[10px] font-bold text-slate-600 transition hover:border-teal-300 hover:bg-teal-50"><span className="mx-auto mb-1 grid h-8 w-8 place-items-center rounded-lg bg-white text-teal-600 shadow-sm"><Icon size={16} /></span>{label}</button>)}</div></section>
      <section className="mt-6"><p className="tool-label">Đối tượng đang chọn</p>{selected ? <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-3"><div className="flex items-center justify-between"><div><b className="text-sm">{selected.name}</b><p className="text-xs text-slate-500">{selected.kind}</p></div><button onClick={removeSelected} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={17} /></button></div><p className="mb-1 mt-3 text-xs font-bold text-slate-500">Tỷ lệ</p><Slider min={.5} max={1.7} step={.1} value={selected.scale} onChange={updateScale} /></div> : <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">Chọn vật thể trong hồ để chỉnh sửa</div>}</section>
    </div>
    <div className="border-t border-slate-100 p-3"><button onClick={reset} className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold text-slate-500 hover:bg-slate-50"><RotateCcw size={16} /> Tạo hồ mới mặc định</button></div>
  </aside>;
}
