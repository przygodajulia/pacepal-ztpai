# frontend/Dockerfile
FROM node:20

WORKDIR /app

# 1️⃣ copy only dependency manifests first (cacheable)
COPY package.json package-lock.json ./
RUN npm install

# 2️⃣ copy only what the app actually needs
COPY src ./src
COPY public ./public

EXPOSE 3000
CMD ["npm", "start"]
