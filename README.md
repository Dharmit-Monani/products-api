# Products REST API

A simple REST API built with Node.js, Express and MongoDB to manage products. This is Task 1 of my Alfido Tech MERN Stack Internship.

The API supports basic CRUD operations — you can create, read, update and delete products. Data is stored in MongoDB Atlas (cloud).

---

## Tech Stack

- **Node.js** — server runtime
- **Express.js** — web framework
- **MongoDB Atlas** — cloud database
- **Mongoose** — for schema and validation
- **Morgan** — logs incoming requests in terminal
- **Dotenv** — manages environment variables

---

## Project Structure

```
products-api/
├── src/
│   ├── controllers/
│   │   └── productController.js  
│   ├── middleware/
│   │   └── errorHandler.js       
│   ├── models/
│   │   └── Product.js            
│   ├── routes/
│   │   └── productRoutes.js      
│   └── app.js                    
├── .env.example
├── .gitignore
├── postman-collection.json
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Dharmit-Monani/products-api.git
cd products-api
```

### 2. Install packages

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

You can copy from `.env.example` as a reference.

### 4. Run the server

```bash
# development
npm run dev

# production
npm start
```

Server will start at `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/api/products` | Returns all products |
| GET | `/api/products/:id` | Returns one product by ID |
| POST | `/api/products` | Creates a new product |
| PUT | `/api/products/:id` | Updates an existing product |
| DELETE | `/api/products/:id` | Deletes a product |

---

## Sample Request

**POST** `/api/products`

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
    "price": 799,
    "stock": 50,
    "category": "Electronics",
    "createdAt": "2026-05-10T10:00:00.000Z"
  }
}
```

---

## Product Schema

```
name        - required, max 100 characters
description - required
price       - required, cannot be negative
stock       - required, default is 0
category    - optional, default is "General"
createdAt   - auto generated
updatedAt   - auto generated
```

---

## Testing with Postman

I've included a `postman-collection.json` file in the repo. Just import it in Postman and all 5 requests will be ready to test.

---

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/productsdb
```

Note: Never push your `.env` file — it's already in `.gitignore`.

---

## What I'd like to add later

- Add search and filter support on the GET endpoint
- Add pagination so large data doesn't slow things down
- Add JWT auth to protect routes
- Deploy on Render or Railway

---

## Author

Dharmit Monani
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
