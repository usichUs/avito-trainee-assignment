import { MantineProvider } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { QueryProvider } from "./QueryProvider";
import { AdvertisementsPage } from "../pages/AdvertisementsPage/ui";
import { AdvertisementDetailsPage } from "../pages/AdvertisementDetailsPage/ui";

export default function App() {
  return (
    <QueryProvider>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/list" replace />} />
            <Route path="/list" element={<AdvertisementsPage />} />
            <Route path="/item/:id" element={<AdvertisementDetailsPage />} />
          </Routes>
        </Router>
      </MantineProvider>
    </QueryProvider>
  );
}
