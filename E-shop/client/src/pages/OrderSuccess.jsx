import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

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

  return (
    <section>
      <h1>{t("orderSuccessTitle")}</h1>

      {order && (
        <div className="order-summary">
          <p>{t("orderSuccessText")}</p>
          <p>
            <strong>{t("orderNumber")}:</strong> #{order.id}
          </p>
          <p>
            <strong>{t("total")}:</strong> {formatPrice(order.total_price)}
          </p>
          <p>
            <strong>{t("delivery")}:</strong>{" "}
            {methodLabel(order.delivery_method)}
          </p>
          <p>
            <strong>{t("payment")}:</strong> {methodLabel(order.payment_method)}
          </p>
          <div className="order-success-buttons">
            <Link to="/orders" className="order-success-button">
              {t("orderHistory")}
            </Link>
            <Link to="/categories" className="order-success-button">
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
