import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls, Sparkles } from '@react-three/drei';
import { Suspense } from 'react';
import { FishModel } from './models/FishModel';
import { PlantModel } from './models/PlantModel';
import { RockModel } from './models/RockModel';
import { TANK_DIMENSIONS } from '../utils/constants';
import type { AquariumObject, TankSize } from '../types/aquarium';

interface Props { objects: AquariumObject[]; tankSize?: TankSize; selectedId?: string | null; onSelect?: (id: string | null) => void; interactive?: boolean }

function Tank({ objects, tankSize = 'classic', selectedId, onSelect, interactive }: Props) {
  const [w, h, d] = TANK_DIMENSIONS[tankSize];
  return <>
    <color attach="background" args={['#051b2a']} />
    <fog attach="fog" args={['#072d40', 9, 24]} />
    <ambientLight intensity={.8} color="#bffcff" />
    <directionalLight position={[3, 8, 5]} intensity={2.2} color="#d8ffff" castShadow />
    <pointLight position={[-4, 1, 2]} color="#16dbc5" intensity={5} distance={10} />
    <mesh position={[0, -h / 2 - .12, 0]} receiveShadow>
      <boxGeometry args={[w, .28, d]} /><meshStandardMaterial color="#ac9a78" roughness={1} />
    </mesh>
    <gridHelper args={[w, Math.round(w), '#68c9c2', '#2f716f']} position={[0, -h / 2 + .04, 0]} />
    <mesh position={[0, 0, -d / 2]}><planeGeometry args={[w, h]} /><meshPhysicalMaterial color="#0d6480" transparent opacity={.28} roughness={.1} transmission={.25} /></mesh>
    <lineSegments>
      <edgesGeometry args={[new (requireThreeBox())(w, h, d)]} />
      <lineBasicMaterial color="#67f3e0" transparent opacity={.38} />
    </lineSegments>
    {objects.map((object) => {
      const common = { key: object.id, object, selected: selectedId === object.id, onSelect: () => onSelect?.(object.id) };
      if (object.kind === 'fish') return <FishModel {...common} />;
      if (object.kind === 'plant') return <PlantModel {...common} />;
      return <RockModel {...common} />;
    })}
    <Sparkles count={45} scale={[w * .85, h * .8, d * .7]} size={1.6} speed={.25} opacity={.35} color="#bafff8" />
    <Environment preset="city" />
    <OrbitControls makeDefault enablePan={false} enableZoom={interactive} minDistance={8} maxDistance={17} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 1.8} target={[0, 0, 0]} />
  </>;
}

// Avoid recreating scene logic while keeping the geometry primitive local to this engine module.
import { BoxGeometry } from 'three';
const requireThreeBox = () => BoxGeometry;

export function AquariumScene(props: Props & { className?: string }) {
  return <div className={props.className ?? 'h-full w-full'}>
    <Canvas shadows dpr={[1, 1.7]} camera={{ position: [0, 2.2, 11.5], fov: 46 }} onPointerMissed={() => props.onSelect?.(null)} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <Suspense fallback={null}><Tank {...props} /></Suspense>
    </Canvas>
  </div>;
}

export function HeroOcean() {
  const fish: AquariumObject[] = [
    { id: 'a', kind: 'fish', variant: 'royal', name: 'Royal', color: '#397cff', position: { x: -2.8, y: .6, z: 0 }, scale: 1.25 },
    { id: 'b', kind: 'fish', variant: 'clown', name: 'Clown', color: '#ff8a3d', position: { x: 1.6, y: -.5, z: .2 }, scale: .8 },
    { id: 'c', kind: 'fish', variant: 'neon', name: 'Neon', color: '#19d8d2', position: { x: 3.1, y: 1.5, z: -1 }, scale: .55 },
  ];
  return <div className="absolute inset-0"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 1, 9], fov: 48 }}><color attach="background" args={['#061e2e']} /><fog attach="fog" args={['#062a3c', 6, 18]} /><ambientLight intensity={1.1} /><pointLight position={[-3, 4, 2]} intensity={8} color="#18d6c1" /><Suspense fallback={null}>{fish.map((f) => <Float key={f.id} speed={1.2} floatIntensity={.5}><FishModel object={f} ambient /></Float>)}<Sparkles count={100} scale={[14, 8, 5]} speed={.2} opacity={.45} color="#b4fff7" /><Environment preset="city" /></Suspense></Canvas></div>;
}
