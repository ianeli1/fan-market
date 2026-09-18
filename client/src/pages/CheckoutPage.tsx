import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// We only ship inside Costa Rica, so these are the only provinces we accept.
const PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

export default function CheckoutPage() {
  const { cart } = useCart();

  // Shipping address.
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Payment.
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Whether the "to be implemented" popup is open.
  const [showDialog, setShowDialog] = useState(false);

  function handlePay(event: FormEvent) {
    // Stop the browser from reloading the page when the form is submitted.
    event.preventDefault();

    // Nothing is checked and nothing is charged yet.
    setShowDialog(true);
  }

  if (cart.length === 0) {
    return (
      <section className="section">
        <h1>Checkout</h1>
        <p className="muted">There is nothing in your cart to pay for.</p>
        <Link to="/fans" className="button button-large">
          Go pick some fans
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <h1>Checkout</h1>
      <p className="muted">
        <Link to="/cart" className="link-button">
          Back to cart
        </Link>
      </p>

      <form className="checkout" onSubmit={handlePay}>
        <div className="checkout-main">
          <fieldset className="panel">
            <legend>Shipping address</legend>
            <p className="muted small">We only ship within Costa Rica.</p>

            <label className="field">
              Full name
              <input
                type="text"
                placeholder="María Rodríguez Solís"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>

            <label className="field">
              Address
              <textarea
                rows={3}
                placeholder="500m del palo de mango, casa verde con portón negro"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>

            <div className="field-row">
              <label className="field">
                Province
                <select
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                >
                  <option value="">Choose a province</option>
                  {PROVINCES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                Postal code (código postal)
                <input
                  type="text"
                  placeholder="10101"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </label>
            </div>

            <label className="field">
              Country
              <input type="text" value="Costa Rica" disabled />
            </label>
          </fieldset>

          <fieldset className="panel">
            <legend>Payment</legend>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                Credit card
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                PayPal
              </label>
            </div>

            {paymentMethod === "card" && (
              <>
                <label className="field">
                  Name on card
                  <input
                    type="text"
                    placeholder="MARIA RODRIGUEZ"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                  />
                </label>

                <label className="field">
                  Card number
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                  />
                </label>

                <div className="field-row">
                  <label className="field">
                    Expiry date
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(event) => setCardExpiry(event.target.value)}
                    />
                  </label>

                  <label className="field">
                    CVV
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(event) => setCardCvv(event.target.value)}
                    />
                  </label>
                </div>
              </>
            )}

            {paymentMethod === "paypal" && (
              <>
                <p className="muted small">
                  You will be sent to PayPal to finish paying.
                </p>
                <a
                  className="button paypal-button"
                  href="https://www.paypal.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Continue to PayPal
                </a>
              </>
            )}
          </fieldset>
        </div>

        <aside className="summary">
          <h2 className="summary-heading">Your order</h2>
          <ul className="checkout-items">
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span className="muted">x {item.quantity}</span>
              </li>
            ))}
          </ul>

          <button type="submit" className="button button-large">
            Pay
          </button>
        </aside>
      </form>

      {showDialog && (
        <div className="dialog-backdrop" onClick={() => setShowDialog(false)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>TO BE IMPLEMENTED</h2>
            <button
              className="button button-large"
              onClick={() => setShowDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
