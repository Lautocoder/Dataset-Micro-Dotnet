# ---- Build (Vite + React + TS) ----
FROM node:22-alpine AS build
WORKDIR /app

# 1) Déps 
COPY package.json package-lock.json ./
RUN npm ci

# 2) Code
COPY . .

# 3) Variables Vite injectées au build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 4) Build (Vite -> dist/)
RUN npm run build


# ---- Runtime (Nginx) ----
FROM nginx:alpine

# (optionnel) SPA fallback + gzip etc.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vite output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
