# 🛒 Products REST API

A RESTful API built with **Node.js + Express + MongoDB** for managing products.  
Built as part of the **Alfido Tech MERN Stack Internship** — Task 1.

---

## 🚀 Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB Atlas** — Cloud database
- **Mongoose** — ODM for MongoDB
- **Morgan** — HTTP request logger

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/products-api.git
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
Edit `.env` and add your MongoDB Atlas URI.

### 4. Run the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

---

## 📦 Sample Request Body (POST / PUT)

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with 2.4GHz connectivity",
  "price": 799,
  "stock": 50,
  "category": "Electronics"
}
```

---

## 🌱 Environment Variables

See `.env.example`:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/productsdb
```

---

## 👤 Author

**Dharmit Monani**  
Alfido Tech Internship — MERN Stack Developer  
Candidate ID: BS/REG/119983
