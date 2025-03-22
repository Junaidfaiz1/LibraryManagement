import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import ModeToggle from "./components/mode-toggle";
import DashboardMetaData from "./components/DashboardMetaData";
import BookSuggestion from "./components/BookSuggestion";
import UserAndBookLists from "./Pages/UserAndBookLists";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <DashboardMetaData />
        <UserAndBookLists />
        <BookSuggestion />
      </ThemeProvider>
    </>
  );
}

export default App;
