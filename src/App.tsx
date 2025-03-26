import "./App.css";
import DashboardMetaData from "./components/DashboardMetaData";
import BookSuggestion from "./components/BookSuggestion";
import UserAndBookLists from "./Pages/UserAndBookLists";
import IssuedBookDashboard from "./Pages/IssuedAndGraph";
import { ToastContainer } from "react-toastify";
import {Navbar} from "./components/Navbar";
function App() {
  return (
    <>

        <ToastContainer />
        <Navbar/>
        <DashboardMetaData />
        <UserAndBookLists />
        <BookSuggestion />
        <IssuedBookDashboard />
     
    </>
  );
}

export default App;
