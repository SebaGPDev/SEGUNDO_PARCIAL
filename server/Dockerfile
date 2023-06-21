# Utiliza una imagen base de Docker llamada `node:18-alpine`.
# Esta imagen se basa en Alpine Linux y contiene la versión 18 de Node.js.
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor como `/server`.
WORKDIR /server

# Copia el archivo `package.json` y `package-lock.json` (si existe) desde el directorio local al directorio `/server` del contenedor.
# Esto permite instalar las dependencias de la aplicación.
COPY package*.json ./

# Ejecuta el comando `npm install` dentro del directorio `/server` del contenedor.
# Esto instalará todas las dependencias especificadas en el archivo `package.json`.
RUN npm install

# Copia todos los archivos y directorios desde el directorio local al directorio `/server` del contenedor.
# Esto incluye todos los archivos de la aplicación.
COPY . .

# Expone el puerto 4000 en el contenedor.
# Esto permite que otros contenedores o el host accedan al servicio que se ejecuta en este puerto.
EXPOSE 4000

# Define el comando que se ejecutará cuando el contenedor se inicie.
# En este caso, ejecutará `npm start`, que generalmente se usa para iniciar la aplicación Node.js.
CMD ["npm", "start"]
