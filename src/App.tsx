import "./App.css";
import {  lazy } from "react";
import DashboardMetaData from "./components/DashboardMetaData";
import BookSuggestion from "./components/BookSuggestion";
import UserAndBookLists from "./Pages/UserAndBookLists";
import IssuedBookDashboard from "./components/IssuedBookDashboard";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/Navbar";
import OverdueBookLists from "./components/OverdueBookLists";
import { AppSidebar } from "@/components/SideBar/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AddBook from "@/Pages/AddBook";
import AllBooks from "./Pages/AllBooks";
const All_Users = lazy(() => import("./Pages/AllUsers"));
const Add_User = lazy(() => import("./Pages/AddUser"));
const Issued_Books = lazy(() => import("./Pages/IssuedBooks"));
const OverdueBooks = lazy(() => import("./Pages/OverdueBooks"));
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";




const SidebarLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden dark:bg-stone-950 dark:text-white bg-gray-100 text-black">
      <ToastContainer />
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <div className="flex-1 overflow-auto">
            <Navbar />
            <main className="p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

// Home page content
const HomeContent = () => {
  return (
    <>
      <div className="">
        <DashboardMetaData />
        <UserAndBookLists />
        <BookSuggestion />
        <IssuedBookDashboard />
      </div>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SidebarLayout />}>
      <Route path="/" element={<HomeContent />} />
      <Route path="/dashboard">
        <Route path="books" element={<AllBooks />} />
        <Route path="overduebook" element={<OverdueBookLists />} />
        <Route path="user" element={<All_Users />} />
        <Route path="AddBook" element={<AddBook />} />
        <Route path="AddUser" element={<Add_User />} />
        <Route path="issuedbooks" element={<Issued_Books />} />
        <Route path="overduebooks" element={<OverdueBooks />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
