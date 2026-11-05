import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html, OrbitControls, Sparkles } from '@react-three/drei';
import { Vector3 } from 'three';
import type { AquariumObject, AquariumTemplate } from '../../types/aquarium';
import { FishModel } from '../models/FishModel';
import { PlantModel } from '../models/PlantModel';
import { RockModel } from '../models/RockModel';

export type ShowroomView = 'perspective' | 'front' | 'side' | 'top';

interface Props {
  templates: AquariumTemplate[];
  selectedId: string | null;
  view: ShowroomView;
  onSelect: (id: string) => void;
  autoRotate?: boolean;
}

function CameraDirector({ selected, view, controls, autoRotate }: { selected?: AquariumTemplate; view: ShowroomView; controls: React.MutableRefObject<any>; autoRotate?: boolean }) {
  const { camera } = useThree();
  const desiredPosition = useRef(new Vector3(11, 8, 15));
  const desiredTarget = useRef(new Vector3(0, 1.2, 0));
  useEffect(() => {
    if (!selected) { desiredPosition.current.set(11, 8, 15); desiredTarget.current.set(0, 1.2, 0); return; }
    const [x, y, z] = selected.showroomPosition;
    desiredTarget.current.set(x, y, z);
    const offsets: Record<ShowroomView, [number, number, number]> = {
      perspective: [5.8, 3.2, 5.8], front: [0, .4, 7.2], side: [7.2, .4, 0], top: [0.01, 8.2, .01],
    };
    const [ox, oy, oz] = offsets[view]; desiredPosition.current.set(x + ox, y + oy, z + oz);
  }, [selected, view]);
  useFrame((_, delta) => {
    const factor = 1 - Math.exp(-delta * 3.2);
    if (!autoRotate) camera.position.lerp(desiredPosition.current, factor);
    if (controls.current) { controls.current.target.lerp(desiredTarget.current, factor); controls.current.update(); }
  });
  return null;
}

function CeilingLight({ position }: { position: [number, number, number] }) {
  return <group position={position}><mesh><boxGeometry args={[4.5, .12, .35]} /><meshStandardMaterial color="#eafcff" emissive="#d7ffff" emissiveIntensity={2} /></mesh><rectAreaLight width={4} height={1.4} intensity={6} color="#c9ffff" position={[0, -.12, 0]} rotation={[-Math.PI / 2, 0, 0]} /></group>;
}

function Room() {
  return <>
    <color attach="background" args={['#08141b']} /><fog attach="fog" args={['#08141b', 18, 38]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[30, 24]} /><meshStandardMaterial color="#17242b" roughness={.5} metalness={.25} /></mesh>
    <gridHelper args={[30, 30, '#30454d', '#22353d']} position={[0, .012, 0]} />
    <mesh position={[0, 5, -11.8]} receiveShadow><boxGeometry args={[30, 10, .35]} /><meshStandardMaterial color="#132a34" roughness={.8} /></mesh>
    <mesh position={[-14.8, 5, 0]} receiveShadow><boxGeometry args={[.35, 10, 24]} /><meshStandardMaterial color="#10232c" /></mesh>
    <mesh position={[14.8, 5, 0]} receiveShadow><boxGeometry args={[.35, 10, 24]} /><meshStandardMaterial color="#10232c" /></mesh>
    <mesh position={[0, 9.5, 0]}><boxGeometry args={[30, .3, 24]} /><meshStandardMaterial color="#0b171d" /></mesh>
    {[-8, 0, 8].map((x) => <CeilingLight key={x} position={[x, 8.7, 0]} />)}
    <mesh position={[0, 5.4, -11.55]}><planeGeometry args={[10, 2]} /><meshStandardMaterial color="#123b48" emissive="#0b7782" emissiveIntensity={.5} /></mesh>
    <Html position={[0, 5.4, -11.3]} transform distanceFactor={8}><div className="pointer-events-none whitespace-nowrap text-center text-3xl font-black tracking-[.22em] text-cyan-100 drop-shadow-[0_0_18px_#22ddd0]">AQUAVERSE GALLERY</div></Html>
  </>;
}

function TemplateObject({ object }: { object: AquariumObject }) {
  if (object.kind === 'fish') return <FishModel object={object} ambient />;
  if (object.kind === 'plant') return <PlantModel object={object} />;
  return <RockModel object={object} />;
}

function DisplayTank({ template, selected, onSelect }: { template: AquariumTemplate; selected: boolean; onSelect: () => void }) {
  const [x, y, z] = template.showroomPosition;
  const isWide = template.tankSize === 'panorama'; const width = isWide ? 4.8 : template.tankSize === 'compact' ? 3.6 : 4.2;
  return <group position={[x, y, z]} onClick={(event) => { event.stopPropagation(); onSelect(); }}>
    <mesh position={[0, -1.65, 0]} castShadow receiveShadow><boxGeometry args={[width + .45, 1.15, 2.4]} /><meshStandardMaterial color={selected ? '#173f47' : '#111c22'} metalness={.55} roughness={.3} /></mesh>
    <mesh position={[0, -.95, 0]}><boxGeometry args={[width + .25, .22, 2.2]} /><meshStandardMaterial color="#071217" metalness={.8} /></mesh>
    <mesh><boxGeometry args={[width, 2.35, 2]} /><meshPhysicalMaterial color="#75d8e6" transparent opacity={.16} transmission={.7} roughness={.08} thickness={.12} side={2} /></mesh>
    <mesh position={[0, -.08, 0]}><boxGeometry args={[width - .15, 2.05, 1.83]} /><meshPhysicalMaterial color="#087c9a" transparent opacity={.27} transmission={.42} roughness={.15} /></mesh>
    <mesh position={[0, -1.02, 0]}><boxGeometry args={[width - .12, .18, 1.85]} /><meshStandardMaterial color={template.model === 'coral' ? '#c8ac83' : '#6f725d'} roughness={1} /></mesh>
    <group scale={.31} position={[0, -.25, 0]}>{[...template.decorations, ...template.sampleFish].map((object) => <TemplateObject object={object} key={object.id} />)}</group>
    <Sparkles count={15} scale={[width - .3, 1.8, 1.5]} size={.8} speed={.18} color="#d4ffff" opacity={.4} />
    {selected && <pointLight color={template.accentColor} intensity={5} distance={6} position={[0, 1.8, 1]} />}
    <Html position={[0, -2.45, 0]} center distanceFactor={10}><button onClick={onSelect} className={`w-48 rounded-xl border px-4 py-2 text-center backdrop-blur transition ${selected ? 'border-teal-300 bg-teal-400/90 text-[#052a2c] shadow-[0_0_22px_#22cdbc]' : 'border-white/15 bg-[#081922]/90 text-white hover:border-teal-300'}`}><b className="block text-sm">{template.name}</b><small className={selected ? 'text-teal-900' : 'text-slate-400'}>{template.waterType}</small></button></Html>
  </group>;
}

function ShowroomWorld(props: Props) {
  const controls = useRef<any>(null); const selected = props.templates.find((item) => item.id === props.selectedId);
  return <><ambientLight intensity={.35} /><directionalLight position={[6, 9, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} /><Room />
    {props.templates.map((template) => <DisplayTank key={template.id} template={template} selected={template.id === props.selectedId} onSelect={() => props.onSelect(template.id)} />)}
    <ContactShadows position={[0, .03, 0]} scale={25} opacity={.5} blur={2.5} far={10} /><Environment preset="warehouse" />
    <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={4} maxDistance={24} maxPolarAngle={Math.PI / 2.02} dampingFactor={.08} autoRotate={props.autoRotate && Boolean(selected)} autoRotateSpeed={.75} />
    <CameraDirector selected={selected} view={props.view} controls={controls} autoRotate={props.autoRotate} />
  </>;
}

export function ShowroomScene(props: Props) {
  return <Canvas shadows dpr={[1, 1.5]} camera={{ position: [11, 8, 15], fov: 48, near: .1, far: 80 }} gl={{ antialias: true, powerPreference: 'high-performance' }} onPointerMissed={() => undefined}>
    <Suspense fallback={null}><ShowroomWorld {...props} /></Suspense>
  </Canvas>;
}
