FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy project
COPY . .

# Build the Vite app
RUN npm run build

# Install lightweight static server
RUN npm install -g serve

# Start the static server
CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000
