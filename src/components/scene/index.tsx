import * as THREE from "three";
import {
  Box,
  Html,
  TransformControls,
  TransformControlsProps,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { useStore } from "../../lib/store";

// Komponent Img - ładuje teksturę z podanego źródła i aplikuje ją jako materiał
export const Img = (props: { src: string }) => {
  const colorMap = useLoader(THREE.TextureLoader, props.src); // Ładowanie tekstury
  return <meshStandardMaterial side={THREE.DoubleSide} map={colorMap} />;
};

// Typ danych dla GLTF, definiuje strukturę wczytanego modelu
type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube002_3: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
  };
  materials: {
    roof: THREE.MeshStandardMaterial;
    wall: THREE.MeshStandardMaterial;
    floor: THREE.MeshStandardMaterial;
  };
};

// Komponent Room - renderuje pokój na scenie 3D
export function Room(
  props: JSX.IntrinsicElements["group"] & { editor?: boolean }
) {
  // Wczytanie modelu 3D za pomocą useGLTF
  const { nodes, materials } = useGLTF(
    "/simple_room_solidify_0.17.glb"
  ) as GLTFResult;

  const circleRef = useRef<THREE.Mesh>(null); // Referencja do okręgu
  const store = useStore(); // Globalny stan aplikacji
  const [mode, setMode] = useState<TransformControlsProps["mode"]>("translate"); // Tryb transformacji
  const [selected, setSelected] = useState<string | undefined | null>(null); // Wybrany element

  return (
    <>
      {/* Wyświetlenie ramki z wybraną teksturą */}
      {store.selectedImage && (
        <Box args={[4, 4, 0.2]} ref={circleRef}>
          <Img src={store.selectedImage} />
        </Box>
      )}

      <group
        {...props}
        // Obsługa ruchu kursora - aktualizacja pozycji obiektu
        onPointerMove={({ intersections }) => {
          const point = intersections?.at(0)?.point;
          if (!point || !circleRef.current) return;

          circleRef.current.position.set(point.x, point.y, point.z);
          circleRef.current.lookAt(0, point.y, 0); // Ustawienie kierunku obiektu
        }}
        // Obsługa kliknięcia - dodanie nowej ramki z obrazem
        onClick={(e) => {
          e.stopPropagation();
          if (!store.selectedImage || !circleRef.current) return;

          const uuid = new THREE.Object3D().uuid; // Generowanie unikalnego ID
          const position = circleRef.current.position.toArray();
          const rotation = circleRef.current.rotation.toArray();

          store.selectImage(undefined); // Odznaczenie obrazu
          store.addFrame({
            uuid,
            position,
            rotation: [...rotation],
            img: store.selectedImage,
          });
        }}
        castShadow
        scale={2}
        dispose={null}
        position={[2, 1.5, 2]}
      >
        {/* Główna struktura pokoju */}
        <group position={[0, 1.5, 0]} scale={[1, 1, 1.2]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.roof}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials.wall}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_3.geometry}
            material={materials.floor}
          />
        </group>

        {/* Druga sekcja pokoju */}
        <group
          position={[9, 1.5, -3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 1.2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.roof}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={materials.wall}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_3.geometry}
            material={materials.floor}
          />
        </group>

        {/* Trzecia sekcja pokoju */}
        <group
          position={[9, 1.5, 3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 1.2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials.roof}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials.wall}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials.floor}
          />
        </group>
      </group>
    </>
  );
}

// Wczytanie modelu do pamięci podręcznej
useGLTF.preload("/simple_room_solidify_0.17.glb");
