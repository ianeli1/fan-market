// This is our "database". In a real shop this data would live in a real
// database, but a plain array is much easier to read while we are learning.

export type Fan = {
  id: number;
  name: string;
  brand: string;
  size: number; // millimetres, e.g. 120 for a 120mm fan
  price: number; // in US dollars
  stock: number; // how many we have in the warehouse
  rgb: boolean; // does it have colourful lights?
  airflow: number; // CFM - cubic feet per minute
  noise: number; // dBA - how loud it is
  description: string;
  image: string; // path to the photo in client/public/images
};

export const fans: Fan[] = [
  {
    id: 1,
    name: "Zephyr 120 Silent",
    brand: "Zephyr",
    size: 120,
    price: 19.99,
    stock: 42,
    rgb: false,
    airflow: 52,
    noise: 22,
    description: "A quiet everyday 120mm fan. Great for a first build.",
    image: "/images/zephyr-120-silent.jpg",
  },
  {
    id: 2,
    name: "Tornado Static 120",
    brand: "Tornado",
    size: 120,
    price: 27.5,
    stock: 12,
    rgb: false,
    airflow: 68,
    noise: 31,
    description: "High static pressure, made for pushing air through radiators.",
    image: "/images/tornado-static-120.jpg",
  },
  {
    id: 2,
    name: "Tornado Static 140",
    brand: "Tornado",
    size: 140,
    price: 32.5,
    stock: 9,
    rgb: false,
    airflow: 79,
    noise: 33,
    description: "The bigger brother of the Static 120. Moves a lot of air.",
    image: "/images/tornado-static-140.jpg",
  },
  {
    id: 3,
    name: "Vortex RGB 140 Pro",
    brand: "Vortex",
    size: 140,
    price: 34.99,
    stock: 0,
    rgb: true,
    airflow: 71,
    noise: 28,
    description: "Sixteen addressable LEDs. Currently sold out everywhere.",
    image: "/images/vortex-rgb-140-pro.jpg",
  },
  {
    id: 4,
    name: "Vortex RGB 120",
    brand: "Vortex",
    size: 120,
    price: 29.99,
    stock: 18,
    rgb: true,
    airflow: 58,
    noise: 26,
    description: "Rainbow lights without the rainbow price tag.",
    image: "/images/vortex-rgb-120.jpg",
  },
  {
    id: 5,
    name: "Zephyr 140 Silent",
    brand: "Zephyr",
    size: 140,
    price: 24.99,
    stock: 30,
    rgb: false,
    airflow: 63,
    noise: 24,
    description: "Same quiet motor as the 120, but with more surface area.",
    image: "/images/zephyr-140-silent.jpg",
  },
  {
    id: 6,
    name: "Gale Force 200",
    brand: "Gale",
    size: 200,
    price: 44.99,
    stock: 7,
    rgb: false,
    airflow: 110,
    noise: 30,
    description: "A huge 200mm side-panel fan. Slow spinning, very effective.",
    image: "/images/gale-force-200.jpg",
  },
  {
    id: 7,
    name: "Whisper Slim 92",
    brand: "Whisper",
    size: 92,
    price: 14.99,
    stock: 55,
    rgb: false,
    airflow: 38,
    noise: 19,
    description: "Only 15mm thick, for cases where nothing else fits.",
    image: "/images/whisper-slim-92.jpg",
  },
];
