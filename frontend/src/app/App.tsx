import { MantineProvider } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import { QueryProvider } from "./QueryProvider";
import { AdvertisementsPage } from "../pages/AdvertisementsPage";

export default function App() {
  return (
    <QueryProvider>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/list" replace />} />
            <Route path="/list" element={<AdvertisementsPage />} />
          </Routes>
        </Router>
      </MantineProvider>
    </QueryProvider>
  );
}
