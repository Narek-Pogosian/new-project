# E-Commerce Project with Next.js 15

This is an e-commerce project built with Next.js 15, featuring both an admin section for managing categories and products, and a customer-facing shop interface with product sorting, filtering, and pagination. It also includes individual product detail pages for customers.

## Features

### Shop Page:

- **Product Sorting**: Customers can sort products based on various criteria.
- **Filtering by Category**: Customers can filter products by category.
- **Pagination**: Products are paginated for better browsing experience.

### Product Details Page:

Customers can view detailed information about each product and select based on product attributes.

### Serverside cart:

The cart is managed server-side and can be accessed both anonymously or by a signed-in user. Anonymous users have a unique cartToken stored in cookies, allowing them to maintain their cart during the session. Signed-in users have their cart linked to their account, stored in the database for seamless access across devices. This ensures a consistent and persistent cart experience, even after page reloads or logging out.

### Admin Section:

- **Manage Categories**: Admins can create and manage product categories.
- **Manage Products**: Admins can create, edit, and delete products.

### TODO:

- **Orders**
- **Reviews**

## Tech Stack

- **Next.js 15**: Framework used for building both the front-end and back-end.
- **Postgres** (or another database): For storing product and category data (adjust as needed).
- **Tailwind CSS**: For styling the app.
