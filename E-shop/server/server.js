const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const pool = require("./database");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const ensureOrderColumns = async () => {
  await pool.query(`
    ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS delivery_method VARCHAR(50) NOT NULL DEFAULT 'courier',
      ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) NOT NULL DEFAULT 'card',
      ADD COLUMN IF NOT EXISTS delivery_price DECIMAL(10,2) NOT NULL DEFAULT 0;
  `);
};

app.get("/", (req, res) => {
  res.send("E-Shop API is running!");
});

// Import routes
const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const authAdminRouter = require("./routes/admin");
app.use("/api/admin", authAdminRouter);

const cartRouter = require("./routes/cart");
app.use("/api/cart", cartRouter);

const ordersRouter = require("./routes/orders");
app.use("/api/orders", ordersRouter);

const PORT = process.env.PORT || 5000;
ensureOrderColumns()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to ensure order columns:", err);
    process.exit(1);
  });
