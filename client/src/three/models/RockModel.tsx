import type { AquariumObject } from '../../types/aquarium';

export function RockModel({ object, selected, onSelect }: { object: AquariumObject; selected?: boolean; onSelect?: () => void }) {
  return <group position={[object.position.x, object.position.y, object.position.z]} scale={object.scale} onClick={(e) => { e.stopPropagation(); onSelect?.(); }}>
    <mesh castShadow rotation={[.1, .15, -.06]} scale={[1.1, .75, .85]}>
      <dodecahedronGeometry args={[.72, 0]} />
      <meshStandardMaterial color={selected ? '#72eedb' : object.color} roughness={.92} flatShading />
    </mesh>
  </group>;
}
