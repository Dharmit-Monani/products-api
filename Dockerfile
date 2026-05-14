# ─── Stage 1: Build ──────────────────────────────────────────
# Use lightweight Node 18 alpine image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first — Docker cache optimization
# If package.json hasn't changed, npm install won't re-run
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "src/app.js"]
