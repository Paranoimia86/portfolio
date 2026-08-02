const express = require("express");
const pool = require("../database");
const router = express.Router();

async function resolveCategoryAndIdsBySlug(slug) {
  const categoryResult = await pool.query(
    `SELECT id, name, slug, description, parent_id
     FROM categories
     WHERE slug = $1`,
    [slug],
  );

  if (categoryResult.rows.length === 0) {
    return { category: null, categoryIds: [] };
  }

  const category = categoryResult.rows[0];
  let categoryIds = [category.id];

  if (!category.parent_id) {
    const childResult = await pool.query(
      `SELECT id FROM categories WHERE parent_id = $1`,
      [category.id],
    );

    categoryIds = [category.id, ...childResult.rows.map((row) => row.id)];
  }

  return { category, categoryIds };
}

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    const params = [];
    let whereClause = "";

    const searchQuery = q && String(q).trim() ? String(q).trim() : "";

    if (searchQuery) {
      const brandLookup = await pool.query(
        `SELECT id FROM brands WHERE LOWER(name) = LOWER($1) LIMIT 1`,
        [searchQuery],
      );

      if (brandLookup.rows.length > 0) {
        params.push(brandLookup.rows[0].id);
        params.push(`%${searchQuery}%`);
        whereClause = `WHERE (
          p.brand_id = $1 OR
          p.name ILIKE $2 OR
          p.slug ILIKE $2
        )`;
      } else {
        params.push(`%${searchQuery}%`);
        whereClause = `WHERE (
          p.name ILIKE $1 OR
          p.slug ILIKE $1 OR
          b.name ILIKE $1
        )`;
      }
    }

    const result = await pool.query(
      `
      SELECT p.*, c.name AS category_name, b.name AS brand_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      LEFT JOIN brands b ON b.id = p.brand_id
      ${whereClause}
      ORDER BY p.id DESC
    `,
      params,
    );

    const products = result.rows;

    if (products.length > 0) {
      const ids = products.map((p) => p.id);
      const imgsRes = await pool.query(
        `SELECT product_id, image_url, is_main FROM product_images WHERE product_id = ANY($1::int[]) AND is_main = true`,
        [ids],
      );
      const byProduct = new Map();
      imgsRes.rows.forEach((r) => byProduct.set(r.product_id, r));
      products.forEach((p) => {
        const img = byProduct.get(p.id);
        p.main_image = img ? img.image_url : null;
      });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, slug, description, parent_id
       FROM categories
       ORDER BY parent_id NULLS FIRST, id ASC`,
    );

    const byId = new Map();
    const tree = [];

    result.rows.forEach((category) => {
      byId.set(category.id, { ...category, children: [] });
    });

    result.rows.forEach((category) => {
      const node = byId.get(category.id);
      if (category.parent_id && byId.has(category.parent_id)) {
        byId.get(category.parent_id).children.push(node);
      } else {
        tree.push(node);
      }
    });

    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { category, categoryIds } = await resolveCategoryAndIdsBySlug(slug);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const productsResult = await pool.query(
      `SELECT p.*, c.name AS category_name, b.name AS brand_name
       FROM products p
       JOIN categories c ON c.id = p.category_id
       LEFT JOIN brands b ON b.id = p.brand_id
       WHERE p.category_id = ANY($1::int[])
       ORDER BY p.id DESC`,
      [categoryIds],
    );
    const products = productsResult.rows;

    if (products.length > 0) {
      const ids = products.map((p) => p.id);
      const imgsRes = await pool.query(
        `SELECT product_id, image_url, is_main FROM product_images WHERE product_id = ANY($1::int[]) AND is_main = true`,
        [ids],
      );
      const byProduct = new Map();
      imgsRes.rows.forEach((r) => byProduct.set(r.product_id, r));
      products.forEach((p) => {
        const img = byProduct.get(p.id);
        p.main_image = img ? img.image_url : null;
      });

      const specsRes = await pool.query(
        `SELECT product_id, spec_name, spec_value
         FROM product_specifications
         WHERE product_id = ANY($1::int[])`,
        [ids],
      );
      const specsByProduct = new Map();
      specsRes.rows.forEach((row) => {
        if (!specsByProduct.has(row.product_id)) {
          specsByProduct.set(row.product_id, []);
        }
        specsByProduct.get(row.product_id).push({
          spec_name: row.spec_name,
          spec_value: row.spec_value,
        });
      });

      products.forEach((p) => {
        p.specifications = specsByProduct.get(p.id) || [];
      });
    } else {
      products.forEach((p) => {
        p.specifications = [];
      });
    }

    res.json({ category, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/category/:slug/filters", async (req, res) => {
  try {
    const { slug } = req.params;
    const { category, categoryIds } = await resolveCategoryAndIdsBySlug(slug);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const brandsResult = await pool.query(
      `SELECT DISTINCT b.name
       FROM products p
       JOIN brands b ON b.id = p.brand_id
       WHERE p.category_id = ANY($1::int[])
       ORDER BY b.name ASC`,
      [categoryIds],
    );

    const specsResult = await pool.query(
      `SELECT DISTINCT ps.spec_name, ps.spec_value
       FROM product_specifications ps
       JOIN products p ON p.id = ps.product_id
       WHERE p.category_id = ANY($1::int[])
       ORDER BY ps.spec_name ASC, ps.spec_value ASC`,
      [categoryIds],
    );

    const priceResult = await pool.query(
      `SELECT MIN(price) AS min_price, MAX(price) AS max_price
       FROM products
       WHERE category_id = ANY($1::int[])`,
      [categoryIds],
    );

    const groupedSpecs = new Map();
    specsResult.rows.forEach((row) => {
      if (!groupedSpecs.has(row.spec_name)) {
        groupedSpecs.set(row.spec_name, []);
      }
      groupedSpecs.get(row.spec_name).push(row.spec_value);
    });

    const specFilters = Array.from(groupedSpecs.entries()).map(
      ([name, values]) => ({
        name,
        values,
      }),
    );

    res.json({
      brands: brandsResult.rows.map((row) => row.name),
      specFilters,
      priceRange: {
        min: priceResult.rows[0]?.min_price
          ? Number(priceResult.rows[0].min_price)
          : null,
        max: priceResult.rows[0]?.max_price
          ? Number(priceResult.rows[0].max_price)
          : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const productResult = await pool.query(
      `SELECT p.*, b.name AS brand_name, c.name AS category_name
       FROM products p
       LEFT JOIN brands b ON p.brand_id = b.id
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id],
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = productResult.rows[0];

    const specsResult = await pool.query(
      `SELECT spec_name, spec_value FROM product_specifications WHERE product_id = $1`,
      [id],
    );

    product.specifications = specsResult.rows;

    const imagesResult = await pool.query(
      `SELECT id, image_url, is_main FROM product_images WHERE product_id = $1 ORDER BY is_main DESC, id ASC`,
      [id],
    );
    product.images = imagesResult.rows;

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
