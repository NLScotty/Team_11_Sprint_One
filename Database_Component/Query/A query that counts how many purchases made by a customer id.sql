-- Replace 'your_customer_id' with the actual customer ID you are interested in
SELECT customer_ID, COUNT(*) AS purchase_count
FROM receipt
WHERE customer_ID = 'your_customer_id'
GROUP BY customer_ID;