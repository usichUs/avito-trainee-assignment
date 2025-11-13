import { Container, Title, Stack } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
import { useAdvertisements } from "../entities/advertisement";
import { AdList } from "../entities/advertisement/ui/AdList";

export function AdvertisementsPage() {
  //   const navigate = useNavigate();
  const { data, isLoading, error } = useAdvertisements();

  const handleAdClick = (id: number) => {
    // navigate(`/ads/${id}`);
    console.log(`ad with number ${id}`);
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>Все объявления</Title>
        <AdList
          ads={data?.ads || []}
          isLoading={isLoading}
          error={error}
          onAdClick={handleAdClick}
        />
      </Stack>
    </Container>
  );
}
