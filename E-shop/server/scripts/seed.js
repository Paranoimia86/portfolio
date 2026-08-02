const bcrypt = require("bcrypt");
const pool = require("../database");

async function seedDatabase() {
  try {
    console.log("🌱 Začínam vkladať testovacie dáta...");

    await pool.query(
      `ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id INT`,
    );
    await pool.query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS city VARCHAR(100)`,
    );
    await pool.query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS street VARCHAR(255)`,
    );
    await pool.query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20)`,
    );
    await pool.query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(30)`,
    );
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'categories_parent_id_fkey'
        ) THEN
          ALTER TABLE categories
          ADD CONSTRAINT categories_parent_id_fkey
          FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE;
        END IF;
      END $$;
    `);

    await pool.query(
      `DELETE FROM categories WHERE slug IN ('notebooky-herne', 'notebooky-pracovne', 'notebooky', 'herne', 'pracovne')`,
    );

    console.log("👤 Vkladám admin účet...");
    const adminPasswordHash = await bcrypt.hash("Admin123", 10);
    await pool.query(
      `INSERT INTO users (name, surname, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET
         name = EXCLUDED.name,
         surname = EXCLUDED.surname,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role`,
      ["Admin", "User", "admin@admin.com", adminPasswordHash, "admin"],
    );

    console.log("📂 Vkladám kategórie...");
    await pool.query(
      `INSERT INTO categories (name, slug, description, parent_id) VALUES
       ('Telefóny', 'telefony', 'Mobilné telefóny a smartphony', NULL),
       ('Notebooky', 'notebooky', 'Notebooky podľa zamerania', NULL)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         description = EXCLUDED.description,
         parent_id = EXCLUDED.parent_id`,
    );

    const notebookParentResult = await pool.query(
      `SELECT id FROM categories WHERE slug = 'notebooky'`,
    );
    const notebookParentId = notebookParentResult.rows[0]?.id;

    await pool.query(
      `INSERT INTO categories (name, slug, description, parent_id) VALUES
       ('Pracovné', 'notebooky-pracovne', 'Notebooky na prácu, kanceláriu a produktivitu', $1),
       ('Herné', 'notebooky-herne', 'Notebooky na hranie a vysoký výkon', $1)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         description = EXCLUDED.description,
         parent_id = EXCLUDED.parent_id`,
      [notebookParentId],
    );

    console.log("📌 Vkladám značky...");
    await pool.query(
      `INSERT INTO brands (name, slug) VALUES
       ('Apple', 'apple'),
       ('Samsung', 'samsung'),
       ('Xiaomi', 'xiaomi'),
       ('Lenovo', 'lenovo'),
       ('ASUS', 'asus')
       ON CONFLICT (slug) DO NOTHING`,
    );

    const categoriesResult = await pool.query(
      `SELECT id, slug, parent_id FROM categories WHERE slug IN ('telefony', 'notebooky', 'notebooky-pracovne', 'notebooky-herne')`,
    );
    const categoryMap = {};
    categoriesResult.rows.forEach((category) => {
      categoryMap[category.slug] = category.id;
    });

    const brandsResult = await pool.query(
      `SELECT id, slug FROM brands WHERE slug IN ('apple', 'samsung', 'xiaomi', 'lenovo', 'asus')`,
    );
    const brandMap = {};
    brandsResult.rows.forEach((brand) => {
      brandMap[brand.slug] = brand.id;
    });

    const products = [
      {
        name: "iPhone 15 Pro",
        slug: "iphone-15-pro",
        brandSlug: "apple",
        categorySlug: "telefony",
        description: "Najnovší iPhone s titanom",
        price: 1099.0,
        stock: 10,
        specs: {
          RAM: "8GB",
          Storage: "256GB",
          Fotoaparát: "48MP + 12MP + 12MP",
          Batéria: "3349 mAh",
        },
      },
      {
        name: "Samsung Galaxy S24",
        slug: "samsung-galaxy-s24",
        brandSlug: "samsung",
        categorySlug: "telefony",
        description: "Prémiový Android telefón",
        price: 899.0,
        stock: 15,
        specs: {
          RAM: "12GB",
          Storage: "256GB",
          Fotoaparát: "50MP + 12MP + 10MP",
          Batéria: "4000 mAh",
        },
      },
      {
        name: "Xiaomi 14 Ultra",
        slug: "xiaomi-14-ultra",
        brandSlug: "xiaomi",
        categorySlug: "telefony",
        description: "Výkon a fotografia",
        price: 599.0,
        stock: 20,
        specs: {
          RAM: "16GB",
          Storage: "512GB",
          Fotoaparát: "50MP + 50MP + 50MP + 50MP",
          Batéria: "5000 mAh",
        },
      },
      {
        name: "iPhone 14",
        slug: "iphone-14",
        brandSlug: "apple",
        categorySlug: "telefony",
        description: "Spoľahlivý iPhone s výborným fotoaparátom",
        price: 799.0,
        stock: 18,
        specs: {
          RAM: "6GB",
          Storage: "128GB",
          Fotoaparát: "12MP + 12MP",
          Batéria: "3279 mAh",
        },
      },
      {
        name: "Samsung Galaxy A55",
        slug: "samsung-galaxy-a55",
        brandSlug: "samsung",
        categorySlug: "telefony",
        description: "Obľúbený telefón strednej triedy",
        price: 449.0,
        stock: 25,
        specs: {
          RAM: "8GB",
          Storage: "128GB",
          Fotoaparát: "50MP + 12MP + 5MP",
          Batéria: "5000 mAh",
        },
      },
      {
        name: "Xiaomi Redmi Note 13 Pro",
        slug: "xiaomi-redmi-note-13-pro",
        brandSlug: "xiaomi",
        categorySlug: "telefony",
        description: "Skvelý pomer výkonu a ceny",
        price: 329.0,
        stock: 30,
        specs: {
          RAM: "8GB",
          Storage: "256GB",
          Fotoaparát: "200MP + 8MP + 2MP",
          Batéria: "5100 mAh",
        },
      },
      {
        name: "Lenovo ThinkBook 16",
        slug: "lenovo-thinkbook-16",
        brandSlug: "lenovo",
        categorySlug: "notebooky-pracovne",
        description: "Pracovný notebook",
        price: 899.0,
        stock: 12,
        specs: {
          CPU: "Intel Core i7-13620H",
          GPU: "Intel Iris Xe",
          RAM: "16GB DDR5",
        },
      },
      {
        name: "ASUS ROG Strix G16",
        slug: "asus-rog-strix-g16",
        brandSlug: "asus",
        categorySlug: "notebooky-herne",
        description: "Herný notebook",
        price: 1599.0,
        stock: 8,
        specs: {
          CPU: "Intel Core i9-14900HX",
          GPU: "NVIDIA RTX 4070",
          RAM: "32GB DDR5",
        },
      },
      {
        name: "ASUS Zenbook 14 OLED",
        slug: "asus-zenbook-14-oled",
        brandSlug: "asus",
        categorySlug: "notebooky-pracovne",
        description: "Ľahký a elegantný notebook s OLED displejom",
        price: 1099.0,
        stock: 10,
        specs: {
          CPU: "Intel Core Ultra 7 155H",
          GPU: "Intel Arc Graphics",
          RAM: "16GB LPDDR5",
        },
      },
      {
        name: "Lenovo IdeaPad Slim 5",
        slug: "lenovo-ideapad-slim-5",
        brandSlug: "lenovo",
        categorySlug: "notebooky-pracovne",
        description: "Kompaktný notebook na každodenné použitie",
        price: 699.0,
        stock: 15,
        specs: {
          CPU: "AMD Ryzen 5 7530U",
          GPU: "AMD Radeon Graphics",
          RAM: "16GB DDR4",
        },
      },
      {
        name: "Lenovo Legion 5 Pro",
        slug: "lenovo-legion-5-pro",
        brandSlug: "lenovo",
        categorySlug: "notebooky-herne",
        description: "Výkonný herný notebook s vysokým výkonom",
        price: 1799.0,
        stock: 6,
        specs: {
          CPU: "AMD Ryzen 7 7745HX",
          GPU: "NVIDIA RTX 4060",
          RAM: "32GB DDR5",
        },
      },
      {
        name: "ASUS TUF Gaming A15",
        slug: "asus-tuf-gaming-a15",
        brandSlug: "asus",
        categorySlug: "notebooky-herne",
        description: "Odolný herný notebook za dobrú cenu",
        price: 999.0,
        stock: 14,
        specs: {
          CPU: "AMD Ryzen 7 7735HS",
          GPU: "NVIDIA RTX 4050",
          RAM: "16GB DDR5",
        },
      },
    ];

    console.log("🛒 Vkladám produkty a parametre...");
    for (const product of products) {
      const productResult = await pool.query(
        `INSERT INTO products (category_id, brand_id, name, slug, description, price, stock_quantity, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE SET
           category_id = EXCLUDED.category_id,
           brand_id = EXCLUDED.brand_id,
           name = EXCLUDED.name,
           description = EXCLUDED.description,
           price = EXCLUDED.price,
           stock_quantity = EXCLUDED.stock_quantity,
           is_active = EXCLUDED.is_active
         RETURNING id`,
        [
          categoryMap[product.categorySlug],
          brandMap[product.brandSlug],
          product.name,
          product.slug,
          product.description,
          product.price,
          product.stock,
          true,
        ],
      );

      const productId = productResult.rows[0].id;

      for (const [specName, specValue] of Object.entries(product.specs)) {
        await pool.query(
          `INSERT INTO product_specifications (product_id, spec_name, spec_value)
           VALUES ($1, $2, $3)
           ON CONFLICT (product_id, spec_name) DO UPDATE SET
             spec_value = EXCLUDED.spec_value`,
          [productId, specName, specValue],
        );
      }

      console.log(`  ✅ ${product.name}`);
    }

    console.log("🎉 Všetky dáta úspešne vložené!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Chyba pri vkladaní dát:", error);
    process.exit(1);
  }
}

seedDatabase();
