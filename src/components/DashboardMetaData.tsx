import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { UserPlus } from "lucide-react";
import { Hourglass } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { NEW_MEMBERS_API, STUDENT_COUNT_API, TOTAL_ISSUED_BOOKS_API, TOTAL_OVERDUE_BOOKS_API } from "@/apiRoute";

const DashboardMetaData: React.FC = () => {
  const [newMemvers, setNewMembers] = useState<number>(0);
  const [issuedBooks, setIssuedBooks] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [overdueBooks, setOverdueBooks] = useState<number>(0);


  useEffect(() => {
    axios.get(NEW_MEMBERS_API).then((res) => {
      setNewMembers(res.data.members);
    });
  }, []);

  useEffect(() => {
    axios.get(TOTAL_ISSUED_BOOKS_API).then((res) => {
      setIssuedBooks(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(STUDENT_COUNT_API).then((res) => {
      setTotalUsers(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(TOTAL_OVERDUE_BOOKS_API).then((res) => {
      setOverdueBooks(res.data);
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              {totalUsers}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-2">
              Total Students
            </p>
          </div>
          <div className="flex items-start justify-center">
            <div className="p-2 bg-custompink rounded-full">
              <Users size={20} className="dark:text-white light:text-black" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              {issuedBooks}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-2">
              Borrowed Books
            </p>
          </div>
          <div className="flex items-start justify-center">
            <div className="p-2 bg-custompink rounded-full">
              <BookOpenCheck
                size={20}
                className="dark:text-white light:text-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              {overdueBooks}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-2">
              Overdue Books
            </p>
          </div>
          <div className="flex items-start justify-center">
            <div className="p-2 bg-custompink rounded-full">
              <Hourglass
                size={20}
                className="dark:text-white light:text-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              {newMemvers}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-2">
              New Members
            </p>
          </div>
          <div className="flex items-start justify-center">
            <div className="p-2 bg-custompink rounded-full">
              <UserPlus
                size={20}
                className="dark:text-white light:text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetaData;
