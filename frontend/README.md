# Frontend - Модерация объявлений

React приложение для модерации объявлений с функциями фильтрации, поиска и статистики.

## Технологии

- **React 18** + **TypeScript** + **Vite**
- **Mantine UI v8** - компонентная библиотека
- **TanStack Query v5** - управление серверным состоянием
- **React Router v6** - маршрутизация
- **Axios** - HTTP клиент
- **Mantine Charts** - графики и диаграммы

## Требования

- Node.js >= 20.x
- npm >= 10.x

## Быстрый старт

```bash
# Установка зависимостей
npm install --legacy-peer-deps

# Запуск dev сервера
npm run dev

# Приложение будет доступно на http://localhost:5173
```

### Доступные команды

```bash
npm run dev          # Запуск development сервера
npm run build        # Production сборка
npm run preview      # Просмотр production сборки
npm run lint         # Проверка кода ESLint
```

## Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=http://localhost:3001/api/v1
```

## Архитектура

Проект построен по методологии **Feature-Sliced Design (FSD)**:

```
src/
├── app/                # Инициализация приложения
│   ├── App.tsx        # Корневой компонент с роутингом
│   └── QueryProvider.tsx  # Провайдер TanStack Query
│
├── pages/             # Страницы
│   ├── AdvertisementsPage/       # Список объявлений
│   ├── AdvertisementDetailsPage/ # Детали объявления
│   └── StatisticsPage/           # Статистика
│
├── widgets/           # Композитные компоненты
│   ├── Header/                   # Навигация
│   └── AdsFilterPanel/           # Панель фильтров
│
├── features/          # Функциональные возможности
│   ├── search/        # Поиск объявлений
│   ├── sort/          # Сортировка
│   ├── filter/        # Фильтрация
│   └── moderation-panel/  # Модерация
│
├── entities/          # Бизнес-сущности
│   ├── advertisement/ # Объявления (API, хуки, типы, UI)
│   └── stats/        # Статистика
│
└── shared/           # Переиспользуемый код
    ├── api/          # HTTP клиент (Axios)
    ├── types/        # Общие типы
    └── utils/        # Утилиты
```

## Основные возможности

### 1. Список объявлений (`/list`)

- Карточки с основной информацией
- Поиск по названию и описанию (с debounce)
- Фильтры: статус, категория, диапазон цен
- Сортировка: по дате, цене, приоритету
- Пагинация

### 2. Детали объявления (`/item/:id`)

- Полная информация
- Галерея изображений (карусель)
- Панель модерации с причинами отклонения

### 3. Статистика (`/stats`)

- Карточки с метриками
- Столбчатая диаграмма активности
- Круговая диаграмма решений
- Статистика по категориям
- Фильтр по периодам

## Ключевые концепции

### State Management

**Серверное состояние** - TanStack Query:

```typescript
const { data, isLoading } = useAdvertisements({
  page: 1,
  limit: 10,
  status: ["pending"],
});
```

**Локальное состояние** - Custom hooks:

```typescript
const searchModel = useSearch(); // Поиск
const sortModel = useSort(); // Сортировка
const filtersModel = useFilters(); // Фильтры
```

### Type Safety

Полная типизация TypeScript:

```typescript
// Строгие union типы
type AdStatus = 'pending' | 'approved' | 'rejected' | 'needsWork';

// Generic функции
const updateFilter = <K extends keyof AdFiltersState>(
  key: K,
  value: AdFiltersState[K]
) => {...}
```

### API Layer

Запросы инкапсулированы в `entities/*/api`:

```typescript
// entities/advertisement/api/getAdvertisements.ts
export async function getAdvertisements(params: GetAdvertisementsParams) {
  const response = await apiClient.get<Response>("/ads", { params });
  return response.data;
}
```

Хуки для работы с API в `entities/*/model`:

```typescript
// entities/advertisement/model/useAdvertisements.ts
export function useAdvertisements(params: GetAdvertisementsParams) {
  return useQuery({
    queryKey: ["advertisements", params],
    queryFn: () => getAdvertisements(params),
  });
}
```

## API Интеграция

### Базовый URL

```typescript
// shared/api/client.ts
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
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
    signal,
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
    queryFn: ({ signal }) => getAllAds(params, signal),
    staleTime: 1000 * 60 * 5,
  });
}
```

### Endpoints

- `GET /ads` - Список объявлений
- `GET /ads/:id` - Детали объявления
- `POST /ads/:id/moderate` - Модерация
- `GET /stats/*` - Статистика

## Оптимизации

- **Debounce** для поиска (300ms)
- **useMemo** для вычисляемых значений
- **React.lazy** для code splitting (опционально)
- **Кэширование** TanStack Query (5 минут)
- **Оптимистичные обновления** при модерации

## Troubleshooting

### Ошибка установки зависимостей

```bash
npm install --legacy-peer-deps
```

### CORS ошибки

Проверьте, что бэкенд запущен и настроен на порту 3001

### 404 на API запросы

Убедитесь, что `VITE_API_URL` указывает на правильный адрес с префиксом `/api/v1`

## Документация

- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

**Автор:** Никита Усачев  
**Тестовое задание:** Авито Стажировка
