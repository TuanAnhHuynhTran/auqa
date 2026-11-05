import type { LucideIcon } from 'lucide-react';
export function StatCard({ icon: Icon, value, label, tone = 'teal' }: { icon: LucideIcon; value: string; label: string; tone?: 'teal' | 'blue' | 'orange' }) {
  const colors = { teal: 'bg-teal-50 text-teal-600', blue: 'bg-blue-50 text-blue-600', orange: 'bg-orange-50 text-orange-600' };
  return <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><span className={`grid h-11 w-11 place-items-center rounded-xl ${colors[tone]}`}><Icon size={21} /></span><div><b className="block text-xl text-slate-900">{value}</b><span className="text-sm text-slate-500">{label}</span></div></div>;
}
