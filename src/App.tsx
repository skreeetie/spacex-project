import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { LaunchesPage } from "./pages/LaunchesPage";

export const App = () => {
  return (
    <MantineProvider>
      <LaunchesPage />
    </MantineProvider>
  );
};
