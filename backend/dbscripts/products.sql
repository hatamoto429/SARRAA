use sarraadb;

-- Create Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    stock INT,
    image_url VARCHAR(255)
);


-- Insert full product data
INSERT INTO products (name, description, price, stock, image_url) VALUES
('Phone', 'A modern smartphone with 5G support.', 699.99, 25, 'images/phone.jpg'),
('Laptop', 'Powerful laptop for work and gaming.', 1099.00, 10, 'images/laptop.jpg'),
('Headphones', 'Noise-canceling over-ear headphones.', 199.99, 30, 'images/headphones.jpg'),
('Tablet', '10-inch tablet with HD display.', 329.00, 15, 'images/tablet.jpg'),
('Camera', 'DSLR camera with 24MP sensor.', 549.99, 8, 'images/camera.jpg'),
('TV', '55-inch 4K Smart TV.', 799.00, 5, 'images/tv.jpg'),
('Charger', 'Fast-charging universal USB-C charger.', 29.99, 50, 'images/charger.jpg'),
('Gift Card', 'E-gift card usable in our store.', 50.00, 100, 'images/giftcard.jpg');