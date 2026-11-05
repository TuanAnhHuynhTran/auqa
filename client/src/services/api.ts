import axios from 'axios';
import type { AquariumDesign, AquariumTemplate, CatalogItem } from '../types/aquarium';

export const api = axios.create({ baseURL: '/api', timeout: 5000 });
export const catalogService = { list: () => api.get<CatalogItem[]>('/catalog').then((r) => r.data) };
export const templateService = {
  list: () => api.get<AquariumTemplate[]>('/aquarium-templates').then((r) => r.data),
  get: (id: string) => api.get<AquariumTemplate>(`/aquarium-templates/${id}`).then((r) => r.data),
};
export const designService = {
  list: () => api.get<AquariumDesign[]>('/designs').then((r) => r.data),
  create: (design: Omit<AquariumDesign, 'id' | 'createdAt' | 'updatedAt'>) => api.post<AquariumDesign>('/designs', design).then((r) => r.data),
  remove: (id: string) => api.delete(`/designs/${id}`),
};
export const aquariumService = {
  list: () => api.get<AquariumDesign[]>('/aquariums').then((r) => r.data),
  get: (id: string) => api.get<AquariumDesign>(`/aquariums/${id}`).then((r) => r.data),
  create: (aquarium: AquariumDesign) => api.post<AquariumDesign>('/aquariums', aquarium).then((r) => r.data),
  update: (id: string, aquarium: Partial<AquariumDesign>) => api.put<AquariumDesign>(`/aquariums/${id}`, aquarium).then((r) => r.data),
  remove: (id: string) => api.delete(`/aquariums/${id}`),
};
