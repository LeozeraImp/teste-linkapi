CREATE DATABASE linkapi;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users ( 
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    pass VARCHAR NOT NULL,
    tel VARCHAR NOT NULL,
    created_at DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs ( 
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    status BOOLEAN NOT NULL,
    recurrence VARCHAR NOT NULL,
    recurrence_value VARCHAR NOT NULL,
    interval DATE,
    created_at DATE NOT NULL,
    fixed_schedule DATE,
    user_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id)
);