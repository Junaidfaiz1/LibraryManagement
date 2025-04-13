import "./App.css";
import DashboardMetaData from "./components/DashboardMetaData";
import BookSuggestion from "./components/BookSuggestion";
import UserAndBookLists from "./Pages/UserAndBookLists";
import IssuedBookDashboard from "./components/IssuedBookDashboard";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/Navbar";
import OverdueBookLists from "./components/OverdueBookLists";
import DashboardUser from "./components/DashboardUsers";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="dark:bg-stone-950 dark:text-white bg-gray-100 text-black">
      <ToastContainer />
      <Navbar />
      <DashboardMetaData />
      <UserAndBookLists />
      <BookSuggestion />
      <IssuedBookDashboard />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <div className="mt-4">
              <Outlet /> {/* Add this to render nested routes */}
            </div>
          </>
        }
      >
        <Route path="issuedbook" element={<IssuedBookDashboard />} />
        <Route path="overduebook" element={<OverdueBookLists />} />
        <Route path="user" element={<DashboardUser />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
