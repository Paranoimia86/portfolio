import { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import "./Cart.css";

const DESCRIPTION_MAX_LENGTH = 100;

function truncateText(text, maxLength = DESCRIPTION_MAX_LENGTH) {
  if (!text) return "";
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}…`
    : text;
}

export default function Cart() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/cart");
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const changeQty = async (id, qty) => {
    await apiPut(`/cart/${id}`, { quantity: qty });
    await load();
  };

  const remove = async (id) => {
    await apiDelete(`/cart/${id}`);
    await load();
  };

  const TAX_RATE = 0.2;

  const getUnitPrice = (it) => {
    const price = Number(it.price);
    const discountPrice = Number(it.discount_price);
    return it.discount_price != null && discountPrice < price
      ? discountPrice
      : price;
  };

  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.quantity),
    0,
  );
  const netTotal = items.reduce(
    (sum, it) => sum + getUnitPrice(it) * Number(it.quantity),
    0,
  );
  const discountTotal = subtotal - netTotal;
  const taxAmount = netTotal * TAX_RATE;
  const total = netTotal + taxAmount;

  if (loading) return <div>{t("loadingCart")}</div>;

  return (
    <section>
      <h1>{t("cartTitle")}</h1>
      {items.length === 0 ? (
        <div>
          <p>{t("cartEmpty")}</p>
          <Link to="/categories" className="cart-empty">
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          <ul className="cart-items-list">
            {items.map((it) => (
              <li key={it.id} className="cart-item">
                <div className="cart-item-details">
                  {it.main_image ? (
                    <img
                      src={`http://localhost:5000${it.main_image}`}
                      alt={it.name}
                      style={{ width: 80, height: 80, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{ width: 80, height: 80, background: "#eee" }}
                    />
                  )}
                  <div className="cart-item-info">
                    <h3>{it.name}</h3>
                    {it.description && (
                      <p
                        className="cart-item-description"
                        title={it.description}
                      >
                        {truncateText(it.description)}
                      </p>
                    )}
                    <button onClick={() => remove(it.id)}>{t("remove")}</button>
                  </div>
                </div>
                <div className="cart-item-price-qty">
                  {it.discount_price != null &&
                  Number(it.discount_price) < Number(it.price) ? (
                    <p className="cart-item-price">
                      <span className="cart-item-price-original">
                        {formatPrice(it.price)}
                      </span>
                      <span className="cart-item-price-discounted">
                        {formatPrice(it.discount_price)}
                      </span>
                    </p>
                  ) : (
                    <p>{formatPrice(it.price)}</p>
                  )}
                  <input
                    type="number"
                    value={it.quantity}
                    min={1}
                    onChange={(e) => changeQty(it.id, Number(e.target.value))}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <div className="cart-total-rows">
              <div className="cart-total-row">
                <span>{t("subtotal")}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="cart-total-row cart-total-discount">
                  <span>{t("discount")}</span>
                  <span>-{formatPrice(discountTotal)}</span>
                </div>
              )}
              <div className="cart-total-row">
                <span>{t("tax")}</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
              <div className="cart-total-row cart-total-final">
                <strong>{t("total")}:</strong>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>
            <div className="cart-actions">
              <button
                type="button"
                className="cart-continue-shopping"
                onClick={() => navigate("/categories")}
              >
                {t("continueShopping")}
              </button>
              <button type="button" onClick={() => navigate("/checkout")}>
                {t("checkout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
