
# Flipkart Clone - Full Stack E-Commerce Application

A full-stack Flipkart-inspired e-commerce web application built as part of the **Scaler SDE Intern Fullstack Assignment**.

This project demonstrates the implementation of a modern e-commerce platform with product browsing, product details, cart management, wishlist, checkout flow, order placement, order history, and email confirmation — all without requiring user login, as per assignment requirements.

---

##  Tech Stack

### Frontend
- **React.js**
- **React Router DOM**
- **Context API**
- **CSS3 (Custom Styling)**

### Backend
- **Node.js**
- **Express.js**
- **MySQL**
- **mysql2**
- **Nodemailer**

---

##  Features Implemented

### Core Features
- Product listing page
- Product detail page
- Search products by name/brand
- Category filtering
- Add to cart
- Update cart quantity
- Remove from cart
- Checkout flow
- Place order
- Order success page

### Extended Features
- Wishlist functionality
- Order history (email-based, no login required)
- Order confirmation email after checkout
- Responsive and modern UI
- MySQL-based persistent order storage

---

##  Assignment Requirement Alignment

This project follows the assignment requirement that:

- **No login / authentication is required**
- Customer **email is collected during checkout**
- The same email is used to:
  - send order confirmation email
  - fetch order history

This design choice ensures the application remains simple while still supporting post-order user actions.

---

##  Project Structure

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
│   │   ├── App.jsx
│   │   └── main.jsx
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
│   │   ├── seed/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── schema.sql
│   ├── .env
│   └── package.json
│
├── package.json                    # Root scripts for running client + server
└── README.md
````

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd flipkart_clone
```

---

### 2. Install dependencies

### Root

```bash
npm install
```

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

##  Database Setup (MySQL)

### 1. Create database manually in MySQL Workbench

Open MySQL Workbench and run:

```sql
CREATE DATABASE flipkart_clone;
```

---

### 2. Run the schema file

Open:

```bash
server/schema.sql
```

Copy the SQL and execute it in MySQL Workbench.

This will create:

* categories
* products
* product_images
* orders
* order_items
* and seed/sample data

> **Note:** The `schema.sql` file is included in the repository for version control and reproducibility.
> It must still be executed manually (or via MySQL CLI) to initialize the database.

---

##  Environment Variables

Create a `.env` file inside the `server` folder.

### `server/.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flipkart_clone

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_FROM=Flipkart Clone <your_email@gmail.com>
```

---

## 📧 Email Configuration (Important)

This project sends an **order confirmation email** after successful checkout.

### For Gmail:

Use a **Gmail App Password**, not your normal Gmail password.

### Steps:

1. Enable **2-Step Verification** on your Google account
2. Go to **App Passwords**
3. Generate a new app password
4. Use that 16-character password in:

```env
MAIL_PASS=your_gmail_app_password
```

> If email sending fails, the order is still saved successfully in the database.

---

##  Running the Project

### Run both frontend and backend together (from root)

```bash
npm run dev
```

This starts:

* Frontend → `http://localhost:5173`
* Backend → `http://localhost:5000`

---

### Or run separately

#### Frontend

```bash
cd client
npm run dev
```

#### Backend

```bash
cd server
npm run dev
```

---

## API Endpoints

### Products

* `GET /api/products` → Get all products
* `GET /api/products/:id` → Get product details

### Orders

* `POST /api/orders` → Place order
* `GET /api/orders` → Get all orders (basic)
* `GET /api/orders/history/:email` → Get order history by email *(if implemented in your final version)*

---

##  Application Flow

### Product Browsing

* User lands on home page
* Can search products
* Can filter by category
* Can view product details

### Cart + Wishlist

* Products can be added to cart
* Products can be added to wishlist
* Wishlist is stored client-side for quick access

### Checkout

* No login required
* User enters:

  * name
  * email
  * phone
  * address details

### Order Placement

* Order is saved in:

  * `orders`
  * `order_items`
* Confirmation email is sent to the entered email address

### Order History

* User enters the same email used during checkout
* Matching orders are displayed

---

##  Database Verification

To verify that orders are being stored correctly, run:

```sql
SELECT * FROM orders;
```

```sql
SELECT * FROM order_items;
```

---

## 📸 UI Notes

The UI is designed to be:

* clean
* modern
* recruiter-friendly
* Flipkart-inspired
* responsive for basic screen sizes

Additional effort was made to:

* improve layout consistency
* handle missing/broken product images gracefully
* keep the interface professional and minimal

---

##  Design Decisions

### Why no login?

The assignment explicitly states that **authentication is not required**.

Therefore:

* checkout collects user email
* email is used for order confirmation
* email is also used to fetch order history

This keeps the flow simple while still providing a user-friendly post-purchase experience.

### Why store `schema.sql` in the repository?

The schema file is included so that:

* database design is visible to reviewers
* setup is reproducible
* project structure is more professional
* future contributors can initialize the database easily

---

##  Known Limitations

* Wishlist is currently client-side (localStorage / Context API based)
* Cart is currently client-side
* Payment gateway is not integrated (mock checkout flow)
* Admin dashboard is not included
* Deployment configuration may vary based on environment

---

##  Possible Future Improvements

* Persistent cart in MySQL
* Persistent wishlist in MySQL
* User authentication
* Razorpay / Stripe integration
* Product reviews and ratings
* Pagination / sorting
* Admin product management
* Deployment to Render / Vercel / Railway

---

##  Author

**Krrish**
Built as part of the **Scaler SDE Intern Fullstack Assignment**

---
