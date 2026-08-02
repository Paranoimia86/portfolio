import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import "./Checkout.css";

const deliveryOptions = [
  { id: "courier", labelKey: "deliveryCourier", price: 4.9 },
  { id: "pickup", labelKey: "deliveryPickup", price: 2.5 },
  { id: "express", labelKey: "deliveryExpress", price: 7.9 },
];

const paymentOptions = [
  { id: "card", labelKey: "paymentCard" },
  { id: "cod", labelKey: "paymentCod" },
  { id: "bank", labelKey: "paymentBank" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryOptions[0].id);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0].id);

  const user = useMemo(() => {
    const rawUser = localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  }, []);

  const loadCart = async () => {
    const data = await apiGet("/cart");
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    (async () => {
      await loadCart();
    })();
  }, [navigate]);

  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.quantity),
    0,
  );
  const selectedDelivery =
    deliveryOptions.find((option) => option.id === deliveryMethod) ||
    deliveryOptions[0];
  const total = subtotal + selectedDelivery.price;

  const submitOrder = async () => {
    setError("");
    try {
      setSubmitting(true);
      const result = await apiPost("/orders", {
        delivery_method: deliveryMethod,
        payment_method: paymentMethod,
      });

      if (result?.success) {
        navigate("/order-success", {
          replace: true,
          state: { order: result.order },
        });
        return;
      }

      setError(result?.message || "Objednávku sa nepodarilo vytvoriť.");
    } catch (err) {
      setError(err.message || "Objednávku sa nepodarilo vytvoriť.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>{t("loadingCheckout")}</div>;

  return (
    <section>
      <div className="checkout-header">
        <h1>{t("paymentAndDelivery")}</h1>
        <button
          type="button"
          className="checkout-back-btn"
          onClick={() => navigate("/cart")}
        >
          ← {t("backToCart")}
        </button>
      </div>

      {items.length === 0 ? (
        <div>
          <p>
            {language === "sk"
              ? "Košík je prázdny, nie je čo objednať."
              : "Your cart is empty, there is nothing to order."}
          </p>
          <button type="button" onClick={() => navigate("/categories")}>
            {t("continueShopping")}
          </button>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-left">
            <div className="order-items">
              <h3>{t("orderItems")}</h3>
              <ul className="order-items-list">
                {items.map((item) => (
                  <li key={item.id} className="order-item-row">
                    {item.main_image ? (
                      <img
                        src={`http://localhost:5000${item.main_image}`}
                        alt={item.name}
                        className="order-item-image"
                      />
                    ) : (
                      <div className="order-item-image-placeholder" />
                    )}
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">× {item.quantity}</span>
                    <span className="order-item-price">
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <h2>{t("deliveryMethod")}</h2>
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                style={{ display: "block", marginBottom: 8 }}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={deliveryMethod === option.id}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />{" "}
                {t(
                  option.id === "courier"
                    ? "deliveryCourier"
                    : option.id === "pickup"
                      ? "deliveryPickup"
                      : "deliveryExpress",
                )}{" "}
                — {formatPrice(option.price)}
              </label>
            ))}

            <h2>{t("paymentMethod")}</h2>
            {paymentOptions.map((option) => (
              <label
                key={option.id}
                style={{ display: "block", marginBottom: 8 }}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                {t(option.labelKey)}
              </label>
            ))}
          </div>

          <aside className="checkout-right">
            <div className="checkout-summary">
              <div className="shipping-summary">
                <h2>{t("shippingSummary")}</h2>
                {error && <p style={{ color: "crimson" }}>{error}</p>}
                <p>
                  <strong>Meno:</strong> {user?.name} {user?.surname}
                </p>
                <p>
                  <strong>Adresa:</strong> {user?.street || "-"},{" "}
                  {user?.postal_code || "-"} {user?.city || ""}
                </p>
                <p>
                  <strong>Telefón:</strong> {user?.phone || "-"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "-"}
                </p>
              </div>
              <div className="checkout-order-summary">
                <p>
                  <strong>{t("subtotal")}:</strong> {formatPrice(subtotal)}
                </p>
                <p>
                  <strong>{t("shipping")}:</strong>{" "}
                  {formatPrice(selectedDelivery.price)}
                </p>
                <p>
                  <strong>{t("total")}:</strong> {formatPrice(total)}
                </p>
              </div>
            </div>
            <button type="button" onClick={submitOrder} disabled={submitting}>
              {submitting ? t("creatingOrder") : t("placeOrder")}
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
