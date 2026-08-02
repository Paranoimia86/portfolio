import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import "./Home.css";

const HERO_IMAGES = [
  "/Foto/background-img.jpg",
  "/Foto/background2-img.avif",
  "/Foto/backgroung3-img.avif",
];

const CATEGORY_IMAGES = {
  telefony: "/Foto/smartphones.avif",
  notebooky: "/Foto/notebooks.jpg",
  kuchynskespotrebice: "/Foto/kitchen.avif",
};

const HERO_INTERVAL_MS = 4000;

function pickRandom(array, count) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default function Home() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [heroIndex, setHeroIndex] = useState(0);
  const [categoryRows, setCategoryRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, HERO_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    apiGet("/products/categories")
      .then(async (categoriesTree) => {
        const topLevelCategories = Array.isArray(categoriesTree)
          ? categoriesTree
          : [];
        const selectedCategories = pickRandom(topLevelCategories, 2);

        const rows = await Promise.all(
          selectedCategories.map(async (category) => {
            const data = await apiGet(`/products/category/${category.slug}`);
            const products = pickRandom(data?.products || [], 3);
            return { category, products };
          }),
        );

        setCategoryRows(rows.filter((row) => row.products.length > 0));
      })
      .catch(() => setCategoryRows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <div className="home-hero">
        {HERO_IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={
              index === heroIndex
                ? "home-hero-image home-hero-image-active"
                : "home-hero-image"
            }
          />
        ))}
      </div>

      {loading ? (
        <p>{t("loadingCategories")}</p>
      ) : (
        <div className="home-category-rows">
          {categoryRows.map(({ category, products }) => (
            <section key={category.id} className="home-category-row">
              <Link
                to={`/category/${category.slug}`}
                className="home-category-banner"
              >
                <img
                  src={CATEGORY_IMAGES[category.slug] || "/Foto/logo.webp"}
                  alt={category.name}
                  className="home-category-image"
                />
                <span className="home-category-name">{category.name}</span>
              </Link>

              <div className="home-category-products">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="home-product-card"
                  >
                    {product.main_image ? (
                      <img
                        src={`http://localhost:5000${product.main_image}`}
                        alt={product.name}
                        className="home-product-image"
                      />
                    ) : (
                      <div className="home-product-image home-product-placeholder">
                        {t("image")}
                      </div>
                    )}
                    <p className="home-product-name">{product.name}</p>
                    <p className="home-product-price">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
