import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CATALOG, INITIAL_OBJECTS } from '../utils/constants';
import { clampObjectsToTank, DEFAULT_AQUARIUM_CONFIG, worldDimensions } from '../utils/aquariumDimensions';
import type { AquariumConfig, AquariumDesign, AquariumObject, AquariumTemplate, ObjectKind, TankSize } from '../types/aquarium';

interface AquariumState {
  tankSize: TankSize; config: AquariumConfig; objects: AquariumObject[]; selectedId: string | null; designs: AquariumDesign[];
  setTankSize: (size: TankSize) => void;
  updateConfig: (patch: Omit<Partial<AquariumConfig>, 'dimensions'> & { dimensions?: Partial<AquariumConfig['dimensions']> }) => void;
  select: (id: string | null) => void;
  addObject: (kind: ObjectKind, variant?: string) => void;
  removeSelected: () => void; updateScale: (scale: number) => void;
  saveDesign: (name: string) => AquariumDesign;
  loadDesign: (id: string) => void; deleteDesign: (id: string) => void; renameDesign: (id: string, name: string) => void; duplicateDesign: (id: string) => void;
  hydrateDesigns: (designs: AquariumDesign[]) => void;
  useTemplate: (template: AquariumTemplate, saveCopy?: boolean) => void; reset: () => void;
}

const initialObjects = INITIAL_OBJECTS.map((object) => ({ ...object, position: { ...object.position, y: object.kind === 'fish' ? object.position.y + 2.5 : .25 } }));

export const useAquariumStore = create<AquariumState>()(persist((set, get) => ({
  tankSize: 'classic', config: DEFAULT_AQUARIUM_CONFIG, objects: initialObjects, selectedId: null, designs: [],
  setTankSize: (tankSize) => set({ tankSize }),
  updateConfig: (patch) => set((state) => { const config = { ...state.config, ...patch, dimensions: { ...state.config.dimensions, ...(patch.dimensions ?? {}) } }; return { config, objects: clampObjectsToTank(state.objects, config) }; }),
  select: (selectedId) => set({ selectedId }),
  addObject: (kind, variant) => {
    const item = CATALOG.filter((entry) => entry.kind === kind).find((entry) => entry.id === variant) ?? CATALOG.find((entry) => entry.kind === kind); if (!item) return;
    const { x, y, z } = worldDimensions(get().config); const id = `${kind}-${crypto.randomUUID()}`; const bottom = kind !== 'fish';
    const object: AquariumObject = { id, kind, variant: item.id, name: item.name, color: item.color, scale: 1, position: { x: (Math.random() - .5) * x * .65, y: bottom ? .25 : .45 + Math.random() * Math.max(.2, y - .9), z: (Math.random() - .5) * z * .6 } };
    set((state) => ({ objects: [...state.objects, object], selectedId: id }));
  },
  removeSelected: () => set((state) => ({ objects: state.objects.filter((o) => o.id !== state.selectedId), selectedId: null })),
  updateScale: (scale) => set((state) => ({ objects: state.objects.map((o) => o.id === state.selectedId ? { ...o, scale } : o) })),
  saveDesign: (name) => {
    const now = new Date().toISOString(); const config = { ...get().config, name };
    const design: AquariumDesign = { id: crypto.randomUUID(), name, description: `${get().objects.length} vật thể`, tankSize: get().tankSize, config, objects: structuredClone(get().objects), createdAt: now, updatedAt: now };
    set((state) => ({ config, designs: [design, ...state.designs] })); return design;
  },
  loadDesign: (id) => { const design = get().designs.find((item) => item.id === id); if (design) set({ tankSize: design.tankSize, config: design.config ?? { ...DEFAULT_AQUARIUM_CONFIG, name: design.name }, objects: structuredClone(design.objects), selectedId: null }); },
  deleteDesign: (id) => set((state) => ({ designs: state.designs.filter((design) => design.id !== id) })),
  renameDesign: (id, name) => set((state) => ({ designs: state.designs.map((design) => design.id === id ? { ...design, name, config: design.config ? { ...design.config, name } : design.config, updatedAt: new Date().toISOString() } : design) })),
  duplicateDesign: (id) => set((state) => { const source = state.designs.find((design) => design.id === id); if (!source) return state; const copy = structuredClone(source); copy.id = crypto.randomUUID(); copy.name = `${source.name} · Bản sao`; copy.createdAt = copy.updatedAt = new Date().toISOString(); if (copy.config) copy.config.name = copy.name; copy.objects = copy.objects.map((object) => ({ ...object, id: `${object.kind}-${crypto.randomUUID()}` })); return { designs: [copy, ...state.designs] }; }),
  hydrateDesigns: (incoming) => set((state) => { const localIds = new Set(state.designs.map((design) => design.id)); return { designs: [...state.designs, ...incoming.filter((design) => !localIds.has(design.id))] }; }),
  useTemplate: (template, saveCopy = false) => {
    const now = new Date().toISOString(); const config: AquariumConfig = { name: `${template.name} · Bản của tôi`, dimensions: { length: template.dimensions.width, width: template.dimensions.depth, height: template.dimensions.height }, waterType: template.waterType === 'Nước mặn' ? 'saltwater' : 'freshwater', style: 'rimless' };
    const h = worldDimensions(config).y; const raw = structuredClone([...template.decorations, ...template.sampleFish]).map((object) => ({ ...object, id: `${object.kind}-${crypto.randomUUID()}`, position: { ...object.position, y: object.kind === 'fish' ? object.position.y + h / 2 : .25 } })); const objects = clampObjectsToTank(raw, config);
    const copy: AquariumDesign = { id: crypto.randomUUID(), name: config.name, description: template.description, tankSize: template.tankSize, config, objects, createdAt: now, updatedAt: now };
    set((state) => ({ tankSize: template.tankSize, config, objects, selectedId: null, designs: saveCopy ? [copy, ...state.designs] : state.designs }));
  },
  reset: () => set({ tankSize: 'classic', config: DEFAULT_AQUARIUM_CONFIG, objects: [], selectedId: null }),
}), { name: 'aquaverse-designer', version: 2, migrate: (persisted) => ({ ...(persisted as AquariumState), config: (persisted as AquariumState).config ?? DEFAULT_AQUARIUM_CONFIG }) }));
