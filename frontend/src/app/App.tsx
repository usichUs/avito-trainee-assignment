import { MantineProvider } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import { QueryProvider } from "./QueryProvider";
import { AdvertisementsPage } from "../pages/AdvertisementsPage/ui";
import { AdvertisementDetailsPage } from "../pages/AdvertisementDetailsPage/ui";
import { Notifications } from "@mantine/notifications";
import { StatisticsPage } from "../pages/StatisticsPage/ui";
import { Header } from "../widgets/Header/ui";

export default function App() {
  return (
    <QueryProvider>
      <MantineProvider>
        <Notifications />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/list" replace />} />
            <Route path="/list" element={<AdvertisementsPage />} />
            <Route path="/item/:id" element={<AdvertisementDetailsPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
          </Routes>
        </Router>
      </MantineProvider>
    </QueryProvider>
  );
}
