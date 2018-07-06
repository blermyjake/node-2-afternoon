CREATE TABLE products (
    product_id Serial PRIMARY KEY,
    name varchar(40) NOT NULL,
    description varchar(80) NOT NULL,
    price integer NOT NULL,
    image_url text NOT NULL
);
