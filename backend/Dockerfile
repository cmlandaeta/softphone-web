# Usa una imagen base de Node.js
FROM node:19

# Crea el directorio de la aplicación en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código de la aplicación en el contenedor
COPY . .

# Expone el puerto en el que corre el microservicio
EXPOSE 9001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
