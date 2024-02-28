SELECT g.genre_name, SUM(bl.quantity) AS total_quantity_in_stock
FROM genre g
JOIN book b ON g.genre_ID = b.genre_ID
JOIN book_location bl ON b.book_ID = bl.book_ID
GROUP BY g.genre_name
ORDER BY total_quantity_in_stock DESC;