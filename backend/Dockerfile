# ---------- build stage ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # copy manifest files first for better layer caching
    COPY package*.json ./
    RUN npm ci
    
    COPY tsconfig*.json ./
    COPY src ./src
    RUN npm run build                # creates dist/
    
    # ---------- runtime stage ----------
    FROM node:20-alpine
    WORKDIR /app
    ENV NODE_ENV=production
    
    # copy only production deps & built code
    COPY --from=build /app/package*.json ./
    RUN npm ci --omit=dev
    
    COPY --from=build /app/dist ./dist
    
    EXPOSE 3000
    CMD ["node", "dist/app.js"]