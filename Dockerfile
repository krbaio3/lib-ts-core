# Etapa 1: Construcción
FROM node:20-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y yarn.lock (si existe)
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install --frozen-lockfile

# Copia el resto del código de la aplicación
COPY . .

# Construye el proyecto
RUN yarn build

# Empaqueta el proyecto como un archivo .tgz
RUN yarn pack -o lib-react-layout-components.tgz

# Etapa 2: Configuración de Nginx
FROM nginx:alpine AS prod

# Creamos un directorio para almacenar el archivo .tgz dentro del contenedor
RUN mkdir -p /usr/share/nginx/html/packages

# Copiamos el archivo .tgz generado desde la etapa de construcción
COPY --from=build /app/lib-react-layout-components-v0.1.0.tgz /usr/share/nginx/html/packages/

# Copia el archivo de configuración de Nginx personalizado si es necesario
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
