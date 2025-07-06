INSERT INTO users (
  username, password, full_name, email, phone_number, date_of_birth,
  shipping_address, bank_account_number, credit_card_number,
  paypal_info, wallet_amount, wallet_password, bought_items, is_admin
) VALUES (
  'admin', 'admin', 'Root Admin', 'admin@sarraadb.local', '555-0111',
  '2025-01-01',                   
  'Admin HQ', 
  'DE00123456789012345678', 
  '4111111111111111', 
  'admin@paypal.com',
  0.00, 
  'adminpass', 
  '', 
  TRUE
);
