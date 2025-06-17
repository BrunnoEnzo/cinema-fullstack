# --- Construir a Aplicação React ---
FROM node:lts-alpine AS react_builder
WORKDIR /app

# Declara o argumento que será recebido do docker-compose.yml
ARG VITE_API_BASE_URL
# Torna o argumento uma variável de ambiente para o build do Vite
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Copia os arquivos de dependência do React
COPY ../Cinema-React/package*.json ./
RUN npm install

# Copia todo o código-fonte do React
COPY ../Cinema-React .
# Gera a build de produção do React
RUN npm run build


# --- Montar a imagem final do Nginx ---
FROM nginx:stable-alpine
# Copia os arquivos estáticos construídos no estágio anterior para a pasta padrão do Nginx
COPY --from=react_builder /app/dist /usr/share/nginx/html

# CORREÇÃO AQUI: Adicionado o caminho 'nginx/' para encontrar o arquivo corretamente
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]