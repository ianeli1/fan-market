import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FansPage from "./pages/FansPage";
import CartPage from "./pages/CartPage";

// This component decides which page to show based on the URL.
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fans" element={<FansPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Fan Market - a practice project. Nothing here is really for sale.</p>
      </footer>
    </div>
  );
}
