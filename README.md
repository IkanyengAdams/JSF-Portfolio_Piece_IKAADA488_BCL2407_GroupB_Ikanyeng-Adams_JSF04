# SwiftCart E-Commerce Application
This is a comprehensive e-commerce application built with Vue.js, designed to provide a robust and user-friendly shopping experience. Leveraging the FakeStore API, the application dynamically fetches and displays product data, offering a variety of features to enhance the shopping experience.

# Table of Contents

1.Introduction
2.Features
3.Technologies Used
4.Installation
5.Usage
6.Components
7.API
8.Responsive Design

# Introduction

This Vue.js e-commerce application provides users with a comprehensive online shopping experience. It allows users to browse through an extensive product listing, filter products by category, search for specific items, and sort results by price. Detailed product pages offer insights including descriptions, images, ratings, and reviews. The application's intuitive navigation and responsive design ensure a seamless experience across all devices.

# Features

-Product Listing: Displays a list of products fetched from the FakeStore API.
-Product Details: Provides detailed information about a product when selected.
-Search: Allows users to search for products by name.
-Category Filtering: Filters products by category.
-Sorting: Sorts products by price (low to high or high to low).
-Wishlist: Users can add items to their wishlist, with options to remove or view them.
-Cart: Add items to the shopping cart, with functionality to view, remove, and clear items.
-Authentication: Users must log in to access certain features like the wishlist and cart.
-Responsive Design: Ensures the application is fully functional on both desktop and mobile devices.

# Technologies Used

-Vue.js: JavaScript framework for building the user interface.
-Vue Router: For handling routing and navigation.
-Vuex: State management for handling the application state.
-Axios: For making HTTP requests to the FakeStore API.
-Local Storage: To persist wishlist and cart data across sessions.
-JWT (JSON Web Tokens): For authentication and secure access.
-Vanilla CSS: For styling and responsive design.

# Installation

1. Clone the repository:
   git clone https://github.com/yourusername/vue-ecommerce.git

2. Install dependencies:
   npm install

3. Run the development server:
  npm run serve

# Usage

Product List Page: The home page displays a list of products. You can filter by category, search by product name, and sort by price.
Product Details Page: Click on a product to view detailed information.
Wishlist: Access the wishlist to view, remove, or add items to the cart.
Cart: View items in the cart, remove them, or proceed to checkout.
Authentication: Log in to access restricted features and persist cart and wishlist data.

# Components

App.vue: The main component that sets up the routes for the application.
Navbar.vue: Handles navigation and displays links to the product list, wishlist, cart, and login.
ProductList.vue: Displays the list of products with filtering, searching, and sorting options.
ProductDetail.vue: Shows detailed information about a selected product.
Wishlist.vue: Manages the wishlist functionality, including filtering and sorting.
Cart.vue: Handles the shopping cart operations and displays items.
Login.vue: Manages user authentication and login.

# API

This application uses the FakeStore API to fetch product data. Endpoints used include:

Product Listing: https://fakestoreapi.com/ /products
Product Categories: https://fakestoreapi.com/ /product/categories
Product Details: https://fakestoreapi.com/ /products/:id

# Responsive Design
The application is designed to be fully responsive, ensuring a seamless experience on both large screens (desktops) and small screens (mobile devices). Key features include:

Flexbox Layouts: For flexible and adaptive layouts.
Media Queries: To adjust styling based on screen size.
Responsive Components: Navbar, product cards, and buttons adjust for optimal usability on different devices.

[Deployed project link](https://portfolio-ikaada-488-bcl-2407-group-b-ikanyeng-adams-jsf-04.vercel.app/)




