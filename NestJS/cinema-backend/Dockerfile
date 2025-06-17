# Estágio 1: Builder - Instala dependências e compila o código
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Estágio 2: Production - Contém apenas o necessário para rodar
FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Adiciona a propriedade dos arquivos para o usuário 'node'
RUN chown -R node:node /app
# Troca para um usuário com menos privilégios por segurança
USER node

# Comando final para aplicar migrações, gerar o cliente e iniciar o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && node dist/main"]