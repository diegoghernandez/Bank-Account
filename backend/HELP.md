```bash
docker run --name db --mount src=dbdata,dst=/data/db -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

docker build .

docker compose build

docker compose up

docker exec -it db-dev psql -U postgres -W bankaccount
```

- \c dbname	Switch connection to a new database
- \l	List available databases
- \dt	List available tables
- \d table_name	Describe a table such as a column, type, modifiers of columns, etc.

(1, 'admin', 'admin@names.com', '$2y$10$Un4HCQQIK01fPnTwdcehfuuurHTY9gj7ATd8K1C8J84ClSbsS6Njm', 8677.00, 0);
Password: "123456"