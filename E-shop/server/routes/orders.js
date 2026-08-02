const express = require("express");
const pool = require("../database");
const auth = require("../middleware/auth");

const router = express.Router();

const runWithTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { delivery_method, payment_method } = req.body;

    if (!delivery_method || !payment_method) {
      return res
        .status(400)
        .json({ message: "delivery_method and payment_method are required" });
    }

    const createdOrder = await runWithTransaction(async (client) => {
      const userResult = await client.query(
        `SELECT id, name, surname, city, street, postal_code, phone, email
         FROM users
         WHERE id = $1`,
        [userId],
      );

      if (userResult.rows.length === 0) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }

      const user = userResult.rows[0];

      const cartResult = await client.query(
        `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.stock_quantity
         FROM cart_items ci
         JOIN products p ON p.id = ci.product_id
         WHERE ci.user_id = $1
         ORDER BY ci.id ASC`,
        [userId],
      );

      if (cartResult.rows.length === 0) {
        const error = new Error("Cart is empty");
        error.status = 400;
        throw error;
      }

      for (const item of cartResult.rows) {
        if (Number(item.stock_quantity) < Number(item.quantity)) {
          const error = new Error(
            `Nedostatok skladových zásob pre produkt ${item.name}`,
          );
          error.status = 400;
          throw error;
        }
      }

      const deliveryPriceMap = {
        courier: 4.9,
        pickup: 2.5,
        express: 7.9,
      };

      const deliveryPrice = deliveryPriceMap[delivery_method] ?? 0;
      const subtotal = cartResult.rows.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      );
      const totalPrice = subtotal + deliveryPrice;
      const fullName = `${user.name} ${user.surname}`.trim();
      const addressLine = `${user.street || ""}`.trim();

      const orderResult = await client.query(
        `INSERT INTO orders (
           user_id, total_price, status, delivery_method, payment_method, delivery_price,
           full_name, email, phone, address_line, city, postal_code, country
         )
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         RETURNING *`,
        [
          userId,
          totalPrice,
          "pending",
          delivery_method,
          payment_method,
          deliveryPrice,
          fullName,
          user.email,
          user.phone || null,
          addressLine || "",
          user.city || "",
          user.postal_code || "",
          "Slovensko",
        ],
      );

      const order = orderResult.rows[0];

      for (const item of cartResult.rows) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
           VALUES ($1,$2,$3,$4,$5)`,
          [order.id, item.product_id, item.name, item.price, item.quantity],
        );

        await client.query(
          `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
          [item.quantity, item.product_id],
        );
      }

      await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);

      return order;
    });

    res.status(201).json({
      success: true,
      order: createdOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "Order creation failed" });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const ordersResult = await pool.query(
      `SELECT id, total_price, status, delivery_method, payment_method, delivery_price,
              full_name, email, phone, address_line, city, postal_code, country, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId],
    );

    const orders = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        `SELECT oi.product_id, oi.product_name, oi.price, oi.quantity,
                pi.image_url AS main_image
         FROM order_items oi
         LEFT JOIN product_images pi ON pi.product_id = oi.product_id AND pi.is_main = true
         WHERE oi.order_id = $1
         ORDER BY oi.id ASC`,
        [order.id],
      );
      orders.push({ ...order, items: itemsResult.rows });
    }

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to load order history" });
  }
});

module.exports = router;
