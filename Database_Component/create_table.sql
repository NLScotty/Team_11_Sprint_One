-- Create the author table
CREATE TABLE author (
    author_ID SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL
);

-- Create the genre table
CREATE TABLE genre (
    genre_ID SERIAL PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the book_mobile_locations table
CREATE TABLE book_mobile_locations (
    location_id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create the staff table
CREATE TABLE staff (
    staff_ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    location_ID INT REFERENCES book_mobile_locations(location_id) NOT NULL
);

-- Create the author table
CREATE TABLE book (
    book_ID SERIAL PRIMARY KEY,
    isbn VARCHAR(13) NOT NULL,
    title VARCHAR(255) NOT NULL,
    year INT,
    author_ID INT REFERENCES author(author_ID),
    genre_ID INT REFERENCES genre(genre_ID)
);

-- Create the book_location table
CREATE TABLE book_location (
    book_ID INT REFERENCES book(book_ID),
    location_ID INT REFERENCES book_mobile_locations(location_id),
    quantity INT,
    PRIMARY KEY (book_ID, location_ID)
);

-- Create the customer table
CREATE TABLE customer (
    customer_ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create the receipt table
CREATE TABLE receipt (
    purchase_ID SERIAL PRIMARY KEY,
    date_time TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    payment_type VARCHAR(50),
    customer_ID INT REFERENCES customer(customer_ID)
);

-- Create the book_receipt table
CREATE TABLE book_receipt (
    book_ID INT REFERENCES book(book_ID),
    purchase_ID INT REFERENCES receipt(purchase_ID),
    quantity INT,
    PRIMARY KEY (book_ID, purchase_ID)
);
