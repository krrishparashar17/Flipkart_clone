CREATE DATABASE IF NOT EXISTS flipkart_clone;
USE flipkart_clone;

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    specifications TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    stock INT NOT NULL DEFAULT 0,
    brand VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0,
    thumbnail VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PLACED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


INSERT INTO categories (name) VALUES
('Mobiles'),
('Electronics'),
('Fashion'),
('Home'),
('Appliances');

INSERT INTO products (category_id, name, description, specifications, price, original_price, stock, brand, rating, thumbnail) VALUES
(1, 'iPhone 15', 'Latest Apple iPhone with A16 chip and dynamic island.', '128GB, 6.1-inch display, A16 Bionic, Dual Camera', 72999.00, 79999.00, 10, 'Apple', 4.7, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'),
(1, 'Samsung Galaxy S24', 'Flagship Samsung phone with AMOLED display.', '256GB, 6.2-inch AMOLED, Snapdragon, Triple Camera', 68999.00, 74999.00, 12, 'Samsung', 4.5, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800'),
(2, 'Noise Smartwatch', 'Stylish smartwatch with health tracking.', 'AMOLED display, Bluetooth calling, 7-day battery', 2999.00, 5999.00, 30, 'Noise', 4.2, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'),
(2, 'boAt Rockerz 450', 'Wireless headphones with deep bass.', 'Bluetooth 5.0, 15h battery, Foldable design', 1499.00, 3999.00, 25, 'boAt', 4.1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'),
(3, 'Men Casual Shirt', 'Comfortable cotton casual shirt for daily wear.', '100% Cotton, Slim Fit, Full Sleeve', 799.00, 1599.00, 40, 'Roadster', 4.0, 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800'),
(3, 'Women Kurti', 'Elegant printed kurti for festive and casual wear.', 'Rayon, 3/4 Sleeve, Regular Fit', 699.00, 1399.00, 35, 'Libas', 4.3, 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'),
(4, 'Sofa Cover Set', 'Premium sofa cover set for living room.', '5 Seater, Stretchable Fabric, Washable', 1199.00, 2499.00, 20, 'HomeStyle', 4.0, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'),
(5, 'Mixer Grinder', 'Powerful mixer grinder for kitchen needs.', '750W motor, 3 jars, Stainless steel blades', 3499.00, 4999.00, 15, 'Prestige', 4.4, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800');

INSERT INTO product_images (product_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'),
(1, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'),
(2, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800'),
(2, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'),
(3, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'),
(4, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'),
(5, 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800'),
(6, 'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?w=800'),
(7, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'),
(8, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800');



ALTER TABLE orders
ADD COLUMN order_code VARCHAR(50) UNIQUE AFTER id;

SELECT * FROM orders;
SELECT * FROM order_items;

TRUNCATE TABLE product_images;


UPDATE products
SET thumbnail = 'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?w=800'
WHERE category_id=3 and name = 'Women Kurti';