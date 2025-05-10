-- Create and select the database
CREATE DATABASE IF NOT EXISTS sarraadb;
USE sarraadb;

-- Drop existing users table if needed
DROP TABLE IF EXISTS users;

-- Create the users table with all fields from the beginning
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  email VARCHAR(100),
  phone_number VARCHAR(20),
  date_of_birth DATE,
  shipping_address TEXT,
  bank_account_number VARCHAR(34),
  credit_card_number VARCHAR(20),
  paypal_info VARCHAR(100),
  wallet_amount DECIMAL(10,2),
  wallet_password VARCHAR(255),
  bought_items TEXT
);

-- Insert full user data
INSERT INTO users (
  username, password, full_name, email, phone_number, date_of_birth,
  shipping_address, bank_account_number, credit_card_number,
  paypal_info, wallet_amount, wallet_password, bought_items
) VALUES 
('wick.johnathan', 'babayaga', 'Johnathan Wick', 'john.wick@continental.com', '555-0011', '1964-09-02', '1 Hitman Ave, New York, NY', 'DE44500105175407324931', '4111111111111111', 'jw_continental@paypal.com', 500.00, 'puppy123', 'Phone,Charger,Laptop'),
('skywalker.anakin', 'darthvader', 'Anakin Skywalker', 'anakin@theforce.com', '555-0022', '1977-05-25', 'Mustafar Outpost 4', 'DE32100100123456789012', '4242424242424242', 'darthvader@paypal.com', 1000.00, 'darkside', 'TV,Camera'),
('sully.jake', 'torukmakto', 'Jake Sully', 'jake@pandora.com', '555-0033', '1985-08-10', 'Tree of Souls, Pandora', 'DE89370400440532013000', '4000056655665556', 'toruk@paypal.com', 75.00, 'eywa123', 'Tablet,Headphones'),
('baggins.bilbo', 'barrelrider', 'Bilbo Baggins', 'bilbo@shire.net', '555-0044', '1970-01-01', 'Bag End, Hobbiton', 'GB82WEST12345698765432', '6011000990139424', 'baggins@paypal.com', 250.50, 'smaug', 'Gift Card,Tablet'),
('sparrow.jack', 'captain', 'Jack Sparrow', 'captainjack@blackpearl.org', '555-0055', '1963-06-09', 'The Black Pearl, Caribbean Sea', 'FR7630006000011234567890189', '3530111333300000', 'captain@paypal.com', 12.00, 'rum4life', 'Camera,Charger'),
('myers.michael', 'boogeyman', 'Michael Myers', 'michael@haddonfield.us', '555-0066', '1957-10-19', '1313 Elm St, Haddonfield, IL', 'IT60X0542811101000000123456', '378282246310005', 'boogeyman@paypal.com', 666.00, 'knife', 'Headphones,Gift Card'),
('riddle.tom', 'voldemort', 'Tom Riddle', 'tom@hogwarts.ac.uk', '555-0077', '1926-12-31', 'Chamber of Secrets, Hogwarts', 'CH9300762011623852957', '6011111111111117', 'voldemort@paypal.com', 9999.99, 'horcrux', 'TV,Phone'),
('stark.tony', 'ironman', 'Tony Stark', 'tony@starkindustries.com', '555-0088', '1970-05-29', '10880 Malibu Point, CA', 'NL91ABNA0417164300', '5105105105105100', 'ironman@paypal.com', 1000000.00, 'jarvis', 'Laptop,Tablet,Camera'),
('everdeen.katniss', 'mockingjay', 'Katniss Everdeen', 'katniss@district12.org', '555-0099', '1987-05-08', 'District 12, Panem', 'BE68539007547034', '3566002020360505', 'mockingjay@paypal.com', 120.00, 'peeta', 'Gift Card,Charger'),
('watney.mark', 'martian', 'Mark Watney', 'mark@aresiii.mars', '555-0100', '1980-11-12', 'Hab Unit, Mars', 'ES9121000418450200051332', '4111111111111111', 'martian@paypal.com', 42.00, 'potatoes', 'Tablet,Phone');
