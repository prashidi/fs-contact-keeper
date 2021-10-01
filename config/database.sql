DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contacts;

CREATE TABLE users
(
  id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 50 ) NOT NULL,
  email VARCHAR( 255 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now(),
  PRIMARY KEY(id)
);

CREATE TABLE contacts
(
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  name VARCHAR (255) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(15),
  contact_type VARCHAR(30) DEFAULT 'Personal',
  created_at TIMESTAMPTZ DEFAULT Now(),
  PRIMARY KEY(id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
        REFERENCES users(id)
);