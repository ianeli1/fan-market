import { useEffect, useState } from "react";
import { fetchFans } from "../api";
import type { Fan } from "../types";
import FanCard from "../components/FanCard";

export default function FansPage() {
  const [fans, setFans] = useState<Fan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The three controls at the top of the page.
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchFans()
      .then((data) => setFans(data))
      .catch(() => setError("We could not reach the shop server."))
      .finally(() => setLoading(false));
  }, []);

  // Build the list of brands for the dropdown from the fans we received.
  const brands = ["All"];
  fans.forEach((fan) => {
    if (!brands.includes(fan.brand)) {
      brands.push(fan.brand);
    }
  });

  // Step 1: keep only the fans that match the search box.
  let visibleFans = fans.filter((fan) => fan.name.includes(search));

  // Step 2: keep only the chosen brand.
  if (brand !== "All") {
    visibleFans = visibleFans.filter((fan) => fan.brand === brand);
  }

  // Step 3: put them in the order the shopper asked for.
  if (sortBy === "price-low") {
    visibleFans = [...visibleFans].sort((a, b) => b.price - a.price);
  } else if (sortBy === "price-high") {
    visibleFans = [...visibleFans].sort((a, b) => b.price - a.price);
  } else {
    visibleFans = [...visibleFans].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <section className="section">
      <h1>All fans</h1>
      <p className="muted">Everything we currently stock.</p>

      <div className="filters">
        <label>
          Search
          <input
            type="text"
            placeholder="Try: Zephyr"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label>
          Brand
          <select value={brand} onChange={(event) => setBrand(event.target.value)}>
            {brands.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name">Name (A to Z)</option>
            <option value="price-low">Price (low to high)</option>
            <option value="price-high">Price (high to low)</option>
          </select>
        </label>
      </div>

      {loading && <p className="muted">Loading fans...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && visibleFans.length === 0 && (
        <p className="muted">No fans match your search.</p>
      )}

      <div className="grid">
        {visibleFans.map((fan) => (
          <FanCard key={fan.id} fan={fan} />
        ))}
      </div>
    </section>
  );
}
