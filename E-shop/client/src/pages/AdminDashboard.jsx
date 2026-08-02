import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  const [brandForm, setBrandForm] = useState({ name: "", slug: "" });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    parent_id: "",
  });
  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    discount_price: "",
    category_id: "",
    brand_id: "",
    stock_quantity: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageForm, setImageForm] = useState({ image_url: "", is_main: false });
  const [imageFile, setImageFile] = useState(null);
  const [showImageForm, setShowImageForm] = useState(null);
  const [productFilters, setProductFilters] = useState({
    search: "",
    categoryId: "",
    brandId: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const b = await apiGet("/admin/brands");
      const c = await apiGet("/admin/categories");
      const p = await apiGet("/admin/products");
      setBrands(Array.isArray(b) ? b : []);
      setCategories(Array.isArray(c) ? c : []);
      setProducts(Array.isArray(p) ? p : []);
      // Načítaj obrázky pre všetky produkty
      if (Array.isArray(p)) {
        for (const product of p) {
          const images = await apiGet(`/admin/products/${product.id}/images`);
          setProductImages((prev) => ({
            ...prev,
            [product.id]: Array.isArray(images) ? images : [],
          }));
        }
      }
    };
    loadData();
  }, []);

  const createBrand = async (e) => {
    e.preventDefault();
    await apiPost("/admin/brands", brandForm);
    setBrandForm({ name: "", slug: "" });
    const b = await apiGet("/admin/brands");
    setBrands(Array.isArray(b) ? b : []);
  };

  const createCategory = async (e) => {
    e.preventDefault();
    await apiPost("/admin/categories", {
      ...categoryForm,
      parent_id: categoryForm.parent_id ? Number(categoryForm.parent_id) : null,
    });
    setCategoryForm({ name: "", slug: "", description: "", parent_id: "" });
    const c = await apiGet("/admin/categories");
    setCategories(Array.isArray(c) ? c : []);
  };

  const deleteCategory = async (categoryId) => {
    if (!window.confirm(t("adminConfirmDeleteCategory"))) return;
    await apiDelete(`/admin/categories/${categoryId}`);
    const c = await apiGet("/admin/categories");
    setCategories(Array.isArray(c) ? c : []);
    const p = await apiGet("/admin/products");
    setProducts(Array.isArray(p) ? p : []);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    await apiPost("/admin/products", {
      ...productForm,
      price: parseFloat(productForm.price),
      discount_price: productForm.discount_price
        ? parseFloat(productForm.discount_price)
        : null,
      category_id: parseInt(productForm.category_id),
      brand_id: productForm.brand_id ? parseInt(productForm.brand_id) : null,
      stock_quantity: parseInt(productForm.stock_quantity) || 0,
    });
    setProductForm({
      name: "",
      slug: "",
      description: "",
      price: "",
      discount_price: "",
      category_id: "",
      brand_id: "",
      stock_quantity: 0,
    });
    const p = await apiGet("/admin/products");
    setProducts(Array.isArray(p) ? p : []);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    await apiPut(`/admin/products/${editingProduct.id}`, {
      ...editingProduct,
      price: parseFloat(editingProduct.price),
      discount_price: editingProduct.discount_price
        ? parseFloat(editingProduct.discount_price)
        : null,
      category_id: parseInt(editingProduct.category_id),
      brand_id: editingProduct.brand_id
        ? parseInt(editingProduct.brand_id)
        : null,
      stock_quantity: parseInt(editingProduct.stock_quantity) || 0,
    });
    setEditingProduct(null);
    const p = await apiGet("/admin/products");
    setProducts(Array.isArray(p) ? p : []);
  };

  const filteredProducts = products.filter((p) => {
    const search = productFilters.search.trim().toLowerCase();
    const matchesSearch =
      !search ||
      p.name?.toLowerCase().includes(search) ||
      p.slug?.toLowerCase().includes(search);
    const matchesCategory =
      !productFilters.categoryId ||
      String(p.category_id) === String(productFilters.categoryId);
    const matchesBrand =
      !productFilters.brandId ||
      String(p.brand_id) === String(productFilters.brandId);
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const loadProductImages = async (productId) => {
    const images = await apiGet(`/admin/products/${productId}/images`);
    setProductImages((prev) => ({
      ...prev,
      [productId]: Array.isArray(images) ? images : [],
    }));
  };

  const addProductImage = async (productId) => {
    if (!imageFile) {
      alert(t("adminSelectImageAlert"));
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("is_main", imageForm.is_main);

    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/products/${productId}/upload-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        setImageFile(null);
        setImageForm({ image_url: "", is_main: false });
        await loadProductImages(productId);
        alert(t("adminImageUploadSuccess"));
      } else {
        const error = await response.json();
        alert(
          `${t("adminErrorPrefix")}: ${error.error || t("adminUnknownError")}`,
        );
      }
    } catch (err) {
      alert(`${t("adminUploadErrorPrefix")}: ${err.message}`);
    }
  };

  const deleteProductImage = async (imageId, productId) => {
    await apiDelete(`/admin/images/${imageId}`);
    await loadProductImages(productId);
  };

  const handleEditProduct = (p) => {
    setEditingProduct({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || "",
      price: p.price,
      stock_quantity: p.stock_quantity,
      category_id: p.category_id,
      brand_id: p.brand_id,
    });
    loadProductImages(p.id);
    setShowImageForm(null);
  };

  const topLevelCategories = categories.filter(
    (category) => !category.parent_id,
  );

  return (
    <section>
      <h1>{t("adminPanel")}</h1>
      <div className="admin-dashboard">
        <div className="add-brand-category">
          <form onSubmit={createBrand}>
            <h2>{t("adminAddBrand")}</h2>
            <input
              placeholder={t("adminName")}
              value={brandForm.name}
              onChange={(e) =>
                setBrandForm({ ...brandForm, name: e.target.value })
              }
            />
            <input
              placeholder={t("adminSlug")}
              value={brandForm.slug}
              onChange={(e) =>
                setBrandForm({ ...brandForm, slug: e.target.value })
              }
            />
            <button type="submit" className="add-brand-category-button">
              {t("adminSaveBrand")}
            </button>
          </form>

          <form onSubmit={createCategory}>
            <h2>{t("adminAddCategory")}</h2>
            <input
              placeholder={t("adminName")}
              value={categoryForm.name}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, name: e.target.value })
              }
            />
            <input
              placeholder={t("adminSlug")}
              value={categoryForm.slug}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, slug: e.target.value })
              }
            />
            <input
              placeholder={t("adminDescription")}
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  description: e.target.value,
                })
              }
            />
            <select
              value={categoryForm.parent_id}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, parent_id: e.target.value })
              }
            >
              <option value="">{t("adminMainCategory")}</option>
              {topLevelCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button type="submit" className="add-brand-category-button">
              {t("adminSaveCategory")}
            </button>
          </form>
          <div className="brands-list">
            <h3>{t("adminBrandsHeading")}</h3>
            <ul>
              {brands.map((b) => (
                <li key={b.id}>
                  {b.name} ({b.slug})
                </li>
              ))}
            </ul>
          </div>
          <div className="categories-list">
            <h3>{t("adminCategoriesHeading")}</h3>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  {c.name} ({c.slug})
                  {c.parent_name ? ` → ${c.parent_name}` : ""}
                  <button
                    type="button"
                    onClick={() => deleteCategory(c.id)}
                    className="delete-category-button"
                  >
                    {t("adminDeleteCategory")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="add-product">
          <form onSubmit={createProduct}>
            <h2>{t("adminAddProduct")}</h2>
            <input
              placeholder={t("adminProductName")}
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              required
            />
            <input
              placeholder={t("adminSlug")}
              value={productForm.slug}
              onChange={(e) =>
                setProductForm({ ...productForm, slug: e.target.value })
              }
              required
            />
            <textarea
              placeholder={t("adminProductDescription")}
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder={t("price")}
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder={t("adminDiscountPriceOptional")}
              value={productForm.discount_price}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  discount_price: e.target.value,
                })
              }
              step="0.01"
            />
            <input
              type="number"
              placeholder={t("adminStockQuantity")}
              value={productForm.stock_quantity}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  stock_quantity: e.target.value,
                })
              }
            />
            <select
              value={productForm.category_id}
              onChange={(e) =>
                setProductForm({ ...productForm, category_id: e.target.value })
              }
              required
            >
              <option value="">{t("adminSelectCategory")}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.parent_name ? `${c.parent_name} > ` : ""}
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={productForm.brand_id}
              onChange={(e) =>
                setProductForm({ ...productForm, brand_id: e.target.value })
              }
            >
              <option value="">{t("adminNoBrand")}</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <button type="submit">{t("adminAddProduct")}</button>
          </form>
        </div>

        <hr />

        <h3>{t("adminProductsHeading")}</h3>
        {editingProduct ? (
          <form onSubmit={updateProduct} className="edit-product-form">
            <h3>
              {t("adminEditProductHeading")}: {editingProduct.name}
            </h3>
            <input
              placeholder={t("adminProductName")}
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              required
            />
            <input
              placeholder={t("adminSlug")}
              value={editingProduct.slug}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, slug: e.target.value })
              }
              required
            />
            <textarea
              placeholder={t("adminProductDescription")}
              value={editingProduct.description || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder={t("price")}
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder={t("adminDiscountPriceOptional")}
              value={editingProduct.discount_price || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  discount_price: e.target.value,
                })
              }
              step="0.01"
            />
            <input
              type="number"
              placeholder={t("adminStockQuantity")}
              value={editingProduct.stock_quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stock_quantity: e.target.value,
                })
              }
            />
            <select
              value={editingProduct.category_id}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category_id: e.target.value,
                })
              }
              required
            >
              <option value="">{t("adminSelectCategory")}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.parent_name ? `${c.parent_name} > ` : ""}
                  {c.name}
                </option>
              ))}
            </select>
            <button type="submit">{t("saveChanges")}</button>
            <button type="button" onClick={() => setEditingProduct(null)}>
              {t("adminCancel")}
            </button>
          </form>
        ) : (
          <>
            <div className="product-filters">
              <input
                type="text"
                placeholder={t("adminSearchByNameOrSlug")}
                value={productFilters.search}
                onChange={(e) =>
                  setProductFilters({
                    ...productFilters,
                    search: e.target.value,
                  })
                }
              />
              <select
                value={productFilters.categoryId}
                onChange={(e) =>
                  setProductFilters({
                    ...productFilters,
                    categoryId: e.target.value,
                  })
                }
              >
                <option value="">{t("adminAllCategories")}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.parent_name ? `${c.parent_name} > ` : ""}
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={productFilters.brandId}
                onChange={(e) =>
                  setProductFilters({
                    ...productFilters,
                    brandId: e.target.value,
                  })
                }
              >
                <option value="">{t("adminAllBrands")}</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  setProductFilters({ search: "", categoryId: "", brandId: "" })
                }
              >
                {t("adminClearFilters")}
              </button>
            </div>
            <ul className="products-list">
              {filteredProducts.map((p) => (
                <li key={p.id} className="product-card">
                  <strong>{p.name}</strong> ({p.category_name})
                  {p.brand_name ? ` - ${p.brand_name}` : ""}
                  <br />
                  {t("price")}: €{parseFloat(p.price).toFixed(2)} |{" "}
                  {t("adminQuantityLabel")}: {p.stock_quantity}
                  <br />
                  {p.description && (
                    <small>
                      {t("adminDescriptionLabel")}: {p.description}
                    </small>
                  )}
                  <br />
                  {productImages[p.id] && productImages[p.id].length > 0 && (
                    <div style={{ margin: "10px 0" }}>
                      {productImages[p.id]
                        .filter((img) => img.is_main)
                        .map((img) => (
                          <img
                            key={img.id}
                            src={`http://localhost:5000${img.image_url}`}
                            alt={p.name}
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                              marginRight: "10px",
                            }}
                          />
                        ))}
                    </div>
                  )}
                  <br />
                  <button
                    type="button"
                    onClick={() => handleEditProduct(p)}
                    className="edit-button"
                  >
                    {t("adminEdit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowImageForm(showImageForm === p.id ? null : p.id);
                      if (showImageForm !== p.id) {
                        loadProductImages(p.id);
                      }
                    }}
                    className="edit-button"
                  >
                    {showImageForm === p.id
                      ? t("adminHideImages")
                      : t("adminImages")}
                  </button>
                  {showImageForm === p.id && (
                    <div
                      style={{ marginLeft: "20px", marginTop: "10px" }}
                      className="product-images-section"
                    >
                      <h4>{t("adminProductImagesHeading")}</h4>

                      <div className="add-image-form">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImageFile(e.target.files?.[0] || null)
                          }
                        />
                        <label>
                          <input
                            type="checkbox"
                            checked={imageForm.is_main}
                            onChange={(e) =>
                              setImageForm({
                                ...imageForm,
                                is_main: e.target.checked,
                              })
                            }
                          />
                          {t("adminMainImageLabel")}
                        </label>
                        <button
                          type="button"
                          onClick={() => addProductImage(p.id)}
                          className="add-image-button"
                        >
                          {t("adminAddImageButton")}
                        </button>
                      </div>

                      {productImages[p.id] &&
                        productImages[p.id].length > 0 && (
                          <ul style={{ fontSize: "0.9em" }}>
                            {productImages[p.id].map((img) => (
                              <li key={img.id} className="product-image-item">
                                {img.is_main && (
                                  <strong>[{t("adminMainImageTag")}]</strong>
                                )}{" "}
                                <a
                                  href={img.image_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {img.image_url}
                                </a>
                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteProductImage(img.id, p.id)
                                  }
                                  className="delete-image-button"
                                >
                                  {t("remove")}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
