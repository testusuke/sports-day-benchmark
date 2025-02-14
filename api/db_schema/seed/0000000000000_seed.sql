-- migrate:up
DELETE FROM users;

INSERT INTO users (id, name, email)
VALUES ('01JJR62X7PF6E4MFFF91D9QWQZ', 'test', 'test@example.com');

-- migrate:down
