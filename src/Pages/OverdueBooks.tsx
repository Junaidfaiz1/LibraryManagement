import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotebookPen } from "lucide-react";
import { BookX } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ALL_OVERDUE_BOOKS_API, OVERDUE_PAID_API, RETURN_BOOK_API } from "@/apiRoute";

const OverdueBooks = () => {
  

  const [overdueBook, setOverdueBook] = useState<
    {
      id: string;
      bookTitle: string;
      author: string;
      status: string;
      overdue: string;
      userName: string;
    }[]
  >([]);

  const fetchOverdueBooks = async () => {
    const response = await axios.get(
        ALL_OVERDUE_BOOKS_API
    );
    const data = await response.data;
    setOverdueBook(data.formattedData);
   
  };

  useEffect(() => {
    try {
      fetchOverdueBooks();
    } catch (error) {
      console.error("Error fetching overdue books:", error);
    }
  }, []);

  const HandleReturn = async (id: string) => {
    try {
      const response = await axios.put(
        `${RETURN_BOOK_API}/${id}`
      );
      if (response.status === 200) {
        fetchOverdueBooks();
      } else {
        console.error("Error returning the book!");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  const HandlePaid = async (id: string) => {
    try {
      const response = await axios.put(
        `${OVERDUE_PAID_API}/${id}`
      );
      if (response.status === 200) {
        fetchOverdueBooks();
      } else {
        console.error("Error returning the book!");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  return (
    <div className=" bg-white dark:bg-neutral-500 rounded-2xl flex flex-col ">
      <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700  p-4">
        Overdue Book List
      </h1>
      {!overdueBook.length ? (
        <div className="flex justify-center items-center h-40">
          <NotebookPen className="h-10 w-10 text-gray-500" />
          <p className="text-gray-500">No Overdue Books</p>
        </div>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow className="h-12 ">
              <TableHead className="text-left">User Name</TableHead>
              <TableHead className="text-left">Book Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Dues</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overdueBook.map((books, index) => (
              <TableRow className="h-12 " key={index}>
                <TableCell className="text-left font-medium">
                  {books.userName}
                </TableCell>
                <TableCell>{books.bookTitle}</TableCell>
                <TableCell>{books.author}</TableCell>
                <TableCell>{books.overdue}</TableCell>
                <TableCell>{books.status}</TableCell>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <TableCell className="float-right mr-3">
                      <Ellipsis />
                    </TableCell>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Book Name</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <button
                          type="button"
                          onClick={() => HandleReturn(books.id)}
                        >
                          Book Returned
                        </button>
                        <DropdownMenuShortcut>
                          <NotebookPen />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          type="button"
                          onClick={() => HandlePaid(books.id)}
                        >
                          Overdue Paid
                        </button>

                        <DropdownMenuShortcut>
                          <BookX />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    
    </div>
  );
};

export default OverdueBooks;
