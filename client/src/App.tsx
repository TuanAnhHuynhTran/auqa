import { ConfigProvider } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from './components/layout/AppShell';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const MyHomePage = lazy(() => import('./pages/MyHomePage').then((m) => ({ default: m.MyHomePage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const DesignerPage = lazy(() => import('./pages/DesignerPage').then((m) => ({ default: m.DesignerPage })));
const DesignsPage = lazy(() => import('./pages/DesignsPage').then((m) => ({ default: m.DesignsPage })));
const Loading = () => <div className="grid min-h-[calc(100vh-72px)] place-items-center bg-[#061d2d] text-sm font-bold tracking-widest text-teal-300">ĐANG MỞ AQUAVERSE...</div>;

export default function App() { return <ConfigProvider theme={{ token: { colorPrimary: '#0faaa0', borderRadius: 12, fontFamily: 'Inter, system-ui, sans-serif' } }}><BrowserRouter><Suspense fallback={<Loading />}><Routes><Route element={<AppShell />}><Route index element={<HomePage />} /><Route path="shop" element={<ShopPage />} /><Route path="my-home" element={<MyHomePage />} /><Route path="gallery" element={<GalleryPage />} /><Route path="designer" element={<DesignerPage />} /><Route path="designs" element={<DesignsPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></Suspense></BrowserRouter></ConfigProvider>; }
