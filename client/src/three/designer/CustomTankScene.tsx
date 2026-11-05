import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, Sparkles } from '@react-three/drei';
import { Vector3 } from 'three';
import type { AquariumConfig, AquariumObject } from '../../types/aquarium';
import { worldDimensions } from '../../utils/aquariumDimensions';
import { FishModel } from '../models/FishModel';
import { PlantModel } from '../models/PlantModel';
import { RockModel } from '../models/RockModel';

export type CameraView = 'orbit' | 'front' | 'left' | 'right' | 'top' | 'reset';
interface Props { config: AquariumConfig; objects: AquariumObject[]; selectedId: string | null; view: CameraView; viewToken: number; onSelect: (id: string | null) => void }

function CameraController({ config, view, viewToken, controls }: { config: AquariumConfig; view: CameraView; viewToken: number; controls: React.MutableRefObject<any> }) {
  const { camera } = useThree(); const target = useRef(new Vector3()); const position = useRef(new Vector3()); const active = useRef(true);
  const { x, y, z } = worldDimensions(config);
  useEffect(() => {
    const center = new Vector3(0, y / 2, 0); const distance = Math.max(x, y, z) * 1.25 + 2; target.current.copy(center); active.current = true;
    if (view === 'front') position.current.set(0, y / 2, distance);
    else if (view === 'left') position.current.set(-distance, y / 2, 0);
    else if (view === 'right') position.current.set(distance, y / 2, 0);
    else if (view === 'top') position.current.set(.001, distance, .001);
    else position.current.set(distance * .72, y * .85 + 1.2, distance * .72);
  }, [x, y, z, view, viewToken]);
  useFrame((_, delta) => {
    if (!active.current) return; const factor = 1 - Math.exp(-delta * 4); camera.position.lerp(position.current, factor); controls.current?.target.lerp(target.current, factor); controls.current?.update();
    if (camera.position.distanceTo(position.current) < .02) active.current = false;
  });
  return null;
}

function Water({ x, y, z, openTop }: { x: number; y: number; z: number; openTop: boolean }) {
  const surface = useRef<any>(null); const level = y * (openTop ? .86 : .92);
  useFrame(({ clock }) => { if (surface.current) { surface.current.position.y = level + Math.sin(clock.elapsedTime * 1.1) * .012; surface.current.rotation.z = Math.sin(clock.elapsedTime * .7) * .004; } });
  return <>
    <mesh position={[0, level / 2, 0]}><boxGeometry args={[x - .12, level, z - .12]} /><meshPhysicalMaterial color="#087ca7" transparent opacity={.22} transmission={.58} roughness={.08} thickness={.3} /></mesh>
    <mesh ref={surface} position={[0, level, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[x - .1, z - .1, 20, 12]} /><meshPhysicalMaterial color="#66e4ed" transparent opacity={.42} transmission={.5} roughness={.12} metalness={.08} /></mesh>
  </>;
}

function GlassTank({ config }: { config: AquariumConfig }) {
  const { x, y, z } = worldDimensions(config); const t = .055; const framed = config.style === 'framed';
  const glass = <meshPhysicalMaterial color="#b9f5f2" transparent opacity={.2} transmission={.88} roughness={.06} thickness={.22} metalness={.03} side={2} />;
  return <group>
    <mesh position={[0, y / 2, z / 2]} castShadow><boxGeometry args={[x, y, t]} />{glass}</mesh>
    <mesh position={[0, y / 2, -z / 2]} castShadow><boxGeometry args={[x, y, t]} />{glass}</mesh>
    <mesh position={[-x / 2, y / 2, 0]} castShadow><boxGeometry args={[t, y, z]} />{glass}</mesh>
    <mesh position={[x / 2, y / 2, 0]} castShadow><boxGeometry args={[t, y, z]} />{glass}</mesh>
    <mesh position={[0, t / 2, 0]} receiveShadow><boxGeometry args={[x, t, z]} />{glass}</mesh>
    <Water x={x} y={y} z={z} openTop={config.style === 'openTop'} />
    <mesh position={[0, .07, 0]} receiveShadow><boxGeometry args={[x - .1, .14, z - .1]} /><meshStandardMaterial color={config.waterType === 'saltwater' ? '#c7b58f' : '#80735c'} roughness={1} /></mesh>
    {framed && <group>{[
      [0, .05, z / 2], [0, .05, -z / 2], [0, y, z / 2], [0, y, -z / 2],
    ].map((p, i) => <mesh key={i} position={p as [number, number, number]}><boxGeometry args={[x + .12, .11, .11]} /><meshStandardMaterial color="#11181c" metalness={.75} roughness={.25} /></mesh>)}{[
      [-x / 2, y / 2, z / 2], [x / 2, y / 2, z / 2], [-x / 2, y / 2, -z / 2], [x / 2, y / 2, -z / 2],
    ].map((p, i) => <mesh key={`v-${i}`} position={p as [number, number, number]}><boxGeometry args={[.11, y, .11]} /><meshStandardMaterial color="#11181c" metalness={.75} /></mesh>)}</group>}
  </group>;
}

function SceneObject({ object, selected, onSelect }: { object: AquariumObject; selected: boolean; onSelect: () => void }) {
  const props = { object, selected, onSelect }; if (object.kind === 'fish') return <FishModel {...props} />; if (object.kind === 'plant') return <PlantModel {...props} />; return <RockModel {...props} />;
}

function World(props: Props) {
  const controls = useRef<any>(null); const { x, y, z } = worldDimensions(props.config); const minDistance = Math.max(x, y, z) * .58 + .45; const gridSize = Math.max(x, z); const divisions = Math.max(4, Math.round(Math.max(props.config.dimensions.length, props.config.dimensions.width) / 10));
  return <><color attach="background" args={['#041722']} /><fog attach="fog" args={['#041722', 14, 40]} /><ambientLight intensity={.9} color="#caffff" /><directionalLight position={[5, 9, 6]} intensity={2.1} castShadow /><pointLight position={[-4, y + 2, 2]} color="#22ddcf" intensity={5} distance={15} />
    <GlassTank config={props.config} /><gridHelper args={[gridSize, divisions, '#5ae5d7', '#174c55']} position={[0, .155, 0]} />
    {props.objects.map((object) => <SceneObject key={object.id} object={object} selected={object.id === props.selectedId} onSelect={() => props.onSelect(object.id)} />)}
    <Sparkles count={Math.min(80, Math.round(x * y * z * 1.5))} scale={[x * .85, y * .75, z * .8]} position={[0, y * .48, 0]} size={1.1} speed={.2} opacity={.32} color="#c5fffa" /><Environment preset="city" />
    <OrbitControls ref={controls} makeDefault enablePan enableZoom enableRotate minDistance={minDistance} maxDistance={Math.max(x, y, z) * 5 + 6} maxPolarAngle={Math.PI * .92} target={[0, y / 2, 0]} />
    <CameraController config={props.config} view={props.view} viewToken={props.viewToken} controls={controls} />
  </>;
}

export function CustomTankScene(props: Props) {
  const key = useMemo(() => `${props.config.style}-${props.config.waterType}`, [props.config.style, props.config.waterType]);
  return <Canvas key={key} shadows dpr={[1, 1.6]} camera={{ position: [9, 6, 9], fov: 45, near: .08, far: 100 }} gl={{ antialias: true, powerPreference: 'high-performance' }} onPointerMissed={() => props.onSelect(null)}><Suspense fallback={null}><World {...props} /></Suspense></Canvas>;
}
