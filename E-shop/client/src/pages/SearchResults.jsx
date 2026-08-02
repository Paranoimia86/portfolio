import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";
import "./CategoryProducts.css";

const DESCRIPTION_MAX_LENGTH = 150;

function truncateText(text, maxLength = DESCRIPTION_MAX_LENGTH) {
  if (!text) return "";
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}…`
    : text;
}

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const query = useMemo(
    () => new URLSearchParams(location.search).get("q") || "",
    [location.search],
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const data = await apiGet(`/products?q=${encodeURIComponent(query)}`);
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  if (!query.trim()) {
    return (
      <section className="no-results">
        <h1>{t("searchTitle")}</h1>
        <p>{t("searchHint")}</p>
        <button type="button" onClick={() => navigate("/")}>
          {t("backHome")}
        </button>
      </section>
    );
  }

  if (loading) return <div>{t("loadingSearch")}</div>;

  return (
    <div>
      <h1>
        {t("searchResultsFor")}: {query}
      </h1>

      <div className="category-products-content">
        {products.length === 0 ? (
          <div className="no-results">
            <p>{t("noSearchResults")}</p>
            <Link to="/categories">{t("categories")}</Link>
          </div>
        ) : (
          <div className="products-list">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  {product.main_image ? (
                    <img
                      src={`http://localhost:5000${product.main_image}`}
                      alt={product.name}
                    />
                  ) : (
                    <div className="no-product-pic">{t("image")}</div>
                  )}
                  <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="product-price">
                      {formatPrice(product.price)}
                    </p>
                    {product.description && (
                      <p
                        className="product-description"
                        title={product.description}
                      >
                        {truncateText(product.description)}
                      </p>
                    )}

                    <Link
                      to={`/products/${product.id}`}
                      className="product-info-button"
                    >
                      {t("productInfo")}
                    </Link>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
