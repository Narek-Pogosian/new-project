# E-Commerce Project with Next.js 15

This is an e-commerce project built with Next.js 15, featuring both an admin section for managing categories and products, and a customer-facing shop interface with product sorting, filtering, and pagination. It also includes individual product detail pages for customers.

## Tech Stack

- **Next.js 15**
- **Postgres**
- **Tailwind CSS**

## Features

### Shop Page:

- **Product Sorting**: Customers can sort products based on various criteria.
- **Filtering by Category**: TODO: more filtering options, can filter products by category for now.
- **Pagination**: Products are paginated for better browsing experience.
- **Searchbox** Coming soon

### Product Details Page:

- **Detailed Info**: Customers can view detailed information about each product and select based on product attributes.
- **Reviews**: Coming soon

### Serverside cart:

The server-side cart is accessible to both guests and signed-in users. Guests use a cookie-stored cartToken to retain their cart during the session, while signed-in users have their cart saved in the database for access across devices.

### Admin Section:

- Admins can create and manage product categories.
- Admins can create, edit, and delete products.

### Orders:

- A very simple order system with no actual payment functionality.
- Orders can be place anonymously or by a signed-in user, if signed in then the user will be able to track and view their orders.
- TODO: show succes message or redirect to a new success page after creating order.
