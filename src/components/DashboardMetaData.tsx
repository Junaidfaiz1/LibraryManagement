import React from "react";
import { Users } from "lucide-react";
import { UserPlus } from "lucide-react";
import { Hourglass } from "lucide-react";
import { BookOpenCheck } from "lucide-react";

const DashboardMetaData: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 light:bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              1250
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-2">
              Total Visitors
            </p>
          </div>
          <div className="flex items-start justify-center">
            <div className="p-2 bg-custompink rounded-full">
              <Users size={20} className="dark:text-white light:text-black" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 light:bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              723
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

      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 light:bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              50
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

      <div className="flex items-center dark:shadow-xl dark:shadow-gray-800 shadow-xl  p-4 sm:p-6 lg:p-8 light:bg-white dark:bg-neutral-500 rounded-lg">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col flex-1 items-start">
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
              212
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
