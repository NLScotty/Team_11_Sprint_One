-- A query that fetches all books and inventory avalaible at a location_ID
SELECT Book.Book_ID, Book.Title, Book_Location.Quantity
FROM Book JOIN Book_Location ON Book.Book_ID = Book_Location.Book_ID 
	JOIN Book_Mobile_Locations ON Book_Location.Location_ID = Book_Mobile_Locations.Location_ID
WHERE Book_Mobile_Locations.Location_ID = 3 AND Book_Location.quantity != 0;