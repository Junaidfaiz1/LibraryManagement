import React from "react";
import {} from "@/components/DashboardUsers";
import { buttonVariants } from "@/components/ui/button";
import DashboardUser from "@/components/DashboardUsers";
import DashboardBook from "@/components/DashboardBooks";
import OverdueBookList from "@/components/OverdueBookLists";
import AddUser from "@/components/AddUser";
import AddBook from "@/components/AddBook";
const UserAndBookLists: React.FC = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-4 p-4">
        <div className=" bg-white dark:bg-neutral-500 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              Users Lists
            </h1>
            <div>
              <AddUser />
            </div>
          </div>
          <DashboardUser />
        </div>
        <div className="bg-white dark:bg-neutral-500 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              Books Lists
            </h1>
            <div>
             <AddBook />
            </div>
          </div>
          <DashboardBook />
        </div>
      </div>
      <OverdueBookList />
    </div>
  );
};

export default UserAndBookLists;
