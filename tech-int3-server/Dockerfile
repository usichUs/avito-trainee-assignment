FROM node:22-alpine

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код
COPY . .

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]