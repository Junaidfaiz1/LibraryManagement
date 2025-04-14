import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Toast } from "@/components/ToastMessage";
import { BOOK_NAMES_API, ISSUE_BOOK_API, STUDENT_NAMES_API } from "@/apiRoute";

interface User {
  _id: string;
  name: string;
}

interface Book {
  _id: string;
  title: string;
}

const IssueBook = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [issueDate, setIssueDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [calendarOpen, setCalendarOpen] = useState({
    issue: false,
    return: false,
  });

  const [formData, setFormData] = useState<{
    userId: string;
    bookId: string;
  }>({
    userId: "",
    bookId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, booksResponse] = await Promise.all([
          axios.get(STUDENT_NAMES_API),
          axios.get(BOOK_NAMES_API),
        ]);

        setUsers(usersResponse.data);
        setBooks(booksResponse.data);
      } catch (error) {
        Toast.error("Error in fetching data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!issueDate || !returnDate) {
      Toast.error("Please select issue and return dates");
      return;
    }

    if (issueDate > returnDate) {
      Toast.error("Issue date cannot be greater than return date");
      return;
    }

    if (formData.userId === "" || formData.bookId === "") {
      Toast.error("Please select user and book");
      return;
    }

    const payload = {
      ...formData,
      issueDate: issueDate.toISOString(),
      returnDate: returnDate.toISOString(),
    };

    try {
      const res = await axios.post(ISSUE_BOOK_API, payload);

      if (res.status === 200) {
        Toast.success("Book issued successfully");

        // Reset form
        setIssueDate(undefined);
        setReturnDate(undefined);
        setFormData({ userId: "", bookId: "" });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Toast.error(error.response.data.error);
      } else {
        Toast.error("An unexpected error occurred");
      }
    }
  };

  // Helper function to determine if a date should be disabled in the return date calendar
  const isDateDisabled = (date: Date) => {
    return !issueDate || date < issueDate || date < new Date();
  };

  return (
    <div className="max-w-2xl mx-auto  p-8 rounded-lg shadow-md dark:shadow-xl dark:shadow-gray-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Book</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Selection */}
        <div className="space-y-2">
          <label htmlFor="user" className="block text-sm font-medium ">
            User Name
          </label>
          <select
            id="user"
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Book Selection */}
        <div className="space-y-2">
          <label htmlFor="book" className="block text-sm font-medium ">
            Book Name
          </label>
          <select
            id="book"
            value={formData.bookId}
            onChange={(e) =>
              setFormData({ ...formData, bookId: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a Book</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        {/* Issue Date */}
        <div className="space-y-2">
          <label htmlFor="issueDate" className="block text-sm font-medium ">
            Issue Date
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setCalendarOpen({ ...calendarOpen, issue: !calendarOpen.issue })
              }
              className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <span className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 " />
                {issueDate ? format(issueDate, "PPP") : "Pick issue date"}
              </span>
            </button>

            {calendarOpen.issue && (
              <div className="absolute z-10 p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="calendar-container">
                  {/* Simple calendar UI - in a real app, use a proper calendar component */}
                  <div className="flex justify-between mb-2">
                    <button
                      type="button"
                      className="p-1 "
                      onClick={() => {
                        const date = new Date();
                        setIssueDate(date);
                        setCalendarOpen({ ...calendarOpen, issue: false });
                      }}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      className="p-1 "
                      onClick={() =>
                        setCalendarOpen({ ...calendarOpen, issue: false })
                      }
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="p-1 font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => {
                      const date = new Date();
                      date.setDate(i + 1);
                      return (
                        <button
                          type="button"
                          key={i}
                          className={`p-1 rounded hover:bg-gray-100 ${
                            issueDate && date.getDate() === issueDate.getDate()
                              ? "bg-indigo-100 "
                              : ""
                          }`}
                          onClick={() => {
                            setIssueDate(date);
                            setCalendarOpen({ ...calendarOpen, issue: false });
                          }}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <label htmlFor="returnDate" className="block text-sm font-medium">
            Return Date
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setCalendarOpen({
                  ...calendarOpen,
                  return: !calendarOpen.return,
                })
              }
              className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <span className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 " />
                {returnDate ? format(returnDate, "PPP") : "Pick return date"}
              </span>
            </button>

            {calendarOpen.return && (
              <div className="absolute z-10 p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="calendar-container">
                  {/* Simple calendar UI - in a real app, use a proper calendar component */}
                  <div className="flex justify-between mb-2">
                    <button
                      type="button"
                      className="p-1 "
                      onClick={() => {
                        if (issueDate) {
                          const date = new Date(issueDate);
                          date.setDate(date.getDate() + 14); // 2 weeks later
                          setReturnDate(date);
                          setCalendarOpen({ ...calendarOpen, return: false });
                        }
                      }}
                      disabled={!issueDate}
                    >
                      +14 days
                    </button>
                    <button
                      type="button"
                      className="p-1 "
                      onClick={() =>
                        setCalendarOpen({ ...calendarOpen, return: false })
                      }
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="p-1 font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => {
                      const date = new Date();
                      date.setDate(i + 1);
                      const disabled = isDateDisabled(date);
                      return (
                        <button
                          type="button"
                          key={i}
                          disabled={disabled}
                          className={`p-1 rounded ${
                            disabled
                              ? " cursor-not-allowed"
                              : "hover:bg-gray-100"
                          } ${
                            returnDate &&
                            date.getDate() === returnDate.getDate()
                              ? "bg-indigo-100 text-indigo-800"
                              : ""
                          }`}
                          onClick={() => {
                            if (!disabled) {
                              setReturnDate(date);
                              setCalendarOpen({
                                ...calendarOpen,
                                return: false,
                              });
                            }
                          }}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Issue Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueBook;
