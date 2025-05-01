# ---------- build stage ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # copy manifest files first for better layer caching
    COPY package*.json ./
    RUN npm ci
    
    COPY tsconfig*.json ./
    COPY src ./src
    COPY config ./config
    COPY .sequelizerc ./
    COPY migrations ./migrations
    RUN npm run build                # creates dist/
    
    # ---------- runtime stage ----------
    FROM node:20-alpine
    WORKDIR /app
    ENV NODE_ENV=production
    
    COPY --from=build /app/package*.json ./
    RUN npm ci --omit=dev
    
    COPY --from=build /app/dist ./dist
    
    COPY --from=build /app/config ./config
    COPY --from=build /app/.sequelizerc ./
    COPY --from=build /app/migrations ./migrations
    
    EXPOSE 3000
    CMD ["node", "dist/app.js"]