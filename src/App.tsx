import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import ModeToggle from "./components/mode-toggle";
import DashboardMetaData from "./components/DashboardMetaData";
import BookSuggestion from "./components/BookSuggestion";
import UserAndBookLists from "./Pages/UserAndBookLists";
import IssuedBookDashboard from "./Pages/IssuedAndGraph";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer />
        <ModeToggle />
        <DashboardMetaData />
        <UserAndBookLists />
        <BookSuggestion />
        <IssuedBookDashboard />
      </ThemeProvider>
    </>
  );
}

export default App;
