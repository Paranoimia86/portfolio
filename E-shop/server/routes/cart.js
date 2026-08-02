const express = require("express");
const pool = require("../database");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/cart
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT ci.id, ci.quantity, p.id AS product_id, p.name, p.slug, p.price, p.discount_price, p.stock_quantity, p.description,
              pi.image_url AS main_image
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_main = true
       WHERE ci.user_id = $1
       ORDER BY ci.id ASC`,
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    if (!product_id)
      return res.status(400).json({ message: "product_id required" });

    const existing = await pool.query(
      "SELECT id, quantity FROM cart_items WHERE user_id=$1 AND product_id=$2",
      [userId, product_id],
    );

    if (existing.rows.length > 0) {
      const newQty = existing.rows[0].quantity + (Number(quantity) || 1);
      const up = await pool.query(
        "UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *",
        [newQty, existing.rows[0].id],
      );
      return res.json(up.rows[0]);
    }

    const q = Number(quantity) || 1;
    const inserted = await pool.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *",
      [userId, product_id, q],
    );
    res.status(201).json(inserted.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cart/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    const validated = Number(quantity);
    if (Number.isNaN(validated) || validated < 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const item = await pool.query(
      "SELECT id FROM cart_items WHERE id=$1 AND user_id=$2",
      [id, userId],
    );
    if (item.rows.length === 0)
      return res.status(404).json({ message: "Cart item not found" });

    if (validated === 0) {
      const d = await pool.query(
        "DELETE FROM cart_items WHERE id=$1 RETURNING id",
        [id],
      );
      return res.json({ message: "Deleted", id: d.rows[0].id });
    }

    const updated = await pool.query(
      "UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *",
      [validated, id],
    );
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const del = await pool.query(
      "DELETE FROM cart_items WHERE id=$1 AND user_id=$2 RETURNING id",
      [id, userId],
    );
    if (del.rows.length === 0)
      return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Deleted", id: del.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
