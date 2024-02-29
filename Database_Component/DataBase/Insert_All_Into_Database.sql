-- We insert the authors into the database
insert into author (author_ID, author_name) values ('2345', 'Dorette Nestor');
insert into author (author_ID, author_name) values ('9105', 'Kizzee Kelso');
insert into author (author_ID, author_name) values ('0172', 'Tammy Hought');
insert into author (author_ID, author_name) values ('7410', 'Chery Minter');
insert into author (author_ID, author_name) values ('8765', 'Lydon Scroggs');

-- We insert the genre into the database
insert into genre (genre_ID, genre_name, description) values ('76657', 'Action|Adventure|Fantasy', 'Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.');
insert into genre (genre_ID, genre_name, description) values ('65431', 'Mystery', 'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.');
insert into genre (genre_ID, genre_name, description) values ('77543', 'Documentary', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.');
insert into genre (genre_ID, genre_name, description) values ('09878', 'Drama|Romance', 'Aliquam sit amet diam in magna bibendum imperdiet.');
insert into genre (genre_ID, genre_name, description) values ('03004', 'Fantasy', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.');

-- We insert the customer into the database
insert into customer (customer_ID, name, address, phone, email) values ('99999', 'Dianemarie Kilpatrick', '26 Thackeray Street', '631-597-1024', 'dkilpatrick0@webnode.com');
insert into customer (customer_ID, name, address, phone, email) values ('12344', 'Gino Steuhlmeyer', '29 Riverside Lane', '686-890-2688', 'gsteuhlmeyer1@bandcamp.com');
insert into customer (customer_ID, name, address, phone, email) values ('56678', 'Rani Filyukov', '96448 Farmco Trail', '811-706-0476', 'rfilyukov2@about.com');
insert into customer (customer_ID, name, address, phone, email) values ('23441', 'Scotti Whiles', '86 Memorial Alley', '979-853-3895', 'swhiles3@answers.com');
insert into customer (customer_ID, name, address, phone, email) values ('23444', 'Fransisco Millier', '45 Melby Terrace', '543-727-0128', 'fmillier4@amazon.co.uk');

-- We insert store locations into the database
insert into book_mobile_locations (location_id, phone_number, address, email) values (1, '632-745-1850', '14 Sundown Pass', 'mmessage0@soundcloud.com');
insert into book_mobile_locations (location_id, phone_number, address, email) values (5, '706-530-2850', '9 Bellgrove Circle', 'zperrot1@sfgate.com');
insert into book_mobile_locations (location_id, phone_number, address, email) values (2, '366-967-5152', '8684 Village Green Terrace', 'cusborn2@mapquest.com');
insert into book_mobile_locations (location_id, phone_number, address, email) values (3, '331-484-7948', '949 Fairview Center', 'bwilsee3@archive.org');
insert into book_mobile_locations (location_id, phone_number, address, email) values (9, '661-841-6960', '68 Hollow Ridge Terrace', 'ryakubovich4@squarespace.com');

-- We insert books into the database
insert into book (book_ID, isbn, title, year, author_ID, genre_ID) values ('2924801', '902098813-1', 'Sucker, The (Corniaud, Le)', 1999, '2345', '76657');
insert into book (book_ID, isbn, title, year, author_ID, genre_ID) values ('7510986', '392588050-X', 'It! The Terror from Beyond Space', 1995, '9105', '65431');
insert into book (book_ID, isbn, title, year, author_ID, genre_ID) values ('1594611', '008867831-8', 'Mercenary for Justice', 1995, '0172', '77543');
insert into book (book_ID, isbn, title, year, author_ID, genre_ID) values ('3470853', '520328560-8', 'Zatoichi and the Doomed Man (Zatôichi sakate giri) (Zatôichi 11)', 1998, '7410', '09878');
insert into book (book_ID, isbn, title, year, author_ID, genre_ID) values ('4040330', '426475805-X', 'Mostly Martha (Bella Martha)', 2005, '8765', '3004');

-- We insert staff into the database
insert into staff (staff_ID, name, address, phone_number, location_ID) values ('76543', 'Hirsch Bloxsome', '442 Sunnyside Court', '850-660-8123', 1);
insert into staff (staff_ID, name, address, phone_number, location_ID) values ('987652', 'Liam Flavelle', '07535 Doe Crossing Junction', '983-545-7906', 3);
insert into staff (staff_ID, name, address, phone_number, location_ID) values ('12341', 'Rickert Cobbold', '52359 Warrior Park', '585-220-8071', 9);
insert into staff (staff_ID, name, address, phone_number, location_ID) values ('09876', 'Tabbatha Calway', '907 Crowley Place', '457-638-7333', 3);
insert into staff (staff_ID, name, address, phone_number, location_ID) values ('43123', 'Malinda Skouling', '3 Sugar Street', '554-479-4680', 1);

-- We insert receipts into the database
insert into receipt (purchase_ID, date_time, amount, payment_type, customer_ID) values ('7336', '2023-4-10', '5.52', 'americanexpress', null);
insert into receipt (purchase_ID, date_time, amount, payment_type, customer_ID) values ('5671', '2023-2-10', '6.76', 'china-unionpay', 99999);
insert into receipt (purchase_ID, date_time, amount, payment_type, customer_ID) values ('8549', '2023-6-10', '2.55', 'jcb', 12344);
insert into receipt (purchase_ID, date_time, amount, payment_type, customer_ID) values ('1237', '2023-8-10', '0.38', 'diners-club-carte-blanche', 23441);
insert into receipt (purchase_ID, date_time, amount, payment_type, customer_ID) values ('0987', '2023-9-10', '7.40', 'jcb', 23441);

-- We insert the Book/Receipt Bridging table into the database
insert into book_receipt (book_ID, purchase_ID, quantity) values ('2924801', '7336', 2);
insert into book_receipt (book_ID, purchase_ID, quantity) values ('7510986', '7336', 1);
insert into book_receipt (book_ID, purchase_ID, quantity) values ('1594611', '5671', 2);
insert into book_receipt (book_ID, purchase_ID, quantity) values ('3470853', '5671', 1);
insert into book_receipt (book_ID, purchase_ID, quantity) values ('4040330', '1237', 1);

-- We insert the Book/Store Bridging table into the database
INSERT INTO book_location (book_id, location_id, quantity) VALUES ('2924801', 1, 4);
INSERT INTO book_location (book_id, location_id, quantity) VALUES ('7510986', 1, 1);
INSERT INTO book_location (book_id, location_id, quantity) VALUES ('1594611', 5, 3);
INSERT INTO book_location (book_id, location_id, quantity) VALUES ('3470853', 5, 2);
INSERT INTO book_location (book_id, location_id, quantity) VALUES ('4040330', 3, 2);