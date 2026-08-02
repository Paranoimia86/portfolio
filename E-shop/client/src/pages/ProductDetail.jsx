import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";
import "./ProductDetail.css";

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

function buildCategoryPathById(categoryId, categoriesTree) {
  if (
    !categoryId ||
    !Array.isArray(categoriesTree) ||
    categoriesTree.length === 0
  ) {
    return [];
  }

  const flat = flattenCategoriesTree(categoriesTree);
  const byId = new Map(flat.map((item) => [Number(item.id), item]));
  const path = [];
  const visited = new Set();
  let current = byId.get(Number(categoryId));

  while (current && !visited.has(Number(current.id))) {
    path.unshift(current);
    visited.add(Number(current.id));
    current = current.parent_id ? byId.get(Number(current.parent_id)) : null;
  }

  return path;
}

function pickRandom(array, count) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    Promise.all([apiGet(`/products/${id}`), apiGet("/products/categories")])
      .then(([data, categoriesTree]) => {
        console.debug("Product detail fetched:", data);
        if (!data) {
          setError(t("productNotLoaded"));
          setProduct(null);
          setBreadcrumb([]);
          return;
        }
        if (!data.images || data.images.length === 0) {
          console.debug("No images for product", id);
        } else {
          console.debug("Product images:", data.images);
        }
        setProduct(data);
        const path = buildCategoryPathById(data.category_id, categoriesTree);
        setBreadcrumb(path);

        // Use the top-level (root) category so subcategories with few
        // products of their own still get related items from sibling
        // subcategories (the API expands children only for root categories).
        const rootCategory = path[0];
        if (rootCategory?.slug) {
          apiGet(`/products/category/${rootCategory.slug}`)
            .then((categoryData) => {
              const others = (categoryData?.products || []).filter(
                (p) => p.id !== data.id,
              );
              setRelatedProducts(pickRandom(others, 4));
            })
            .catch(() => setRelatedProducts([]));
        } else {
          setRelatedProducts([]);
        }
      })
      .catch((err) => {
        setError(err.message);
        setProduct(null);
        setBreadcrumb([]);
      });
  }, [id, t]);

  if (error) return <div>Chyba: {error}</div>;
  if (!product) return <div>{t("loadingSearch")}</div>;

  const mainImage =
    product.images && product.images.length > 0
      ? product.images.find((img) => img.is_main) || product.images[0]
      : null;
  const galleryImages = mainImage
    ? product.images.filter((img) => img.id !== mainImage.id)
    : [];

  return (
    <section>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-link">
          {t("home")}
        </Link>
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
        <Link to="/categories" className="breadcrumb-link">
          {t("categories")}
        </Link>
        {breadcrumb.map((item) => (
          <span key={item.id}>
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
            <Link to={`/category/${item.slug}`} className="breadcrumb-link">
              {item.name}
            </Link>
          </span>
        ))}
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
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <article className="product-detail">
        <div className="product-detail-content">
          <div className="product-gallery">
            {mainImage ? (
              <img
                src={`http://localhost:5000${mainImage.image_url}`}
                alt={`${product.name} image`}
                className="product-gallery-main"
                onError={(e) => {
                  console.warn("Failed to load image", e.currentTarget.src);
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="product-gallery-main product-gallery-placeholder">
                {t("image")}
              </div>
            )}

            {galleryImages.length > 0 && (
              <div className="product-gallery-thumbs">
                {galleryImages.map((img) => (
                  <img
                    key={img.id}
                    src={`http://localhost:5000${img.image_url}`}
                    alt={`${product.name} image`}
                    className="product-gallery-thumb"
                    onError={(e) => {
                      console.warn("Failed to load image", e.currentTarget.src);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
            {product.brand_name && (
              <p className="product-detail-brand">
                <strong>{t("brand")}:</strong> {product.brand_name}
              </p>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div className="product-detail-specifications">
                {product.specifications.map((spec, idx) => (
                  <li key={idx}>
                    <strong>{spec.spec_name}:</strong> {spec.spec_value}
                  </li>
                ))}
              </div>
            )}
            <p className="product-detail-price">{formatPrice(product.price)}</p>

            <div className="product-detail-actions">
              <button
                onClick={async () => {
                  const token = localStorage.getItem("accessToken");
                  if (!token) {
                    navigate(`/login`);
                    return;
                  }

                  try {
                    setAdding(true);
                    const res = await apiPost("/cart", {
                      product_id: product.id,
                      quantity: 1,
                    });

                    // If API returned error-like object, attempt to show message
                    if (res && res.message && !res.id) {
                      alert(
                        res.message ||
                          "Produkt sa nepodarilo pridať do košíka.",
                      );
                    } else {
                      // success - go to cart
                      navigate("/cart");
                    }
                  } catch (err) {
                    alert(
                      "Chyba pri pridávaní do košíka: " + (err.message || err),
                    );
                  } finally {
                    setAdding(false);
                  }
                }}
                disabled={adding}
              >
                {adding ? t("adding") : t("addToCart")}
              </button>
              <Link to="/categories" className="back-to-category">
                {t("backToCategories")}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>{t("relatedProducts")}</h2>
          <div className="related-products-grid">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to={`/products/${related.id}`}
                className="related-product-card"
              >
                {related.main_image ? (
                  <img
                    src={`http://localhost:5000${related.main_image}`}
                    alt={related.name}
                    className="related-product-image"
                  />
                ) : (
                  <div className="related-product-image related-product-placeholder">
                    {t("image")}
                  </div>
                )}
                <p className="related-product-name">{related.name}</p>
                <p className="related-product-price">
                  {formatPrice(related.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
