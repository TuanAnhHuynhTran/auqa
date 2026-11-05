import type { CatalogItem, TankSize } from '../types/aquarium';

export const TANK_DIMENSIONS: Record<TankSize, [number, number, number]> = {
  compact: [7, 4.5, 4], classic: [10, 5.5, 5], panorama: [13, 5.5, 5],
};

export const CATALOG: CatalogItem[] = [
  { id: 'neon', kind: 'fish', name: 'Cá Neon Xanh', scientificName: 'Paracheirodon innesi', description: 'Sắc xanh điện nổi bật, thích sống theo đàn.', color: '#2de2e6', price: 120, rarity: 'Phổ biến', icon: '✦' },
  { id: 'clown', kind: 'fish', name: 'Cá Hề Ocellaris', scientificName: 'Amphiprion ocellaris', description: 'Tinh nghịch, thân thiện và rất dễ chăm sóc.', color: '#ff8a3d', price: 280, rarity: 'Phổ biến', icon: '◒' },
  { id: 'royal', kind: 'fish', name: 'Cá Đuôi Gai Xanh', scientificName: 'Paracanthurus hepatus', description: 'Một dải đại dương xanh giữa hồ của bạn.', color: '#3678ff', price: 650, rarity: 'Hiếm', icon: '◆' },
  { id: 'gold', kind: 'fish', name: 'Cá Vàng Sao Chổi', scientificName: 'Carassius auratus', description: 'Vệt nắng ấm áp với chiếc đuôi mềm mại.', color: '#ffc23c', price: 190, rarity: 'Phổ biến', icon: '●' },
  { id: 'anubias', kind: 'plant', name: 'Ráy Nana', description: 'Cây tiền cảnh khỏe, lá xanh đậm.', color: '#36c879', price: 85, rarity: 'Phổ biến', icon: '♧' },
  { id: 'coral', kind: 'plant', name: 'San hô Moon', description: 'Điểm nhấn rực rỡ cho đáy hồ.', color: '#ff6e8d', price: 340, rarity: 'Đặc biệt', icon: '♢' },
  { id: 'slate', kind: 'rock', name: 'Đá Hắc Thạch', description: 'Tạo chiều sâu và nơi trú ẩn tự nhiên.', color: '#566979', price: 60, rarity: 'Phổ biến', icon: '⬟' },
];

export const INITIAL_OBJECTS = [
  { id: 'fish-1', kind: 'fish' as const, variant: 'clown', name: 'Cá Hề Ocellaris', color: '#ff8a3d', position: { x: -2.1, y: 0.4, z: 0 }, scale: 1 },
  { id: 'fish-2', kind: 'fish' as const, variant: 'neon', name: 'Cá Neon Xanh', color: '#2de2e6', position: { x: 1.7, y: 1.1, z: -0.4 }, scale: 0.72 },
  { id: 'plant-1', kind: 'plant' as const, variant: 'anubias', name: 'Ráy Nana', color: '#36c879', position: { x: -3.2, y: -1.75, z: -1 }, scale: 1 },
  { id: 'rock-1', kind: 'rock' as const, variant: 'slate', name: 'Đá Hắc Thạch', color: '#566979', position: { x: 2.8, y: -2, z: -0.7 }, scale: 1 },
];
