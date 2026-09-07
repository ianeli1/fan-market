// The shape of one fan. This matches what the Express server sends back.
export type Fan = {
  id: number;
  name: string;
  brand: string;
  size: number;
  price: number;
  stock: number;
  rgb: boolean;
  airflow: number;
  noise: number;
  description: string;
  image: string;
};

// A fan that is sitting in the shopping cart, plus how many of them.
export type CartItem = Fan & {
  quantity: number;
};
