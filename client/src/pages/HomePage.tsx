import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFans } from "../api";
import type { Fan } from "../types";
import FanCard from "../components/FanCard";

export default function HomePage() {
  const [fans, setFans] = useState<Fan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load the fans once, when the page first appears.
  useEffect(() => {
    fetchFans()
      .then((data) => setFans(data))
      .catch(() => setError("We could not reach the shop server."))
      .finally(() => setLoading(false));
  }, []);

  const featured = fans.slice(0, 4);

  return (
    <>
      <section className="hero">
        <h1>Keep your build cool.</h1>
        <p>
          Hand picked case fans for quiet desks, cramped cases and very shiny
          gaming rigs. Free shipping on orders over $50.
        </p>
        <Link to="/fans" className="button button-large">
          Browse all fans
        </Link>

        <img
          className="hero-image"
          src="/images/hero-fans.jpg"
          alt="A batch of 120mm case fans laid out on a desk"
        />
      </section>

      <section className="section">
        <h2>Our top 3 best sellers</h2>

        {loading && <p className="muted">Loading fans...</p>}
        {error && <p className="error">{error}</p>}

        <div className="grid">
          {featured.map((fan) => (
            <FanCard key={fan.id} fan={fan} />
          ))}
        </div>
      </section>

      <section className="section promises">
        <div>
          <h3>Two year warranty</h3>
          <p>Every fan we sell is covered for 24 months.</p>
        </div>
        <div>
          <h3>Ships in 24 hours</h3>
          <p>Order before 4pm and it leaves the warehouse the same day.</p>
        </div>
        <div>
          <h3>Real humans</h3>
          <p>Not sure which size you need? Just ask us.</p>
        </div>
      </section>
    </>
  );
}
