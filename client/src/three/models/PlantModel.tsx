import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AquariumObject } from '../../types/aquarium';

export function PlantModel({ object, selected, onSelect }: { object: AquariumObject; selected?: boolean; onSelect?: () => void }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * .8 + object.position.x) * .025; });
  const leaves = [-.42, -.2, 0, .22, .44];
  return (
    <group ref={ref} position={[object.position.x, object.position.y, object.position.z]} scale={object.scale} onClick={(e) => { e.stopPropagation(); onSelect?.(); }}>
      {leaves.map((x, i) => <mesh key={x} position={[x, .55 + (i % 2) * .18, 0]} rotation={[0, 0, x * .55]}>
        <capsuleGeometry args={[.13 + i * .012, .75 + (i % 3) * .2, 5, 10]} />
        <meshStandardMaterial color={i % 2 ? object.color : '#168557'} roughness={.75} />
      </mesh>)}
      <mesh position={[0, .05, 0]} scale={[.7, .18, .55]}><sphereGeometry args={[.42, 12, 8]} /><meshStandardMaterial color="#3d4b3c" /></mesh>
      {selected && <pointLight color="#64ffda" intensity={2} distance={2.5} />}
    </group>
  );
}
