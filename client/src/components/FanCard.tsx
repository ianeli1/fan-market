import type { Fan } from "../types";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";

type FanCardProps = {
  fan: Fan;
};

export default function FanCard({ fan }: FanCardProps) {
  const { addToCart } = useCart();
  const inStock = fan.stock > 0;

  return (
    <article className="card">
      <div className="card-art">
        <img className="card-photo" src={fan.image} alt={fan.name} />
        <span className="card-art-size">{fan.size}mm</span>
      </div>

      <div className="card-body">
        <p className="card-brand">{fan.brand}</p>
        <h3 className="card-name">{fan.name}</h3>
        <p className="card-description">{fan.description}</p>

        <ul className="card-specs">
          <li>{fan.airflow} CFM airflow</li>
          <li>{fan.noise} dBA noise</li>
          <li>{fan.rgb ? "RGB lighting" : "No lighting"}</li>
        </ul>

        <div className="card-footer">
          <span className="card-price">{formatPrice(fan.price)}</span>
          {inStock ? (
            <span className="stock-ok">{fan.stock} in stock</span>
          ) : (
            <span className="stock-out">Out of stock</span>
          )}
        </div>

        <button className="button" onClick={() => addToCart(fan)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
