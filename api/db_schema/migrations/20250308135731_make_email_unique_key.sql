-- migrate:up
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

-- migrate:down
ALTER TABLE users DROP CONSTRAINT unique_email;


