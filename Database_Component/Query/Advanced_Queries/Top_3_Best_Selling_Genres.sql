-- Query that fetches the top 3 genres that sold the most copies
SELECT Genre.Genre_ID, Genre.Genre_Name, SUM(Book_Receipt.quantity) AS Copies_Sold
FROM Genre JOIN Book ON Genre.Genre_ID = Book.Genre_ID
	JOIN Book_Receipt ON Book.Book_ID = Book_Receipt.Book_ID
GROUP BY Genre.Genre_ID
ORDER BY SUM(Book_Receipt.quantity) DESC
Limit 3