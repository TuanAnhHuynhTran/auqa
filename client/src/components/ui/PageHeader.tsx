import type { ReactNode } from 'react';
export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div><p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-teal-600">{eyebrow}</p><h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-slate-500">{description}</p></div>{action}
  </div>;
}
