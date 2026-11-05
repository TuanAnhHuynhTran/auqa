import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AquariumObject } from '../../types/aquarium';

interface Props { object: AquariumObject; selected?: boolean; onSelect?: () => void; ambient?: boolean }

export function FishModel({ object, selected, onSelect, ambient }: Props) {
  const ref = useRef<Group>(null);
  const phase = useRef(Math.random() * Math.PI * 2);
  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    ref.current.position.y = object.position.y + Math.sin(clock.elapsedTime * 1.25 + phase.current) * .14;
    ref.current.rotation.y += Math.sin(clock.elapsedTime * .8 + phase.current) * delta * .08;
    const tail = ref.current.getObjectByName('tail');
    if (tail) tail.rotation.y = Math.sin(clock.elapsedTime * 7 + phase.current) * .32;
  });
  return (
    <group ref={ref} position={[object.position.x, object.position.y, object.position.z]} scale={object.scale} onClick={(e) => { e.stopPropagation(); onSelect?.(); }}>
      <mesh castShadow scale={[1.15, .62, .45]}>
        <sphereGeometry args={[.62, 24, 16]} />
        <meshStandardMaterial color={object.color} roughness={.35} metalness={.05} emissive={object.color} emissiveIntensity={ambient ? .08 : .16} />
      </mesh>
      <mesh name="tail" position={[-.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[.48, .68, 3]} />
        <meshStandardMaterial color={object.color} transparent opacity={.9} side={2} />
      </mesh>
      <mesh position={[.38, .18, .4]}><sphereGeometry args={[.065, 10, 10]} /><meshStandardMaterial color="#07131c" /></mesh>
      <mesh position={[.38, .18, -.4]}><sphereGeometry args={[.065, 10, 10]} /><meshStandardMaterial color="#07131c" /></mesh>
      <mesh position={[0, .48, 0]} rotation={[0, 0, -.2]}><coneGeometry args={[.18, .48, 3]} /><meshStandardMaterial color={object.color} side={2} /></mesh>
      {selected && <mesh scale={[1.5, .95, .75]}><sphereGeometry args={[.64, 24, 16]} /><meshBasicMaterial color="#65fff0" wireframe transparent opacity={.65} /></mesh>}
    </group>
  );
}
