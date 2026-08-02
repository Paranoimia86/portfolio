import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../services/api";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";
import "./CategoryProducts.css";

function flattenCategoriesTree(nodes, list = []) {
  nodes.forEach((node) => {
    list.push({
      id: node.id,
      name: node.name,
      slug: node.slug,
      parent_id: node.parent_id,
    });

    if (Array.isArray(node.children) && node.children.length > 0) {
      flattenCategoriesTree(node.children, list);
    }
  });

  return list;
}

function buildCategoryBreadcrumb(category, categoriesTree) {
  if (
    !category ||
    !Array.isArray(categoriesTree) ||
    categoriesTree.length === 0
  ) {
    return [];
  }

  const flat = flattenCategoriesTree(categoriesTree);
  const byId = new Map(flat.map((item) => [item.id, item]));
  const bySlug = new Map(flat.map((item) => [item.slug, item]));

  const start = bySlug.get(category.slug) || byId.get(category.id) || category;
  const path = [];
  const visited = new Set();
  let current = start;

  while (current && !visited.has(current.id)) {
    path.unshift(current);
    visited.add(current.id);
    current = current.parent_id ? byId.get(current.parent_id) : null;
  }

  return path;
}

const DESCRIPTION_MAX_LENGTH = 150;

function truncateText(text, maxLength = DESCRIPTION_MAX_LENGTH) {
  if (!text) return "";
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}…`
    : text;
}

export default function CategoryProducts() {
  const { slug } = useParams();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [filterMeta, setFilterMeta] = useState({ brands: [], specFilters: [] });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [categoryData, categoriesTree, filtersData] = await Promise.all([
          apiGet(`/products/category/${slug}`),
          apiGet("/products/categories"),
          apiGet(`/products/category/${slug}/filters`),
        ]);

        const loadedCategory = categoryData.category || null;
        let loadedProducts = Array.isArray(categoryData.products)
          ? categoryData.products
          : [];

        const hasSpecsInList = loadedProducts.some(
          (product) =>
            Array.isArray(product.specifications) &&
            product.specifications.length > 0,
        );

        const hasSpecsFromMeta =
          Array.isArray(filtersData?.specFilters) &&
          filtersData.specFilters.length > 0;

        if (!hasSpecsFromMeta && !hasSpecsInList && loadedProducts.length > 0) {
          const details = await Promise.all(
            loadedProducts.map((product) => apiGet(`/products/${product.id}`)),
          );

          const specsById = new Map(
            details
              .filter(
                (item) =>
                  item &&
                  typeof item.id === "number" &&
                  Array.isArray(item.specifications),
              )
              .map((item) => [item.id, item.specifications]),
          );

          loadedProducts = loadedProducts.map((product) => ({
            ...product,
            specifications: specsById.get(product.id) || [],
          }));
        }

        setCategory(loadedCategory);
        setProducts(loadedProducts);
        setBreadcrumb(buildCategoryBreadcrumb(loadedCategory, categoriesTree));
        setFilterMeta({
          brands: Array.isArray(filtersData?.brands) ? filtersData.brands : [],
          specFilters: Array.isArray(filtersData?.specFilters)
            ? filtersData.specFilters
            : [],
        });
        setSelectedBrands([]);
        setSelectedSpecs({});
        setMinPrice("");
        setMaxPrice("");
      } catch {
        setCategory(null);
        setProducts([]);
        setBreadcrumb([]);
        setFilterMeta({ brands: [], specFilters: [] });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const availableBrands = useMemo(() => {
    if (Array.isArray(filterMeta.brands) && filterMeta.brands.length > 0) {
      return filterMeta.brands;
    }
    return [...new Set(products.map((p) => p.brand_name).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b),
    );
  }, [filterMeta.brands, products]);

  const availableSpecs = useMemo(() => {
    if (
      Array.isArray(filterMeta.specFilters) &&
      filterMeta.specFilters.length > 0
    ) {
      return filterMeta.specFilters;
    }

    const bySpec = new Map();
    products.forEach((product) => {
      const specs = Array.isArray(product.specifications)
        ? product.specifications
        : [];
      specs.forEach((spec) => {
        if (!bySpec.has(spec.spec_name)) {
          bySpec.set(spec.spec_name, new Set());
        }
        bySpec.get(spec.spec_name).add(spec.spec_value);
      });
    });

    return Array.from(bySpec.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, valuesSet]) => ({
        name,
        values: Array.from(valuesSet).sort((a, b) => a.localeCompare(b)),
      }));
  }, [filterMeta.specFilters, products]);

  const toggleBrand = (brand) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand],
    );
  };

  const toggleSpecValue = (specName, specValue) => {
    setSelectedSpecs((current) => {
      const existing = current[specName] || [];
      const updatedValues = existing.includes(specValue)
        ? existing.filter((value) => value !== specValue)
        : [...existing, specValue];

      const next = { ...current, [specName]: updatedValues };
      if (next[specName].length === 0) {
        delete next[specName];
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSpecs({});
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredProducts = useMemo(() => {
    const from = minPrice === "" ? null : Number(minPrice);
    const to = maxPrice === "" ? null : Number(maxPrice);

    return products.filter((product) => {
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand_name)
      ) {
        return false;
      }

      const productPrice = Number(product.price || 0);
      if (from !== null && !Number.isNaN(from) && productPrice < from) {
        return false;
      }
      if (to !== null && !Number.isNaN(to) && productPrice > to) {
        return false;
      }

      const productSpecs = Array.isArray(product.specifications)
        ? product.specifications
        : [];
      for (const [specName, values] of Object.entries(selectedSpecs)) {
        if (!values.length) continue;
        const match = productSpecs.some(
          (spec) =>
            spec.spec_name === specName && values.includes(spec.spec_value),
        );
        if (!match) return false;
      }

      return true;
    });
  }, [products, selectedBrands, selectedSpecs, minPrice, maxPrice]);

  if (loading) return <div>{t("loadingSearch")}</div>;

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">{t("home")}</Link>
        <span className="breadcrumb-separator">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>{" "}
        </span>
        <Link to="/categories">{t("categories")}</Link>
        {breadcrumb.map((item, index) => {
          const isLast = index === breadcrumb.length - 1;
          return (
            <span key={item.id || item.slug}>
              <span className="breadcrumb-separator">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>{" "}
              </span>
              {isLast ? (
                <span className="breadcrumb-current">{item.name}</span>
              ) : (
                <Link to={`/category/${item.slug}`}>{item.name}</Link>
              )}
            </span>
          );
        })}
      </nav>

      <h1>{category ? category.name : t("productsInCategory")}</h1>

      <div className="category-products-layout">
        <aside className="filters-sidebar">
          <div className="filters-header-row">
            <h2>{t("filters")}</h2>
            <button
              type="button"
              onClick={clearFilters}
              className="clear-filters-button"
            >
              {t("resetFilters")}
            </button>
          </div>

          <div className="filter-section">
            <h3>{t("brand")}</h3>
            {availableBrands.length === 0 ? (
              <p className="filter-empty">-</p>
            ) : (
              availableBrands.map((brand) => (
                <label key={brand} className="filter-checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))
            )}
          </div>

          <div className="filter-section">
            <h3>{t("price")}</h3>
            <div className="price-range-inputs">
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder={t("priceFrom")}
              />
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={t("priceTo")}
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>{t("parameters")}</h3>
            {availableSpecs.length === 0 ? (
              <p className="filter-empty">-</p>
            ) : (
              availableSpecs.map((spec) => (
                <div key={spec.name} className="spec-filter-group">
                  <h4>{spec.name}</h4>
                  {spec.values.map((value) => (
                    <label
                      key={`${spec.name}-${value}`}
                      className="filter-checkbox-row"
                    >
                      <input
                        type="checkbox"
                        checked={(selectedSpecs[spec.name] || []).includes(
                          value,
                        )}
                        onChange={() => toggleSpecValue(spec.name, value)}
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
              ))
            )}
          </div>
        </aside>

        <section className="category-products-content">
          {products.length === 0 ? (
            <p>{t("noProductsInCategory")}</p>
          ) : filteredProducts.length === 0 ? (
            <p>{t("noProductsWithFilters")}</p>
          ) : (
            <div className="products-list">
              {filteredProducts.map((product) => (
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
        </section>
      </div>
    </div>
  );
}
