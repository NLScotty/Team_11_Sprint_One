-- Fetches the customer contact information of the customers that spent the highest amount, and the amount they spent
SELECT Customer.Customer_ID, Customer.Name, Customer.Email, Customer.Phone, SUM(Receipt.amount)
FROM Customer JOIN Receipt ON Customer.Customer_ID = Receipt.Customer_ID
GROUP BY Customer.Customer_ID
ORDER BY SUM(Receipt.amount) DESC
Limit 3