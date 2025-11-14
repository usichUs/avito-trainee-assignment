export const statusOptions = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "draft", label: "Черновик" },
];

export const categoryOptions = [
  { value: "0", label: "Электроника" },
  { value: "1", label: "Недвижимость" },
  { value: "2", label: "Транспорт" },
  { value: "3", label: "Работа" },
  { value: "4", label: "Услуги" },
  { value: "5", label: "Животные" },
  { value: "6", label: "Мода" },
  { value: "7", label: "Детское" },
];

export const sortOptions = [
  { value: "createdAt-desc", label: "Сначала новые" },
  { value: "createdAt-asc", label: "Сначала старые" },
  { value: "price-asc", label: "Сначала дешевые" },
  { value: "price-desc", label: "Сначала дорогие" },
  { value: "priority-desc", label: "Сначала срочные" },
  { value: "priority-asc", label: "Сначала обычные" },
];
