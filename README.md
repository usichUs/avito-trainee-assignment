# Avito Trainee Assignment - Модерация объявлений

Веб-приложение для модерации объявлений с функциями просмотра, фильтрации, модерации и статистики.

## Технологии

### Frontend

- **React 18** + **TypeScript**
- **Vite** - сборщик
- **Mantine UI** - компонентная библиотека
- **TanStack Query** - управление серверным состоянием
- **React Router** - маршрутизация
- **Axios** - HTTP клиент
- **Mantine Charts** - визуализация данных

### Backend

- **Node.js** + **Express**
- **Mock данные** для демонстрации

### DevOps

- **Docker** + **Docker Compose**

## Требования

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Docker** >= 20.10 (для запуска через Docker)
- **Docker Compose** >= 2.0 (для запуска через Docker)

## Функциональность

### Основные возможности:

**Список объявлений**

- Просмотр всех объявлений
- Фильтрация по статусу, категории, цене
- Поиск по названию и описанию
- Сортировка (по дате, цене, приоритету)
- Пагинация

**Детальная страница объявления**

- Просмотр полной информации
- Галерея изображений
- Модерация (одобрить/отклонить/вернуть на доработку)
- Указание причины отклонения

**Статистика модерации**

- Общая статистика по модерации
- График активности по дням
- Распределение решений (круговая диаграмма)
- Статистика по категориям
- Фильтрация по периодам

## Архитектура проекта

Проект построен по методологии **Feature-Sliced Design (FSD)**:

```
frontend/src/
├── app/                    # Инициализация приложения
│   ├── App.tsx            # Корневой компонент
│   └── QueryProvider.tsx  # Провайдер TanStack Query
│
├── pages/                  # Страницы приложения
│   ├── AdvertisementsPage/    # Список объявлений
│   ├── AdvertisementDetailsPage/  # Детали объявления
│   └── StatisticsPage/        # Статистика
│
├── widgets/                # Сложные компоненты
│   ├── Header/            # Шапка с навигацией
│   └── AdsFilterPanel/    # Панель фильтров
│
├── features/              # Бизнес-функции
│   ├── search/            # Поиск
│   ├── sort/              # Сортировка
│   ├── filter/            # Фильтрация
│   └── moderation-panel/  # Панель модерации
│
├── entities/              # Бизнес-сущности
│   ├── advertisement/     # Объявления
│   │   ├── api/          # API запросы
│   │   ├── model/        # Хуки и логика
│   │   ├── types/        # Типы
│   │   └── ui/           # UI компоненты
│   └── stats/            # Статистика
│
└── shared/               # Общие утилиты
    ├── api/              # HTTP клиент
    ├── types/            # Общие типы
    └── utils/            # Вспомогательные функции
```

## Быстрый старт

### Вариант 1: Запуск через Docker (рекомендуется)

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd avito-trainee-assignment

# Запустите проект
docker-compose up --build

# Приложение будет доступно:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

**Управление контейнерами:**

```bash
# Запуск в фоновом режиме
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f frontend
docker-compose logs -f backend

# Остановка
docker-compose down

# Полная очистка (с удалением образов)
docker-compose down --rmi all --volumes
```

### Вариант 2: Локальная разработка

#### Backend

```bash
cd tech-int3-server

# Установка зависимостей
npm install

# Запуск сервера
npm start

# Сервер будет доступен на http://localhost:3001
```

#### Frontend

```bash
cd frontend

# Установка зависимостей
npm install --legacy-peer-deps

# Запуск dev сервера
npm run dev

# Приложение будет доступно на http://localhost:5173
```

**Доступные команды:**

```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка для production
npm run preview      # Просмотр production сборки
npm run lint         # Проверка кода
```

## Конфигурация

### Переменные окружения

#### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3001/api/v1
```

#### Backend

```env
PORT=3001
NODE_ENV=development
```

## Основные концепции

### State Management

#### TanStack Query

Используется для управления серверным состоянием:

- Автоматическое кэширование
- Повторные запросы при ошибках
- Оптимистичные обновления
- Инвалидация кеша

```typescript
// Пример использования
const { data, isLoading, error } = useAdvertisements({
  page: 1,
  limit: 10,
  status: ["pending"],
});
```

#### Custom Hooks

Локальное состояние управляется через custom hooks:

- `useSearch()` - состояние поиска
- `useSort()` - состояние сортировки
- `useFilters()` - состояние фильтров

### API Layer

Все API запросы инкапсулированы в отдельные функции:

```typescript
// entities/advertisement/api/getAdvertisements.ts
export async function getAdvertisements(params: GetAdvertisementsParams) {
  const response = await apiClient.get<GetAdvertisementsResponse>("/ads", {
    params,
  });
  return response.data;
}
```

### Отмена запросов (Request Cancellation)

Все API функции поддерживают отмену запросов через `AbortSignal`:

```typescript
// entities/advertisement/api/getAllAds.ts
export async function getAllAds(
  params?: GetAllAdsParams,
  signal?: AbortSignal // Поддержка отмены
): Promise<GetAdvertisementsResponse> {
  const response = await apiClient.get<GetAdvertisementsResponse>("/ads", {
    params,
    signal, // Передается в Axios
  });
  return response.data;
}
```

TanStack Query автоматически отменяет запросы при размонтировании компонента:

```typescript
// entities/advertisement/model/useAdvertisements.ts
export function useAdvertisements(params?: GetAllAdsParams) {
  return useQuery({
    queryKey: ["advertisements", params],
    queryFn: ({ signal }) => getAllAds(params, signal), // Signal передается автоматически
    staleTime: 1000 * 60 * 5,
  });
}
```

### Type Safety

Проект полностью типизирован с TypeScript:

```typescript
// Строгие типы для всех сущностей
export type AdStatus = 'pending' | 'approved' | 'rejected' | 'needsWork';

// Union типы из конфигурации
export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

// Generic функции для type-safe обновлений
const updateFilter = <K extends keyof AdFiltersState>(
  key: K,
  value: AdFiltersState[K]
) => {...}
```

## UI/UX

### Компонентная библиотека

Используется **Mantine UI v8** для единообразного дизайна:

### Уведомления

```typescript
import { notifications } from "@mantine/notifications";

notifications.show({
  title: "Успешно",
  message: "Объявление одобрено",
  color: "green",
});
```

### Графики

Используется **Mantine Charts** (обертка над Recharts):

- Линейные графики
- Столбчатые диаграммы
- Круговые диаграммы

## Тестирование

```bash
# Запуск тестов (если настроены)
npm test

# Линтинг
npm run lint
```

## Основные страницы

### 1. Список объявлений (`/list`)

- Карточки объявлений с основной информацией
- Панель фильтров (поиск, статус, категория, цена)
- Сортировка
- Пагинация

### 2. Детали объявления (`/item/:id`)

- Полная информация об объявлении
- Галерея изображений (карусель)
- Панель модерации (для модераторов)
- Связанные объявления (опционально)

### 3. Статистика (`/stats`)

- Карточки с ключевыми метриками
- График активности модерации
- Круговая диаграмма распределения решений
- Диаграмма по категориям
- Фильтр по периодам (сегодня, неделя, месяц, произвольный)

## API Endpoints

### Объявления

- `GET /api/v1/ads` - Список объявлений
- `GET /api/v1/ads/:id` - Детали объявления
- `POST /api/v1/ads/:id/approve` - Одобрить объявление
- `POST /api/v1/ads/:id/reject` - Отклонить объявление
- `POST /api/v1/ads/:id/request-change` - Запросить изменеиня в объявлении

### Статистика

- `GET /api/v1/stats/summary` - Общая статистика
- `GET /api/v1/stats/chart/activity` - График активности
- `GET /api/v1/stats/chart/decisions` - Распределение решений
- `GET /api/v1/stats/chart/categories` - Статистика по категориям

## Troubleshooting

### Проблема: Не устанавливаются зависимости

**Решение:** Используйте флаг `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

### Проблема: Docker контейнеры не запускаются

**Решение:**

```bash
# Полная очистка
docker-compose down --volumes
docker system prune -a

# Повторная сборка
docker-compose up --build
```

## Дополнительные материалы

### Feature-Sliced Design

- [Документация FSD](https://feature-sliced.design/)
- [Примеры архитектуры](https://github.com/feature-sliced/examples)

### Библиотеки

- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com/)

## Автор

Никита Усачев

---

**Примечание:** Это тестовое задание для стажировки в Авито
