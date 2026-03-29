# Flipkart Clone - Full Stack E-Commerce Application

A full-stack Flipkart-inspired e-commerce web application built as part of the Scaler SDE Intern Fullstack Assignment.

This project demonstrates the implementation of a modern e-commerce platform with product browsing, product details, search and filtering, cart management, wishlist functionality, checkout flow, order placement, order history, and email confirmation without requiring user authentication, as per assignment requirements.

---

## Live Demo

Frontend (Vercel):  
https://flipkart-clone-76ml.vercel.app/

Backend API (Render):  
https://flipkart-clone-api-ksfu.onrender.com

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Context API
- CSS3 (Custom Styling)
- Axios

### Backend
- Node.js
- Express.js
- MySQL-compatible database (TiDB Cloud)
- mysql2
- Nodemailer
- dotenv

### Deployment
- Vercel (Frontend)
- Render (Backend)
- TiDB Cloud (Database)

---

## Features Implemented

### Core Features
- Product listing page
- Product detail page
- Search products by name and brand
- Category filtering
- Add to cart
- Update cart quantity
- Remove from cart
- Checkout flow
- Place order
- Order success flow
- Order history lookup using email

### Extended Features
- Wishlist functionality
- Order confirmation email after checkout
- Responsive and modern UI
- Persistent order storage in database
- Product image gallery on product detail page
- Faster revisit experience using client-side caching for product data

---

## Assignment Requirement Alignment

This project follows the assignment requirement that authentication is not required.

Implementation approach:
- No login or signup flow is included
- Customer email is collected during checkout
- The same email is used to:
  - send order confirmation email
  - fetch order history

This keeps the application simple while still supporting post-order user actions.

---

## Project Structure

```bash
flipkart_clone/
│
├── client/                         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── cart/
│   │   │   └── product/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node + Express backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── schema.sql
│   ├── .env
│   └── package.json
│
├── package.json                    # Root scripts for running client + server
└── README.md
```
Functionalities
1. Product Browsing
Users can browse all available products
Products are displayed in a clean Flipkart-inspired layout
Product cards show image, title, brand, rating, price, and discount
2. Search and Filtering
Search products by product name or brand
Filter products by category
Search and category filters work together for refined results
3. Product Detail Page
View full product details
View multiple product images
See product description and specifications
Add product to cart directly
Buy product immediately from detail page
4. Cart Management
Add items to cart
Increase or decrease quantity
Remove items from cart
Cart count is reflected in the navbar
5. Wishlist
Add products to wishlist
Remove products from wishlist
Wishlist is stored client-side for quick access
6. Checkout and Order Placement
No login required
User enters:
customer name
email
phone number
address details
Order is stored in the database
Order items are stored separately for proper order mapping
7. Order History
User can fetch previous orders using the same email used during checkout
Order history displays matching orders and purchased items
8. Order Confirmation Email
After successful checkout, an order confirmation email is sent
Email includes:
order ID
total amount
ordered items
Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd flipkart_clone
2. Install dependencies
Root
npm install
Client
cd client
npm install
Server
cd ../server
npm install
Database Setup

This project uses a MySQL-compatible schema and can run with:

MySQL (local development)
TiDB Cloud (deployed version)
1. Create database

For local MySQL:

CREATE DATABASE flipkart_clone;
2. Run the schema file

Open:

server/schema.sql

Execute the SQL in MySQL Workbench, MySQL CLI, or TiDB SQL Editor.

This creates:

categories
products
product_images
orders
order_items
sample seed data
Environment Variables
Server (server/.env)
PORT=5000

DB_HOST=your_db_host
DB_PORT=4000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=flipkart_clone
DB_SSL=true

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_FROM=Flipkart Clone <your_email@gmail.com>
Client (client/.env)
VITE_API_BASE_URL=http://localhost:5000
Client Production (client/.env.production)
VITE_API_BASE_URL=https://flipkart-clone-api-ksfu.onrender.com
Email Configuration

This project sends an order confirmation email after successful checkout.

For Gmail:

Use a Gmail App Password
Do not use your normal Gmail password
Steps
Enable 2-Step Verification on your Google account
Go to App Passwords
Generate a new app password
Use that value in:
MAIL_PASS=your_gmail_app_password

Note:

If email sending fails, the order can still be saved successfully in the database
Email sending is handled separately from order creation to avoid blocking the main flow
Running the Project Locally
Run both frontend and backend together (from root)
npm run dev

This starts:

Frontend: http://localhost:5173
Backend: http://localhost:5000
Or run separately
Frontend
cd client
npm run dev
Backend
cd server
npm run dev
API Endpoints
Products
GET /api/products → Get all products
GET /api/products/:id → Get product details
GET /api/products/categories/all → Get all categories
Orders
POST /api/orders → Place order
GET /api/orders → Get all orders
GET /api/orders/history?email=<email> → Get order history by email
Optional Health Check
GET /api/health → Health check route (recommended for uptime monitoring if enabled)
Deployment Notes
Frontend
Deployed on Vercel
Backend
Deployed on Render
Database
Connected to TiDB Cloud using MySQL-compatible connection
Important Note About Free Render Deployment

This project uses Render free tier for backend hosting.

Because of Render free tier limitations:

the backend service may spin down after inactivity
the first API request after inactivity can take significantly longer than normal
in some cases, the initial response may take around 30–60 seconds

This is known as a cold start issue and is expected on free-tier backend hosting.

What this means in practice
First visit after long inactivity may feel slow
Product list or product details may take time on the very first request
After the backend wakes up, subsequent requests become much faster
Current Optimization

To improve user experience:

client-side caching is used for product list data
client-side caching is used for product detail data
repeat visits feel much faster after the first successful load
Recommended Production Improvement

For a smoother production experience:

use a paid backend instance on Render
or use an uptime monitor (such as UptimeRobot) to periodically ping the backend
or move backend hosting to a provider without aggressive sleep on free tier
Database Verification

To verify order persistence:

SELECT * FROM orders;
SELECT * FROM order_items;
Design Decisions
Why no login?

The assignment explicitly states that authentication is not required.

Therefore:

checkout collects user email
email is used for order confirmation
email is used to fetch order history

This keeps the flow simple and aligned with assignment requirements.

Why use client-side cart and wishlist?

Cart and wishlist are intentionally lightweight in this version:

simpler assignment scope
faster UI interactions
no authentication dependency
easier local persistence
Why keep schema.sql in the repository?

The schema file is included so that:

database design is visible to reviewers
setup is reproducible
project structure looks professional
future contributors can initialize the database easily
Known Limitations
Cart is currently client-side
Wishlist is currently client-side
No authentication system
No payment gateway integration (mock checkout flow)
Render free tier cold starts may delay the first backend response after inactivity
Performance on first visit depends on backend wake-up time
Possible Future Improvements
Persistent cart in database
Persistent wishlist in database
User authentication and protected order history
Payment integration (Razorpay / Stripe)
Product reviews and ratings system
Sorting and pagination
Admin dashboard
Inventory management
Better skeleton loaders and toast notifications
Dedicated health monitoring / uptime ping for backend


Author
Krrish Parashar

Built as part of the Scaler SDE Intern Fullstack Assignment.

---
