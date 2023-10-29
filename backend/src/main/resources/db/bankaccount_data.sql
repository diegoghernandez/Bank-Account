INSERT INTO `account` (id_account, account_name, email, password, current_balance, enabled) VALUES
(1, 'Random1', 'random1@names.com', '123456', 10000.00, TRUE),
(2, 'Random2', 'random2@names.com', '123456', 32000.00, TRUE),
(3, 'Random3', 'random3@names.com', '123456', 4000.00, TRUE),
(4, 'Random4', 'random4@names.com', '123456', 154354.00, FALSE),
(5, 'Random5', 'random5@names.com', '123456', 8677.00, FALSE);

INSERT INTO `token` (id_token, token, expiration_time, id_account) VALUES
(1, 'er143ge8-9b58-41ae-8723-29d7ff675a30', {ts '2021-12-25 13:47:05.602'}, 4),
(2, '7f1a71e8-9b58-41ae-8723-29d7ff675a30', {ts '2022-12-25 14:10:05.602'}, 5);

INSERT INTO `automation` (id_automation, id_account, name, amount, id_transfer_account, hours_to_next_execution, execution_time, status) VALUES
(1, 3, 'Automation', 2000.00, 43, 12, {ts '2023-10-09 20:10:12'}, TRUE),
(2, 2, 'Automation', 2000.00, 43, 12, {ts '2023-10-09 20:10:12'}, TRUE),
(3, 2, 'Automation', 2000.00, 43, 32, {ts '2023-10-09 20:10:12'}, TRUE),
(4, 2, 'Automation', 2000.00, 43, 2, {ts '2023-10-09 20:10:12'}, FALSE),
(5, 3, 'Automation', 2000.00, 43, 52, {ts '2023-10-09 20:10:12'}, TRUE),
(6, 3, 'Automation', 2000.00, 43, 12, {ts '2023-10-09 20:10:12'}, FALSE),
(7, 2, 'Automation', 2000.00, 43, 62, {ts '2023-10-09 20:10:12'}, TRUE);

INSERT INTO `transaction` (id_transaction, id_account, id_transfer_account, receiver_name, transaction_amount, transaction_type, transaction_timestamp) VALUES
(1, 1, 2, 'Maria', 6000.00, 'WIRE_TRANSFER', {ts '2022-10-09 20:10:12'}),
(2, 2, 1, 'Pedro', 2000.00, 'DEPOSIT', {ts '2022-10-09 20:10:12'}),
(3, 1, 2, 'Maria', 400.00, 'ONLINE_PAYMENT', {ts '2023-10-09 20:10:12'}),
(4, 1, 2, 'Maria', 300.00, 'ONLINE_PAYMENT', {ts '2023-10-09 20:10:12'}),
(5, 1, 0, 'Pedro', 6000.00, 'DEPOSIT', {ts '2023-10-09 20:10:12'}),
(6, 1, 2, 'Luisa', 2000.00, 'WIRE_TRANSFER', {ts '2022-10-09 20:10:12'}),
(7, 1, 2, 'Maria', 400.00, 'ONLINE_PAYMENT', {ts '2022-10-09 20:10:12'}),
(8, 1, 2, 'Ana', 300.00, 'ONLINE_PAYMENT', {ts '2024-11-09 20:10:12'}),
(9, 1, 2, 'Javier', 6000.00, 'WIRE_TRANSFER', {ts '2022-10-09 20:10:12'}),
(10, 1, 0, 'Pedro', 2000.00, 'DEPOSIT', {ts '2022-10-09 20:10:12'}),
(11, 1, 2, 'Maria', 400.00, 'ONLINE_PAYMENT', {ts '2022-10-09 20:10:12'}),
(12, 1, 2, 'Maria', 300.00, 'WIRE_TRANSFER', {ts '2024-10-09 20:10:12'});