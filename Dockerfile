FROM node:12-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# --- Serve with nginx ---
FROM nginx:1.21-alpine

COPY --from=build /app/dist/demo /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
