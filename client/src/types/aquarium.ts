export type ObjectKind = 'fish' | 'plant' | 'rock';
export type TankSize = 'compact' | 'classic' | 'panorama';
export type WaterType = 'freshwater' | 'saltwater';
export type TankStyle = 'rimless' | 'framed' | 'openTop';

export interface AquariumConfig {
  name: string;
  dimensions: { length: number; width: number; height: number };
  waterType: WaterType;
  style: TankStyle;
}

export interface Vector3Data { x: number; y: number; z: number }

export interface AquariumObject {
  id: string;
  kind: ObjectKind;
  variant: string;
  name: string;
  color: string;
  position: Vector3Data;
  scale: number;
}

export interface AquariumDesign {
  id: string;
  name: string;
  description: string;
  tankSize: TankSize;
  config?: AquariumConfig;
  objects: AquariumObject[];
  createdAt: string;
  updatedAt: string;
}

export interface CatalogItem {
  id: string;
  kind: ObjectKind;
  name: string;
  scientificName?: string;
  description: string;
  color: string;
  price: number;
  rarity: 'Phổ biến' | 'Hiếm' | 'Đặc biệt';
  icon: string;
}

export interface AquariumTemplate {
  id: string;
  name: string;
  waterType: 'Nước ngọt' | 'Nước mặn';
  dimensions: { width: number; height: number; depth: number };
  tankSize: TankSize;
  model: string;
  thumbnail: string;
  description: string;
  decorations: AquariumObject[];
  sampleFish: AquariumObject[];
  showroomPosition: [number, number, number];
  accentColor: string;
}
