# E-Commerce Project with Next.js 15

## About

This is an e-commerce project built with Next.js 15, Tailwind and Prisma, featuring both an admin section for managing categories and products, and a customer-facing shop interface with product sorting, filtering, and pagination. It also includes individual product detail pages for customers.

![image](/public/screenshot.webp)

## Features

### Shop Page

- **Product Sorting**: Customers can sort products based on various criteria.
- **Filtering by Category**: Multiple filtering options such as category, min and max price, available attributes based on category e.g size, color.
- **Pagination**: Products are paginated for better browsing experience.
- **Searchbox** A simple searchbox that finds products based user input.

### Product Details Page

- **Detailed Info**: Customers can view detailed information about each product and select based on product attributes.
- **Reviews**: Signed in users can create a review and the details page showcases ratings and reviews in a nice format.

### Serverside cart

The server-side cart is accessible to both guests and signed-in users. Guests use a cookie-stored cartToken to retain their cart during the session, while signed-in users have their cart saved in the database for access across devices.

### Orders

- A very simple order system with no actual payment functionality.
- Orders can be placed anonymously or by a signed-in user, if signed in then the user will be able to track and view their orders.

## TODO

- Improve a11y/keyboard navigation for custom star rating component.
- Show success message or redirect to a new success page after creating order.
- Overview and orders pages for users with features like cancel order, change password, delete account.
- More admin tools
