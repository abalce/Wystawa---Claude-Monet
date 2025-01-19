import {create} from "zustand";
import {persist} from "zustand/middleware";

type Frame = {
  img: string;
  rotation?: [number, number, number, string];
  position?: [number, number, number];
  scale?: [number, number, number];
  uuid: string;
};
type Store = {
  selected?: string;
  setSelected: (uuid?: string) => void;
  mode?: "rotate" | "translate" | "scale";
  setMode: (mode: "rotate" | "translate" | "scale") => void;
  frames: Frame[];
  addFrame: (frame: Frame) => void;
  removeFrame: (uuid: string) => void;
  updateFrame: (frame: Frame) => void;
  selectImage: (img?: string) => void;
  selectedImage?: string;
};

let defaultFrames: Frame[];
// eslint-disable-next-line prefer-const
defaultFrames = [
    {
        "uuid": "41287e7a-48c7-44ad-9cec-f5f9297dacc1",
        "position": [-4, 4.3603414372098435, -5.756363016849843],
        "rotation": [0, 1.558832092556501, 0],
        "img": "10.jpg",
        "scale": [1.1024143009857794, 1.2750646962514272, 1]
    }, {
        "uuid": "f137a25a-2eac-4e9d-be09-2c38f111705d",
        "position": [4.931543758515504, 4.348394040734392, 14],
        "rotation": [0, 0, 0],
        "img": "18.jpg",
        "scale": [1, 1, 1]
    }, {
        "uuid": "b850f3d6-340f-44a8-a7c4-df4acd410804",
        "position": [32, 4.167057530495248, -3.8469060727970614],
        "rotation": [0, -1.565195066172668, 0],
        "img": "12.jpg",
        "scale": [1.6674205209108126, 1.0540283957703402, 1]
    }, {
        "uuid": "00c266a7-06d0-47cf-8768-374c8d069ec5",
        "position": [26.85504936077702, 4.083604051556701, 1.8897481795091644],
        "rotation": [0, 0, 0],
        "img": "15.jpg",
        "scale": [1.628935846144981, 1, 1]
    }, {
        "uuid": "f4dd35b3-03ac-417e-8176-8eeccc2d9874",
        "position": [32, 4.246278912678738, 7.825188351123524],
        "rotation": [-3.141592653589793, 1.5598475670539131, -3.1407916098473945],
        "img": "13.jpg",
        "scale": [1.9280762927047301, 1, 1]
    }, {
        "uuid": "35ea3dbb-17ca-4a31-85a8-b5a9558b8832",
        "position": [23.671967410953517, 4.604003384389689, 14],
        "rotation": [0, 0, 0],
        "img": "17.jpg",
        "scale": [2.499985389625229, 1.1350117793340935, 1]
    }, {
        "uuid": "921be610-38b2-42ba-9965-e926eae633e9",
        "position": [-4, 4.1847132049566484, 4.707746269682946],
        "rotation": [-3.141592653589793, 1.5689042176536334, -3.141592653589793],
        "img": "16.jpg",
        "scale": [2.71421989883755, 1.1143654643211038, 1]
    }, {
        "uuid": "b5d59600-3aeb-4c18-b4bd-7de2e6a41889",
        "position": [26.061167850856357, 3.919875913388566, 2.119263361038074],
        "rotation": [0, 0, 0],
        "img": "8.jpg",
        "scale": [1.6088654618005878, 1, 1]
    }, {
        "uuid": "01fad75b-a7d2-465c-8ab4-92229e742e31",
        "position": [14.253232694525467, 3.931523070706415, 2.115647026836398],
        "rotation": [0, 0, 0],
        "img": "9.jpg",
        "scale": [1.4457459542283826, 1, 1]
    }, {
        "uuid": "28023f68-bb8e-4638-bf6c-9c6f3812764b",
        "position": [12.168859901755104, 4.565140020563854, 13.999999999999996],
        "rotation": [0, 0, 0],
        "img": "1.jpg",
        "scale": [1.5046128798995042, 1, 1]
    }, {
        "uuid": "f14fe14a-db7e-49b0-82f9-f21b21be9dba",
        "position": [1.8474131818350696, 4.106759658581794, -10],
        "rotation": [0, 0, 0],
        "img": "2.jpg",
        "scale": [2.3929387825742703, 1, 1]
    }, {
        "uuid": "afb990ec-0dae-4218-9524-d7def92bd63a",
        "position": [19.182910689563407, 4.121643508233485, 1.8922156834151254],
        "rotation": [0, 0, 0],
        "img": "3.jpg",
        "scale": [1.0831430953723122, 1, 1]
    }, {
        "uuid": "ff3b5270-33b2-4a40-af62-82673a282f3a",
        "position": [7.842184018038246, 3.9444655449572257, 1.8857723191191493],
        "rotation": [3.141592653589793, -1.563501262973705, 3.141592653589793],
        "img": "14.jpg",
        "scale": [0.9781554427244972, 0.7038708656949227, 1]
    }, {
        "uuid": "9332d0a9-bbb1-4583-8bc2-fe0f63d3f93d",
        "position": [12.447190405341743, 4.053920219691696, 1.8128627998443085],
        "rotation": [0, 0, 0],
        "img": "4.jpg",
        "scale": [1.2569478436463606, 1, 1]
    }, {
        "uuid": "78c37fd6-da76-4d51-9261-1c0e2d1f7bc8",
        "position": [11.581249380561106, 4.059970439213425, -10.000000000000002],
        "rotation": [0, 0, 0],
        "img": "5.jpg",
        "scale": [1.3563109885260884, 1, 1]
    }, {
        "uuid": "2811f744-4e58-4e1e-b694-0761c774691c",
        "position": [19.87786828937069, 4.030046416544643, -10],
        "rotation": [0, 0, 0],
        "img": "7.jpg",
        "scale": [2.154200237590436, 1, 1]
    }, {
        "uuid": "b25a280d-1c94-44a3-ab92-e3f8b3779b82",
        "position": [28.17219858202257, 3.7389308342528844, -10],
        "rotation": [0, 0, 0],
        "img": "11.jpg",
        "scale": [0.8523638809755356, 0.5337461584505085, 1]
    }, {
        "uuid": "df387b0e-e844-402f-8094-0321f2e5f9f7",
        "position": [-0.3985363695229507, 4.38124506524423, 14],
        "rotation": [0, 0, 0],
        "img": "20.jpg",
        "scale": [1, 1.2525400326507667, 1]
    }
] as Frame[];
// Create your store, which includes both state and (optionally) actions
export const useStore = create(
  persist<Store>(
    (set) => ({
      selected: undefined,
      setSelected: (uuid) => set({ selected: uuid }),
      mode: "translate",
      setMode: (mode) => set({ mode }),
      selectedImage: undefined,
      selectImage: (img) => set({ selectedImage: img }),
      frames: defaultFrames,
      addFrame: (frame) =>
        set((state) => ({ frames: [...state.frames, frame] })),
      removeFrame: (uuid) =>
        set((state) => ({
          frames: state.frames.filter((frame) => frame.uuid !== uuid),
        })),
      updateFrame: (frame) =>
        set((state) => ({
          frames: state.frames.map((f) => (f.uuid === frame.uuid ? frame : f)),
        })),
    }),
    {
      name: "3d-art-galery",
    },
  ),
);


