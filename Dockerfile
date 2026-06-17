FROM node:18-alpine

WORKDIR /app

# Instala json-server de forma global dentro del contenedor
RUN npm install -g json-server

COPY . .

EXPOSE 3000

# El comando definitivo que ejecutará Render al arrancar
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]