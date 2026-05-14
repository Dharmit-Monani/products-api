# Products REST API

A REST API built with Node.js, Express and MongoDB for managing products with full JWT authentication. This covers Task 1 and Task 3 of my Alfido Tech MERN Stack Internship.

The API handles product CRUD operations and user authentication using bcrypt password hashing and JWT tokens stored in httpOnly cookies.

---

## What it does

- Register and login users securely
- Hash passwords with bcrypt before saving
- Issue JWT tokens stored in httpOnly cookies
- Protect create, update and delete product routes
- Keep GET routes public so anyone can browse products
- Handle token expiry and invalid token errors cleanly

---

## Tech Stack

- **Node.js** — runtime
- **Express.js** — web framework
- **MongoDB Atlas** — cloud database
- **Mongoose** — schema and validation
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT generation and verification
- **cookie-parser** — read httpOnly cookies from requests
- **Morgan** — request logging
- **Dotenv** — environment variables
- **Nodemon** — auto-restart in development

---

## Project Structure

```
products-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js     → register, login, logout, getMe
│   │   └── productController.js  → CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js     → JWT verification, protects routes
│   │   └── errorHandler.js      → centralized error handling
│   ├── models/
│   │   ├── User.js              → user schema with bcrypt pre-save hook
│   │   └── Product.js           → product schema
│   ├── routes/
│   │   ├── authRoutes.js        → /api/auth/*
│   │   └── productRoutes.js     → /api/products/*
│   └── app.js                   → express setup, middleware, routes
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

### 3. Create your .env file

```bash
cp .env.example .env
```

Fill in your values:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 4. Start the server

```bash
# development
npm run dev

# production
npm start
```

Server runs at `http://localhost:5000`

---

## Auth Endpoints

| Method | Endpoint | Access | What it does |
|--------|----------|--------|--------------|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Login and get cookie |
| POST | `/api/auth/logout` | Public | Clear auth cookie |
| GET | `/api/auth/me` | Protected | Get current user info |

---

## Product Endpoints

| Method | Endpoint | Access | What it does |
|--------|----------|--------|--------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get one product |
| POST | `/api/products` | Protected | Create product |
| PUT | `/api/products/:id` | Protected | Update product |
| DELETE | `/api/products/:id` | Protected | Delete product |

---

## How Authentication Works

1. User registers or logs in
2. Server hashes password with bcrypt (10 salt rounds)
3. Server generates a JWT token signed with JWT_SECRET
4. Token is sent as an httpOnly cookie — JS cannot access it
5. Every protected request automatically sends the cookie
6. Auth middleware reads and verifies the token
7. If valid, `req.user` is set and the request continues
8. If expired or invalid, a 401 response is returned

---

## Sample Request Body

**Register / Login:**
```json
{
  "name": "Dharmit Monani",
  "email": "dharmit@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
```

**Create Product (requires login):**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 799,
  "stock": 50,
  "category": "Electronics"
}
```

---

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/productsdb
JWT_SECRET=your_strong_secret_key
JWT_EXPIRE=7d
```

Never push your `.env` file — it is in `.gitignore`.

---

## Security Notes

- Passwords are hashed with bcrypt before storing — never saved as plain text
- JWT tokens expire after 7 days
- Tokens stored in httpOnly cookies — not accessible via JavaScript (XSS safe)
- sameSite strict on cookies for CSRF protection
- CORS configured to allow only the frontend origin with credentials

---

## Testing with Postman

Import `postman-collection.json` from the repo. All product requests are included. For auth testing, register first then login — the cookie will be set automatically.

---

## Things I want to improve later

- Add refresh token support so users stay logged in longer
- Add rate limiting on login to prevent brute force
- Add email verification on signup
- Deploy on Render with production environment variables

---

## Related Repos

- Task 1 + 3 — [products-api](https://github.com/Dharmit-Monani/products-api) (this repo)
- Task 2 — [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard)

---

## Author

Dharmit Monani
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
