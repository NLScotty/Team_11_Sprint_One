-- Replace 'your_purchase_id' with the actual purchase ID you are interested in
SELECT r.purchase_ID, r.date_time, r.amount, r.payment_type,
       b.book_ID, b.isbn, b.title, b.year, b.author_ID, b.genre_ID, 
       br.quantity
FROM receipt r
JOIN book_receipt br ON r.purchase_ID = br.purchase_ID
JOIN book b ON br.book_ID = b.book_ID
WHERE r.purchase_ID = 'your_purchase_id';