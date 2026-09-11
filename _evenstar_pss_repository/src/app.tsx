import { AppShell } from "./components/app-shell";
import { StoreProvider } from "./lib/store";
import { ThemeProvider } from "./lib/theme";

export function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AppShell />
      </StoreProvider>
    </ThemeProvider>
  );
}
