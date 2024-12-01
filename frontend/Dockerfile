# Etapa 1: Construcción
FROM node:19 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copia los archivos estáticos generados en la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto por defecto de Nginx
EXPOSE 80

# Comando por defecto para Nginx
CMD ["nginx", "-g", "daemon off;"]


## Desarrrollo
# FROM node:19

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host"]
