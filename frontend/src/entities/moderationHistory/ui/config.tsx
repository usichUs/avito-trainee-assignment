import type { Action } from "..";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";

// Конфиг для действий модератора
export const actionConfig: Record<
  Action,
  { label: string; color: string; icon: React.ReactNode }
> = {
  approved: {
    label: "Одобрено",
    color: "green",
    icon: <IconCheck size={16} />,
  },
  rejected: {
    label: "Отклонено",
    color: "red",
    icon: <IconX size={16} />,
  },
  requestChanges: {
    label: "Запрошены изменения",
    color: "orange",
    icon: <IconPencil size={16} />,
  },
};
