FROM node:22-alpine

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем весь код
COPY . .

# Аргумент для API URL
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL

# Собираем приложение
RUN npm run build

# Устанавливаем простой HTTP сервер
RUN npm install -g serve

EXPOSE 3000

# Запускаем сервер для раздачи статики
CMD ["serve", "-s", "dist", "-l", "3000"]