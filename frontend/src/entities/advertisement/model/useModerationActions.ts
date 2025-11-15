import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { approveAd, rejectAd, requestChanges } from "../api/moderateAd";

interface ModerateParams {
  reason?: string;
  comment?: string;
}

export function useApproveAd(adId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => approveAd(adId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisement", adId] });
      notifications.show({
        title: "Успешно",
        message: "Объявление одобрено",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось одобрить объявление",
        color: "red",
      });
    },
  });
}

export function useRejectAd(adId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ModerateParams) => rejectAd(adId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisement", adId] });
      notifications.show({
        title: "Успешно",
        message: "Объявление отклонено",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось отклонить объявление",
        color: "red",
      });
    },
  });
}

export function useRequestChanges(adId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ModerateParams) => requestChanges(adId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisement", adId] });
      notifications.show({
        title: "Успешно",
        message: "Запрос на доработку отправлен",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось отправить запрос",
        color: "red",
      });
    },
  });
}
