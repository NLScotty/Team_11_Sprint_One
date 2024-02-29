-- Used to keep track of most frequent buyers
SELECT customer_ID, COUNT(*) AS purchase_count
FROM receipt
WHERE receipt.customer_id IS NOT null
GROUP BY customer_ID;