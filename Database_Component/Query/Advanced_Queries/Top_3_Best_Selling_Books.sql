-- Query that fetches the top 3 books that sold the most copies
SELECT Book.Book_ID, Book.Title, SUM(Book_Receipt.quantity)
FROM Book JOIN Book_Receipt ON Book.Book_ID = Book_Receipt.Book_ID
GROUP BY Book.Book_ID
ORDER BY SUM(Book_Receipt.quantity) DESC
LIMIT 3