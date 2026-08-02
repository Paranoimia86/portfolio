import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import "./Orders.css";

export default function Orders() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const methodLabel = (method) => {
    const labels = {
      courier: t("deliveryCourier"),
      pickup: t("deliveryPickup"),
      express: t("deliveryExpress"),
      card: t("paymentCard"),
      cod: t("paymentCod"),
      bank: t("paymentBank"),
    };

    return labels[method] || method;
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    (async () => {
      const data = await apiGet("/orders/history");
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    })();
  }, [navigate]);

  if (loading)
    return (
      <div>
        {language === "sk"
          ? "Načítavam históriu objednávok..."
          : "Loading order history..."}
      </div>
    );

  return (
    <section>
      <h1>{t("orderHistoryTitle")}</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>{t("noOrders")}</p>
          <Link to="/categories">{t("goShopping")}</Link>
        </div>
      ) : (
        <div className="orders-table">
          <div className="orders-columns orders-table-header">
            <span>{t("date")}</span>
            <span>{t("orderId")}</span>
            <span>{t("total")}</span>
            <span>{t("status")}</span>
            <span>{t("payment")}</span>
            <span>{t("delivery")}</span>
            <span>{t("items")}</span>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <article key={order.id} className="orders-columns order-row">
                <span className="order-cell" data-label={t("date")}>
                  {new Date(order.created_at).toLocaleString(
                    language === "sk" ? "sk-SK" : "en-US",
                  )}
                </span>
                <span className="order-cell" data-label={t("orderId")}>
                  #{order.id}
                </span>
                <span className="order-cell" data-label={t("total")}>
                  {formatPrice(order.total_price)}
                </span>
                <span className="order-cell" data-label={t("status")}>
                  {order.status}
                </span>
                <span className="order-cell" data-label={t("payment")}>
                  {methodLabel(order.payment_method)}
                </span>
                <span className="order-cell" data-label={t("delivery")}>
                  {methodLabel(order.delivery_method)}
                </span>
                <div
                  className="order-cell order-images"
                  data-label={t("items")}
                >
                  {order.items.map((item) => (
                    <Link
                      key={`${order.id}-${item.product_id}`}
                      to={`/products/${item.product_id}`}
                      className="order-item-thumb"
                      title={`${item.product_name} × ${item.quantity}`}
                    >
                      {item.main_image ? (
                        <img
                          src={`http://localhost:5000${item.main_image}`}
                          alt={item.product_name}
                        />
                      ) : (
                        <div className="order-item-thumb-placeholder">
                          {t("image")}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
