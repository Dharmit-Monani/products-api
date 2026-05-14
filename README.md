# Products REST API

A REST API built with Node.js, Express and MongoDB for managing products. This project covers Task 1, Task 3 and Task 4 of my Alfido Tech MERN Stack Internship.

It handles product CRUD operations and user authentication using bcrypt and JWT tokens stored in httpOnly cookies. The entire app is containerized with Docker.

---

## What it does

- Register and login users securely
- Hash passwords with bcrypt before saving
- Issue JWT tokens stored in httpOnly cookies
- Protect create, update and delete routes
- Keep GET routes public for browsing products
- Handle token expiry and invalid sessions
- Run inside Docker with MongoDB container

---

## Tech Stack

- **Node.js** — runtime
- **Express.js** — web framework
- **MongoDB** — database (Atlas for dev, Docker container for production)
- **Mongoose** — schema and validation
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT tokens
- **cookie-parser** — read httpOnly cookies
- **Morgan** — request logging
- **Dotenv** — environment variables
- **Nodemon** — auto-restart in development

---

## Project Structure

```
products-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   └── app.js
├── Dockerfile
├── .dockerignore
├── .env.example
├── .gitignore
├── postman-collection.json
├── package.json
└── README.md
```

---

## Running Locally (without Docker)

### 1. Clone and install

```bash
git clone https://github.com/Dharmit-Monani/products-api.git
cd products-api
npm install
```

### 2. Create .env file

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

### 3. Start the server

```bash
npm run dev
```

Server runs at `http://localhost:5000`

---

## Running with Docker

The easiest way to run the full stack is with Docker Compose from the root Alfido folder.

```bash
cd D:\Alfido
docker compose up
```

This starts:
- MongoDB container
- Backend on port 5000
- Frontend on port 80

Visit `http://localhost` in your browser.

To stop:

```bash
docker compose down
```

---

## Auth Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login and get cookie |
| POST | `/api/auth/logout` | Public | Clear auth cookie |
| GET | `/api/auth/me` | Protected | Get current user |

---

## Product Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Protected | Create product |
| PUT | `/api/products/:id` | Protected | Update product |
| DELETE | `/api/products/:id` | Protected | Delete product |

---

## How Auth Works

1. User registers or logs in
2. Password hashed with bcrypt (10 salt rounds)
3. JWT token generated and sent as httpOnly cookie
4. Every protected request sends the cookie automatically
5. Auth middleware verifies the token
6. If valid, request goes through — if not, 401 returned

---

## Sample Request Body

**Register:**
```json
{
  "name": "Dharmit Monani",
  "email": "dharmit@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
```

**Create Product (login required):**
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
MONGO_URI=mongodb://mongo:27017/productsDB
JWT_SECRET=your_strong_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
```

Never push your `.env` — it is in `.gitignore`.

---

## Security

- Passwords never stored as plain text — always bcrypt hashed
- JWT tokens expire after 7 days
- Tokens in httpOnly cookies — not accessible via JavaScript
- sameSite strict cookies for CSRF protection
- CORS allows only the frontend origin with credentials

---

## Testing with Postman

Import `postman-collection.json` from the repo. Register first, then login — the cookie sets automatically and all protected requests work.

---

## Things I want to improve

- Add refresh token support
- Add rate limiting on login endpoint
- Add email verification on signup
- Deploy to cloud with proper environment secrets

---

## Related Repos

- Task 1 + 3 + 4 — [products-api](https://github.com/Dharmit-Monani/products-api) (this repo)
- Task 2 — [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard)

---

## Author

Dharmit Monani
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
