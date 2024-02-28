-- Query that fetches the top 3 authors that sold the most copies
SELECT Author.Author_ID, Author.Author_Name, SUM(Book_Receipt.quantity) AS Copies_Sold
FROM Author JOIN Book ON Author.Author_ID = Book.Author_ID
	JOIN Book_Receipt ON Book.Book_ID = Book_Receipt.Book_ID
GROUP BY Author.Author_ID
ORDER BY SUM(Book_Receipt.quantity) DESC
Limit 3