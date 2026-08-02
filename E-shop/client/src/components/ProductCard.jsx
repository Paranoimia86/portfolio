import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";

export default function ProductCard({ product }) {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <article
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
      }}
    >
      <Link
        to={`/products/${product.id}`}
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          color: "inherit",
          textDecoration: "none",
          width: "100%",
        }}
      >
        {product.main_image ? (
          <img
            src={`http://localhost:5000${product.main_image}`}
            alt={product.name}
            style={{
              width: 96,
              height: 96,
              objectFit: "cover",
              borderRadius: 6,
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 96,
              height: 96,
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              flexShrink: 0,
            }}
          >
            {t("image")}
          </div>
        )}

        <div>
          <h3 style={{ margin: "0 0 6px" }}>{product.name}</h3>
          {product.brand_name && (
            <p style={{ margin: 0 }}>{product.brand_name}</p>
          )}
          <p style={{ margin: "6px 0 0" }}>{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
