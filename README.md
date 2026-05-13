# 🛒 Products REST API

> A production-quality **RESTful API** built with **Node.js + Express + MongoDB** for managing products.
> Built as **Task 1** of the Alfido Tech MERN Stack Developer Internship.

---

## ✨ Features

- ✅ Full **CRUD** operations — Create, Read, Update, Delete
- ✅ **Mongoose** schema with validation & error messages
- ✅ **Centralized error handling** middleware
- ✅ **HTTP request logging** with Morgan
- ✅ **MongoDB Atlas** cloud database integration
- ✅ **Environment variable** support via dotenv
- ✅ **MVC architecture** — clean, scalable folder structure
- ✅ **Postman collection** included for easy API testing

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | v18+ | Runtime environment |
| Express.js | ^4.18.2 | Web framework |
| MongoDB Atlas | Cloud | Database |
| Mongoose | ^7.6.3 | ODM for MongoDB |
| Morgan | ^1.10.0 | HTTP request logger |
| Dotenv | ^16.3.1 | Environment variables |
| Nodemon | ^3.0.1 | Auto-restart in development |

---

## 📁 Folder Structure

```
products-api/
├── src/
│   ├── controllers/
│   │   └── productController.js  → CRUD logic for all endpoints
│   ├── middleware/
│   │   └── errorHandler.js       → Centralized error handling
│   ├── models/
│   │   └── Product.js            → Mongoose schema & validation
│   ├── routes/
│   │   └── productRoutes.js      → API route definitions
│   └── app.js                    → Express app entry point
├── .env.example                  → Environment variable template
├── .gitignore
├── postman-collection.json       → Ready-to-use Postman requests
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier works)

---

### 1. Clone the repository

```bash
git clone https://github.com/Dharmit-Monani/products-api.git
cd products-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas URI:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/productsdb
```

### 4. Run the server

```bash
# Development (auto-restart on file change)
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:5000**

---

## 📡 API Endpoints

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| `GET` | `/api/products` | Get all products | 200 |
| `GET` | `/api/products/:id` | Get single product | 200 |
| `POST` | `/api/products` | Create new product | 201 |
| `PUT` | `/api/products/:id` | Update a product | 200 |
| `DELETE` | `/api/products/:id` | Delete a product | 200 |

---

## 📦 Sample Request & Response

### POST `/api/products` — Create Product

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with 2.4GHz connectivity",
  "price": 799,
  "stock": 50,
  "category": "Electronics"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6802e10f412ce062f6851ebb",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with 2.4GHz connectivity",
    "price": 799,
    "stock": 50,
    "category": "Electronics",
    "createdAt": "2026-05-10T10:00:00.000Z",
    "updatedAt": "2026-05-10T10:00:00.000Z"
  }
}
```

### GET `/api/products` — Get All Products

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [ ... ]
}
```

### Error Response Example

```json
{
  "success": false,
  "message": "Product name is required."
}
```

---

## 🌱 Environment Variables

See `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/productsdb
```

> ⚠️ Never commit your `.env` file — it is already in `.gitignore`

---

## 🧪 Testing with Postman

A ready-to-use Postman collection is included: `postman-collection.json`

**To import:**
1. Open Postman
2. Click **Import**
3. Select `postman-collection.json`
4. All 5 requests will be ready to use ✅

---

## 🗄️ Product Schema

```js
{
  name:        String  (required, max 100 chars)
  description: String  (required)
  price:       Number  (required, min 0)
  stock:       Number  (required, min 0, default 0)
  category:    String  (default: "General")
  createdAt:   Date    (auto)
  updatedAt:   Date    (auto)
}
```

---

## 🔮 Future Improvements

- 🔐 **JWT Authentication** — Secure endpoints with login/signup
- 📄 **Pagination** — Limit results with page & limit query params
- 🔍 **Search & Filter** — Query products by name, category, price range
- 📊 **Analytics Endpoint** — Total value, low stock alerts
- 🖼️ **Image Upload** — Product photos via Cloudinary
- 🌐 **Deployment** — Render / Railway cloud hosting

---

## 🔗 Related Repositories

| Task | Repository | Description |
|------|-----------|-------------|
| Task 1 | [products-api](https://github.com/Dharmit-Monani/products-api) | Node.js + Express + MongoDB REST API (this repo) |
| Task 2 | [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard) | React SPA Frontend |

---

## 👤 Author

**Dharmit Monani**
- 🏢 Alfido Tech — MERN Stack Developer Intern
- 🪪 Candidate ID: `BS/REG/119983`
- 📅 Internship Start: 10 May 2026
- 👨‍💻 Domain: MERN Stack Development

---

## 📄 License

This project is built for educational and internship submission purposes.
