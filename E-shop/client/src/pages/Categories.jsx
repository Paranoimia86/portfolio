import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const toggleCategory = (categoryId) => {
    setExpandedCategoryIds((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    );
  };

  useEffect(() => {
    apiGet("/products/categories")
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>{t("loadingCategories")}</div>;

  return (
    <section>
      <h1>{t("productCategories")}</h1>
      {categories.length === 0 ? (
        <p>{t("noCategories")}</p>
      ) : (
        <div className="categories-list">
          {categories.map((cat) => (
            <article key={cat.id} className="category-card">
              <div className="category-main-row">
                <Link to={`/category/${cat.slug}`} className="category-main-link">
                  <h2>{cat.name}</h2>
                  {cat.description && <p>{cat.description}</p>}
                </Link>

                {Array.isArray(cat.children) && cat.children.length > 0 && (
                  <button
                    type="button"
                    className="category-toggle-button"
                    onClick={() => toggleCategory(cat.id)}
                    aria-expanded={expandedCategoryIds.includes(cat.id)}
                    aria-label={`Toggle subcategories for ${cat.name}`}
                  >
                    {expandedCategoryIds.includes(cat.id) ? "▲" : "▼"}
                  </button>
                )}
              </div>

              {Array.isArray(cat.children) &&
                cat.children.length > 0 &&
                expandedCategoryIds.includes(cat.id) && (
                  <div className="subcategories-list">
                    {cat.children.map((child) => (
                      <Link
                        key={child.id}
                        to={`/category/${child.slug}`}
                        className="subcategory-link"
                      >
                        <h3>{child.name}</h3>
                        {child.description && <p>{child.description}</p>}
                      </Link>
                    ))}
                  </div>
                )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
