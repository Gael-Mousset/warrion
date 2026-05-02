# Utilisationde l'image Node.js pour construire le projet
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json .
RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline
COPY . .

ARG VITE_API_LOCAL_URL
ENV VITE_API_LOCAL_URL=$VITE_API_LOCAL_URL

RUN npm run build


# utilisationde Nginx pour servir le staiques
FROM nginx:stable
# config nginx avec fallback SPA
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# fichier statique
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8088
CMD ["nginx", "-g", "daemon off;"]