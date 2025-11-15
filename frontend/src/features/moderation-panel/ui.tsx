import { useState } from "react";
import {
  Paper,
  Title,
  Group,
  Button,
  Modal,
  Stack,
  Textarea,
  Radio,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";
import { REJECTION_REASONS } from "./config";
import {
  useApproveAd,
  useRejectAd,
  useRequestChanges,
} from "../../entities/advertisement/model/useModerationActions";

interface ModerationPanelProps {
  adId: number;
}

type ActionType = "approve" | "reject" | "requestChanges";

export function ModerationPanel({ adId }: ModerationPanelProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const approveMutation = useApproveAd(adId);
  const rejectMutation = useRejectAd(adId);
  const requestChangesMutation = useRequestChanges(adId);

  const handleClose = () => {
    close();
    setSelectedReason("");
    setCustomReason("");
    setComment("");
    setActionType(null);
  };

  const handleAction = (action: ActionType) => {
    setActionType(action);
    if (action === "reject" || action === "requestChanges") {
      open();
    } else {
      approveMutation.mutate();
    }
  };

  const handleSubmit = () => {
    if (!actionType) return;

    const finalReason =
      selectedReason === "Другое" ? customReason : selectedReason;

    const params = {
      reason: finalReason || undefined,
      comment: comment || undefined,
    };

    if (actionType === "reject") {
      rejectMutation.mutate(params, { onSuccess: handleClose });
    } else if (actionType === "requestChanges") {
      requestChangesMutation.mutate(params, { onSuccess: handleClose });
    }
  };

  const isFormValid = () => {
    if (!selectedReason) return false;
    if (selectedReason === "Другое" && !customReason.trim()) return false;
    return true;
  };

  const isLoading =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    requestChangesMutation.isPending;

  return (
    <>
      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>Панель модератора</Title>
          <Group>
            <Button
              leftSection={<IconCheck size={16} />}
              color="green"
              onClick={() => handleAction("approve")}
              loading={approveMutation.isPending}
            >
              Одобрить
            </Button>
            <Button
              leftSection={<IconX size={16} />}
              color="red"
              onClick={() => handleAction("reject")}
            >
              Отклонить
            </Button>
            <Button
              leftSection={<IconPencil size={16} />}
              color="yellow"
              onClick={() => handleAction("requestChanges")}
            >
              Вернуть на доработку
            </Button>
          </Group>
        </Stack>
      </Paper>

      <Modal
        opened={opened}
        onClose={handleClose}
        title={
          actionType === "reject" ? "Отклонение объявления" : "Запрос доработки"
        }
        size="lg"
      >
        <Stack gap="md">
          <Radio.Group
            label="Причина *"
            value={selectedReason}
            onChange={setSelectedReason}
            withAsterisk
          >
            <Stack gap="xs" mt="sm">
              {REJECTION_REASONS.map((reason) => (
                <Radio key={reason} value={reason} label={reason} />
              ))}
            </Stack>
          </Radio.Group>

          {selectedReason === "Другое" && (
            <TextInput
              label="Укажите причину"
              placeholder="Введите причину..."
              value={customReason}
              onChange={(e) => setCustomReason(e.currentTarget.value)}
              required
              withAsterisk
            />
          )}

          <Textarea
            label="Комментарий (необязательно)"
            placeholder="Дополнительная информация..."
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            minRows={3}
          />

          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={handleClose}>
              Отмена
            </Button>
            <Button
              color={actionType === "reject" ? "red" : "yellow"}
              onClick={handleSubmit}
              disabled={!isFormValid()}
              loading={isLoading}
            >
              {actionType === "reject" ? "Отклонить" : "Отправить на доработку"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
