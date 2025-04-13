import "./App.css";
import DashboardMetaData from "./components/DashboardMetaData";
import BookSuggestion from "./components/BookSuggestion";
import UserAndBookLists from "./Pages/UserAndBookLists";
import IssuedBookDashboard from "./components/IssuedBookDashboard";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/Navbar";
function App() {
  return (

    <div>  
      <ToastContainer />
      <Navbar />
      <DashboardMetaData />
      <UserAndBookLists />
      <BookSuggestion />
      <IssuedBookDashboard />
    </div>
  );
}

export default App;
