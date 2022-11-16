DROP TABLE IF EXISTS secrets;
DROP TABLE IF EXISTS users;

CREATE TABLE secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

INSERT INTO secrets (
  title,
  description
)

VALUES 
  ('MK Ultra', 'LSD brainwashing experiments'),
  ('Project Blue Book', 'Aliens and stuff');