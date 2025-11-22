# Client Guide: lunor.ko E-Commerce Platform

## Table of Contents
1. [Overview](#overview)
2. [Project Architecture](#project-architecture)
3. [Customer-Facing Website Features](#customer-facing-website-features)
4. [Admin Dashboard Features](#admin-dashboard-features)
5. [How It Works](#how-it-works)
6. [User Flows](#user-flows)
7. [Technical Features](#technical-features)
8. [Supported Payment Methods](#supported-payment-methods)

---

## Overview

**lunor.ko** is a fully functional e-commerce platform designed for selling fashion products (clothing, accessories, and more). The website provides a modern, user-friendly shopping experience for customers while offering powerful management tools for administrators to control products, orders, and inventory.

### What This Platform Does

- **For Customers**: Browse products, add items to cart, place orders, track purchases, and manage their account
- **For Administrators**: Manage product inventory, view and update orders, control product listings, and monitor sales

### Key Highlights

- Modern, responsive design that works on all devices (desktop, tablet, mobile)
- Secure user authentication and data protection
- Real-time shopping cart that syncs across sessions
- Complete order management system
- Professional admin dashboard for store management

---

## Project Architecture

The platform consists of **three main components**:

### 1. **Frontend (Customer Website)**
- Built with React and modern web technologies
- Beautiful, animated user interface
- Responsive design for all screen sizes
- Located in `/frontend` directory

### 2. **Backend (Server & API)**
- Node.js and Express server
- RESTful API for all operations
- Database management with MongoDB
- Secure authentication system
- Located in `/backend` directory

### 3. **Admin Dashboard**
- Separate React application for administrators
- Product management interface
- Order tracking and status updates
- Located in `/admin` directory

---

## Customer-Facing Website Features

### 🏠 **Home Page**
- **Hero Section**: Eye-catching video background with call-to-action buttons
- **Latest Collection**: Showcases newest products added to the store
- **Best Sellers**: Displays featured/popular products
- **Company Policies**: Information about shipping, returns, quality, and support
- **Newsletter Signup**: Email subscription feature

### 🛍️ **Product Browsing (Collection Page)**
- View all available products in one place
- Filter by categories:
  - **Men's Wear**
  - **Women's Wear**
  - **Kids' Wear**
- Filter by product types:
  - Topwear, Bottomwear, Winterwear
  - Handbags, Shoes, Watches
- Search functionality to find specific products
- Grid layout with product images and prices

### 📦 **Product Details Page**
- High-quality product images (up to 4 images per product)
- Detailed product description
- Size selection (S, M, L, XL, XXL)
- Price information
- "Add to Cart" functionality
- Related products suggestions

### 🛒 **Shopping Cart**
- View all selected items
- Update quantities for each item
- Remove items from cart
- Size-specific item management
- Real-time price calculation
- Subtotal and delivery fee display
- **Floating Cart Button**: Quick access to cart from any page
- Cart persists across browser sessions (for logged-in users)

### 👤 **User Account Management**

#### **Login & Registration**
- Secure user registration with email and password
- Login functionality
- Session management (stays logged in)
- Protected routes for logged-in users

#### **User Profile**
- View account information
- See order history count
- Access to order management
- Profile avatar with user initials

### 📋 **Order Management**

#### **Placing Orders**
1. Add products to cart
2. Proceed to checkout
3. Fill in delivery information:
   - Full name
   - Email address
   - Complete shipping address
   - Phone number
4. Select payment method:
   - **Cash on Delivery (COD)** ✅ (Currently Active)
   - Stripe (Ready for integration)
   - Razorpay (Ready for integration)
5. Confirm and place order

#### **Order History**
- View all past orders
- See order details:
  - Items purchased
  - Quantities and sizes
  - Order date
  - Total amount
  - Order status (Order Placed, Packing, Shipped, Out for delivery, Delivered)

### 🔍 **Search Functionality**
- Global search bar accessible from navigation
- Search products by name
- Real-time search results
- Quick access to product pages

### 📱 **Additional Pages**
- **About Page**: Information about the company/brand
- **Contact Page**: Contact information and inquiry forms
- **Footer**: Links to important pages and social media

---

## Admin Dashboard Features

### 🔐 **Secure Admin Login**
- Separate authentication system for administrators
- Secure access control
- Session management

### ➕ **Add Products**
The admin can add new products with the following details:
- **Product Images**: Upload up to 4 high-quality images
- **Product Name**: Descriptive product title
- **Description**: Detailed product information
- **Price**: Set product pricing in ₹ (Indian Rupees)
- **Category**: Select from Men, Women, or Kids
- **Sub-Category**: Choose type (Topwear, Bottomwear, Winterwear, Handbags, Shoes, Watches)
- **Available Sizes**: Select which sizes are available (S, M, L, XL, XXL)
- **Bestseller Flag**: Mark products as featured/bestsellers

Images are automatically uploaded to Cloudinary (cloud storage) for fast loading.

### 📋 **Product List Management**
- View all products in the store
- See product details (name, price, category, sizes)
- **Delete Products**: Remove products that are no longer available
- Quick access to product information

### 📦 **Order Management**
View and manage all customer orders:
- **Order Details**: See complete order information
  - Customer name and delivery address
  - Items ordered (with sizes and quantities)
  - Order date
  - Total amount
  - Payment method
  - Payment status
- **Order Status Updates**: Change order status through the process:
  - Order Placed (initial status)
  - Packing
  - Shipped
  - Out for delivery
  - Delivered (final status)

### 📊 **Dashboard Overview**
- Sidebar navigation for quick access to all features
- Clean, professional interface
- Responsive design
- Real-time order updates

---

## How It Works

### Customer Shopping Flow

1. **Browse Products**
   - Customer visits the website
   - Views home page with featured collections
   - Browses the product catalog

2. **Product Selection**
   - Clicks on a product to see details
   - Selects desired size
   - Adds item to cart

3. **Cart Management**
   - Views cart with selected items
   - Adjusts quantities or removes items
   - Reviews total amount

4. **Checkout**
   - If not logged in, customer can still add to cart (local storage)
   - To place order, customer must log in or create account
   - Fills in delivery address
   - Selects payment method
   - Places order

5. **Order Confirmation**
   - Order is saved to database
   - Cart is cleared
   - Customer can view order in "My Orders" section
   - Admin receives notification (via admin panel)

### Admin Management Flow

1. **Login**
   - Admin accesses admin dashboard
   - Logs in with admin credentials

2. **Product Management**
   - Adds new products with images and details
   - Manages existing products (view/edit/delete)
   - Marks products as bestsellers

3. **Order Processing**
   - Views new orders in admin panel
   - Updates order status as it progresses
   - Monitors order details and customer information

### Data Flow

```
Customer Website → Backend API → MongoDB Database
                                    ↓
Admin Dashboard ← Backend API ← MongoDB Database
```

- All customer actions (cart, orders) communicate with the backend API
- Backend validates requests and stores data in MongoDB
- Admin dashboard reads from the same database
- Real-time synchronization between customer actions and admin view

---

## User Flows

### New Customer Journey

```
Visit Website
    ↓
Browse Products (No login required)
    ↓
View Product Details
    ↓
Add to Cart (Works locally, no login needed)
    ↓
Ready to Checkout?
    ↓
Create Account / Login
    ↓
Fill Delivery Information
    ↓
Select Payment Method
    ↓
Place Order
    ↓
View Order Confirmation
    ↓
Track Order Status (in "My Orders")
```

### Returning Customer Journey

```
Login to Account
    ↓
Cart Synced (if logged in during previous visit)
    ↓
Continue Shopping or Checkout
    ↓
View Order History
    ↓
Track Current Orders
```

### Admin Workflow

```
Login to Admin Dashboard
    ↓
Add New Products
    OR
View Orders
    ↓
Update Order Status
    OR
Manage Product Inventory
```

---

## Technical Features

### Security
- **JWT Authentication**: Secure token-based authentication for users and admins
- **Password Encryption**: User passwords are securely hashed
- **Protected Routes**: Unauthorized access is prevented
- **API Security**: Backend validates all requests

### Performance
- **Cloud Image Storage**: Product images stored on Cloudinary for fast loading
- **Optimized Loading**: Efficient database queries
- **Responsive Images**: Images load appropriately for different devices

### User Experience
- **Smooth Animations**: Modern UI animations using Framer Motion and GSAP
- **Toast Notifications**: Clear feedback for user actions
- **Loading States**: Visual indicators during data fetching
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Data Management
- **MongoDB Database**: Scalable NoSQL database
- **Cart Persistence**: Shopping cart saved for logged-in users
- **Order History**: Complete order tracking
- **Real-time Updates**: Order status updates reflect immediately

---

## Supported Payment Methods

### Currently Active
- ✅ **Cash on Delivery (COD)**: Pay when the order is delivered

### Ready for Integration
- 🔄 **Stripe**: Online payment gateway (code structure ready)
- 🔄 **Razorpay**: Indian payment gateway (code structure ready)

*Note: Payment gateway integrations can be activated by adding API keys in the backend configuration.*

---

## Key Statistics & Capabilities

### Product Management
- **Unlimited Products**: Add as many products as needed
- **Multiple Images**: Up to 4 images per product
- **Flexible Categories**: 3 main categories × 6 sub-categories = 18 product type combinations
- **Size Variants**: Manage 5 different sizes per product

### Order Processing
- **Complete Order Tracking**: 5-stage order status system
- **Customer Communication**: Full customer details and addresses stored
- **Order History**: Complete record of all orders
- **Status Management**: Easy status updates from admin panel

### User Accounts
- **User Registration**: Unlimited user accounts
- **Profile Management**: User can view account information
- **Order History**: Users can track all their orders
- **Secure Sessions**: Automatic login persistence

---

## Summary

**lunor.ko** e-commerce platform provides a **complete solution** for running an online fashion store:

✅ **For Customers**: Easy browsing, shopping, and order tracking  
✅ **For Admins**: Powerful tools to manage products and orders  
✅ **Modern Technology**: Built with latest web technologies  
✅ **Scalable**: Can handle growth as your business expands  
✅ **Secure**: Professional security practices implemented  
✅ **Responsive**: Works on all devices and screen sizes  

The platform is ready for production use and can be easily customized to match your brand identity and business needs.

---

**Need Help?**  
If you have questions about any feature or need modifications, please contact your development team.

