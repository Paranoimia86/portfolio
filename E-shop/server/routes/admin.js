const express = require("express");
const pool = require("../database");
const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Iba obrázky sú povolené (JPEG, PNG, WebP)"));
    }
  },
});

router.get("/ping", auth, requireAdmin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

router.get("/brands", auth, requireAdmin, async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, slug FROM brands ORDER BY id DESC",
  );
  res.json(result.rows);
});

router.post("/brands", auth, requireAdmin, async (req, res) => {
  const { name, slug } = req.body;
  const result = await pool.query(
    "INSERT INTO brands (name, slug) VALUES ($1, $2) RETURNING *",
    [name, slug],
  );
  res.status(201).json(result.rows[0]);
});

// GET /api/admin/categories
router.get("/categories", auth, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.slug, c.description, c.parent_id, p.name AS parent_name, c.created_at
       FROM categories c
       LEFT JOIN categories p ON p.id = c.parent_id
       ORDER BY c.parent_id NULLS FIRST, c.id DESC`,
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/categories
router.post("/categories", auth, requireAdmin, async (req, res) => {
  try {
    const { name, slug, description, parent_id } = req.body;
    const result = await pool.query(
      "INSERT INTO categories (name, slug, description, parent_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, slug, description || null, parent_id || null],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/categories/:id
router.put("/categories/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, parent_id } = req.body;

    const result = await pool.query(
      "UPDATE categories SET name=$1, slug=$2, description=$3, parent_id=$4 WHERE id=$5 RETURNING *",
      [name, slug, description || null, parent_id || null, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/categories/:id
router.delete("/categories/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM categories WHERE id=$1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/products
router.get("/products", auth, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name AS category_name, b.name AS brand_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      LEFT JOIN brands b ON b.id = p.brand_id
      ORDER BY p.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/products
router.post("/products", auth, requireAdmin, async (req, res) => {
  try {
    const {
      category_id,
      brand_id,
      name,
      slug,
      description,
      price,
      discount_price,
      stock_quantity,
      is_active,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products
      (category_id, brand_id, name, slug, description, price, discount_price, stock_quantity, is_active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        category_id,
        brand_id || null,
        name,
        slug,
        description || null,
        price,
        discount_price || null,
        stock_quantity ?? 0,
        is_active ?? true,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/products/:id
router.put("/products/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      brand_id,
      name,
      slug,
      description,
      price,
      discount_price,
      stock_quantity,
      is_active,
    } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET category_id=$1, brand_id=$2, name=$3, slug=$4, description=$5,
           price=$6, discount_price=$7, stock_quantity=$8, is_active=$9, updated_at=NOW()
       WHERE id=$10
       RETURNING *`,
      [
        category_id,
        brand_id || null,
        name,
        slug,
        description || null,
        price,
        discount_price || null,
        stock_quantity ?? 0,
        is_active ?? true,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/products/:id
router.delete("/products/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/products/:productId/specs
router.get(
  "/products/:productId/specs",
  auth,
  requireAdmin,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await pool.query(
        "SELECT id, product_id, spec_name, spec_value FROM product_specifications WHERE product_id=$1 ORDER BY id ASC",
        [productId],
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// POST /api/admin/products/:productId/specs
router.post(
  "/products/:productId/specs",
  auth,
  requireAdmin,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { spec_name, spec_value } = req.body;

      const result = await pool.query(
        `INSERT INTO product_specifications (product_id, spec_name, spec_value)
       VALUES ($1,$2,$3)
       RETURNING *`,
        [productId, spec_name, spec_value],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// PUT /api/admin/specs/:id
router.put("/specs/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { spec_name, spec_value } = req.body;

    const result = await pool.query(
      "UPDATE product_specifications SET spec_name=$1, spec_value=$2 WHERE id=$3 RETURNING *",
      [spec_name, spec_value, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Specification not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/specs/:id
router.delete("/specs/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM product_specifications WHERE id=$1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Specification not found" });
    }

    res.json({ message: "Specification deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/products/:productId/images
router.get(
  "/products/:productId/images",
  auth,
  requireAdmin,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const result = await pool.query(
        "SELECT id, product_id, image_url, is_main FROM product_images WHERE product_id=$1 ORDER BY is_main DESC, id ASC",
        [productId],
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// POST /api/admin/products/:productId/images
router.post(
  "/products/:productId/images",
  auth,
  requireAdmin,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { image_url, is_main } = req.body;

      const result = await pool.query(
        `INSERT INTO product_images (product_id, image_url, is_main)
       VALUES ($1,$2,$3)
       RETURNING *`,
        [productId, image_url, is_main || false],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// POST /api/admin/products/:productId/upload-image
router.post(
  "/products/:productId/upload-image",
  auth,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Žiadny súbor nebol nahraný" });
      }

      const { productId } = req.params;
      const { is_main } = req.body;
      const imageUrl = `/uploads/${req.file.filename}`;
      const isMain = is_main === "true" || is_main === true;

      const result = await pool.query(
        `INSERT INTO product_images (product_id, image_url, is_main)
       VALUES ($1,$2,$3)
       RETURNING *`,
        [productId, imageUrl, isMain],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// PUT /api/admin/images/:id
router.put("/images/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, is_main } = req.body;

    const result = await pool.query(
      "UPDATE product_images SET image_url=$1, is_main=$2 WHERE id=$3 RETURNING *",
      [image_url, is_main || false, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/images/:id
router.delete("/images/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM product_images WHERE id=$1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
