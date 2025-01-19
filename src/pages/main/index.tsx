import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Box, KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctr, { EcctrlJoystick } from "ecctrl";
import { useStore } from "../../lib/store";
import { Img, Room } from "../../components/scene";

const obrazyOpisy = {
  "1.jpg": "The Garden at Sainte-Adresse, 1967 by Claude Monet",
  "2.jpg": "Water Lilies, Green Harmony, 1914-1917 by Claude Monet",
  "3.jpg": "The Houses of Parliament, Sunset, 1904 by Claude Monet",
  "4.jpg": "The Cliffs at Etretat, 1885 by Claude Monet",
  "5.jpg": "The Bridge at Argenteuil, 1874 by Claude Monet",
  "6.jpg": "The Garden of Monet at Argenteuil, 1873 by Claude Monet",
  "7.jpg": "Le Bassin Aux Nymphéas, 1919 by Claude Monet",
  "8.jpg": "The Lunch, 1876-1877 by Claude Monet",
  "9.jpg": "Luncheon on the Grass, 1866-67 - by Claude Monet",
  "10.jpg": "Woman with a Parasol - Madame Monet and Her Son, 1875 by Claude Monet",
  "11.jpg": "Meditation, 1871 by Claude Monet",
  "12.jpg": "Impression Sunrise by Claude Monet",
  "13.jpg": "La Grenouillère, 1869 by Claude Monet",
  "14.jpg": "The Poppy Field near Argenteuil, 1873 by Claude Monet",
  "15.jpg": "The Magpie, 1868 by Claude Monet",
  "16.jpg": "Water Lilies Agapanthus, 1914-1917 by Claude Monet",
  "17.jpg": "Water Lilies, 1916 by Claude Monet",
  "18.jpg": "Water Lilies - Japanese Bridge, 1923 by Claude Monet",
  "19.jpg": "San Giorgio Maggiore at Dusk, 1908 by Claude Monet",
  "20.jpg": "Bouquet of Sunflowers, 1881 by Claude Monet",
};

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  { name: "action1", keys: ["1"] },
  { name: "action2", keys: ["2"] },
  { name: "action3", keys: ["3"] },
  { name: "action4", keys: ["KeyF"] },
];

const ArtModal = ({ selected, onClose }) => {
  if (!selected) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 flex flex-col gap-4">
          <div className="relative pt-[56.25%]">
            <img
                src={selected}
                alt={obrazyOpisy[selected]}
                className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xl font-medium text-gray-900">{obrazyOpisy[selected]}</p>
          </div>
          <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
  );
};

export function Main() {
  const store = useStore();
  const [selected, setSelected] = useState<string | undefined | null>(null);

  return (
      <div className="w-screen h-screen">
        {selected && (
            <ArtModal
                selected={selected}
                onClose={() => setSelected(null)}
            />
        )}

        <Canvas style={{ backgroundColor: "#555555" }} className="w-full h-full">
          <OrbitControls />
          {store.frames.map((v) => (
              <Box
                  key={v.uuid}
                  onClick={() => setSelected(v.img)}
                  position={v.position}
                  rotation={v.rotation}
                  scale={v.scale}
                  args={[4, 4, 0.2]}
              >
                <Img src={v.img} />
              </Box>
          ))}
          <pointLight position={[0, 20, 10]} intensity={1.5} />
          <Physics>
            <RigidBody type="fixed" colliders="trimesh">
              <Room />
            </RigidBody>

            <KeyboardControls map={keyboardMap}>
              <Ecctr
                  maxVelLimit={10}
                  camCollision={false}
                  camInitDis={-0.01}
                  camMinDis={-0.01}
                  camFollowMult={1000}
                  camLerpMult={1000}
                  turnVelMultiplier={1}
                  turnSpeed={100}
                  mode="CameraBasedMovement"
              >
                <pointLight position={[0, 2, 0]} intensity={50} color="#fff" />
              </Ecctr>
            </KeyboardControls>
            <ambientLight />
          </Physics>
        </Canvas>
        <div className="md:hidden">
          <EcctrlJoystick buttonNumber={0} />
        </div>
      </div>
  );
}

export default Main;