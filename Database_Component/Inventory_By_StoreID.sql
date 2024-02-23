/* A query that retreives all books and their quantity from a Mobile_Book(Store) location */

SELECT book.book_id, book.title, book_location.quantity
FROM book JOIN book_location ON (book.book_id = book_location.book_id) JOIN book_mobile_locations ON (book_location.location_id = book_mobile_locations.location_id)
WHERE book_mobile_locations.location_id = 1;