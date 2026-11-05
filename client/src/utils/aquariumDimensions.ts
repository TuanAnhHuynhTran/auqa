import type { AquariumConfig, AquariumObject } from '../types/aquarium';

export const CM_PER_WORLD_UNIT = 20;
export const cmToWorld = (centimeters: number) => centimeters / CM_PER_WORLD_UNIT;

export function worldDimensions(config: AquariumConfig) {
  return { x: cmToWorld(config.dimensions.length), y: cmToWorld(config.dimensions.height), z: cmToWorld(config.dimensions.width) };
}

export function clampObjectsToTank(objects: AquariumObject[], config: AquariumConfig) {
  const { x, y, z } = worldDimensions(config); const margin = .28;
  return objects.map((object) => ({ ...object, position: {
    x: Math.max(-x / 2 + margin, Math.min(x / 2 - margin, object.position.x)),
    y: Math.max(object.kind === 'fish' ? margin : .18, Math.min(y - margin, object.position.y)),
    z: Math.max(-z / 2 + margin, Math.min(z / 2 - margin, object.position.z)),
  } }));
}

export const DEFAULT_AQUARIUM_CONFIG: AquariumConfig = {
  name: 'Hồ cá mới', dimensions: { length: 120, width: 40, height: 50 }, waterType: 'freshwater', style: 'rimless',
};
