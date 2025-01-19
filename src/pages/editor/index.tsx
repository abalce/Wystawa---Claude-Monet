import {
  Box,
  Html,
  KeyboardControls,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Img, Room } from "../../components/scene";
import Ecctrl from "ecctrl";
import { useStore } from "../../lib/store";
import clsx from "clsx";
import { useRef } from "react";
import * as THREE from "three";

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

const debounce = (func: any, wait: number) => {
  let timeout: any;
  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export function Editor() {
  const store = useStore();
  const exportJson = () => {
    const data = store.frames;
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const { mode, selected } = store;
  const refMap = useRef(new Map<string, any>()).current;

  return (
      <div className="grid relative h-screen grid-cols-[20vw_1fr]">
        {store.selected && (
            <div className="absolute flex gap-2 top z-50 right-[50%]">
              <button
                  onClick={() => store.setMode("translate")}
                  className="z-50 py-2 px-4 bg-white rounded rounded-t-none rounded-b-lg"
              >
                Translate
              </button>
              <button
                  onClick={() => store.setMode("rotate")}
                  className="z-50 py-2 px-4 bg-white rounded rounded-t-none rounded-b-lg"
              >
                Rotate
              </button>
              <button
                  onClick={() => store.setMode("scale")}
                  className="z-50 py-2 px-4 bg-white rounded rounded-t-none rounded-b-lg"
              >
                Scale
              </button>
            </div>
        )}

        <button
            onClick={() => {
              store.frames.forEach((v) => {
                store.removeFrame(v.uuid);
              });
            }}
            className="absolute top-4 right-40 z-50 py-2 px-4 bg-white rounded"
        >
          delete all
        </button>

        <button
            onClick={exportJson}
            className="absolute top-4 right-4 z-50 py-2 px-4 bg-white rounded"
        >
          Export
        </button>
        <div className="h-full bg-black">
          <div className="overflow-auto h-screen">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                  (i) => (
                      <div
                          onClick={() => {
                            store.setSelected(undefined);
                            store.selectImage(
                                store.selectedImage === `${i}.jpg`
                                    ? undefined
                                    : `${i}.jpg`
                            );
                          }}
                          key={i}
                          className={clsx("grid p-4  bg-white bg-opacity-15", {
                            "border border-yellow-100":
                                store.selectedImage === `${i}.jpg`,
                          })}
                      >
                        <img
                            src={`/${i}.jpg`}
                            className="object-scale-down w-full h-full"
                        />
                      </div>
                  )
              )}
            </div>
          </div>
        </div>
        <Canvas style={{ backgroundColor: "#555555" }} className="w-full h-full">
          <OrbitControls />

          <pointLight position={[0, 20, 10]} intensity={1.5} />
          {store.frames.map((v) => {
            return (
                <TransformControls
                    mode={mode}
                    ref={(r) => r && refMap.set(v.uuid, r)}
                    onClick={() => {
                      store.setSelected(v.uuid);
                      store.selectImage(undefined);
                    }}
                    onObjectChange={(e) => {
                      const transformControl = refMap.get(v.uuid);
                      if (!transformControl) return;

                      const { position, rotation, scale } = transformControl.object;

                      // Normalize rotation to avoid gimbal lock issues
                      const quaternion = transformControl.object.quaternion;
                      const normalizedRotation = new THREE.Euler().setFromQuaternion(
                          quaternion
                      );

                      debounce(() => {
                        store.updateFrame({
                          ...v,
                          position: position.toArray(),
                          rotation: [
                            normalizedRotation.x,
                            normalizedRotation.y,
                            normalizedRotation.z,
                          ],
                          scale: scale.toArray(),
                        });
                      }, 1000)();
                    }}
                    showX={v.uuid === selected}
                    showY={v.uuid === selected}
                    showZ={v.uuid === selected}
                    key={v.uuid}
                    position={v.position}
                    rotation={v.rotation}
                    scale={v?.scale ?? [1, 1, 1]}
                    enabled={selected === v.uuid}
                >
                  {selected === v.uuid && (
                      <Html position={[0, -5, 0]} className="flex gap-3 w-fit">
                        <button
                            className="py-2 px-4 bg-white rounded-lg"
                            onClick={() => {
                              store.removeFrame(v.uuid);
                            }}
                        >
                          Delete
                        </button>
                        <button
                            className="py-2 px-4 bg-white rounded-lg"
                            onClick={() => {
                              store.setSelected(undefined);
                            }}
                        >
                          Close
                        </button>
                      </Html>
                  )}
                  <Box args={[4, 4, 0.2]}>
                    <Img src={v.img} />
                  </Box>
                </TransformControls>
            );
          })}
          <Physics>
            <RigidBody type="fixed" colliders="trimesh">
              <Room editor />
            </RigidBody>

            <KeyboardControls map={keyboardMap}>
              <Ecctrl
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
              </Ecctrl>
            </KeyboardControls>
            <ambientLight />
          </Physics>
        </Canvas>
      </div>
  );
}
