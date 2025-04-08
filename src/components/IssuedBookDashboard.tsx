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
import IssueBook from "./IssueBook";
import { useState, useEffect } from "react";
import { Toast } from "./ToastMessage";
import axios from "axios";

const IssuedBookDashboard = () => {
  const [issuedBook, setIssuedBook] = useState<
    {
      bookTitle: string;
      issueDate: string;
      returnDate: string;
      userName: string;
    }[]
  >([]);

  useEffect(() => {
    try {
      const fetchIssuedBooks = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/getissuedbooks"
        );
        setIssuedBook(response.data);
       
      };
      fetchIssuedBooks();
    } catch (error) {
      Toast.error("Error fetching issued books:");
    }
  }, []);

  return (
    <div className=" bg-white dark:bg-neutral-500 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
          Issue Book
        </h1>
        <div>
          <IssueBook />
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="h-12 ">
            <TableHead className="text-left">Book Name</TableHead>
            <TableHead>Taken By</TableHead>
            <TableHead>Issued Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issuedBook.map((book, index) => (
            <TableRow className="h-12 " key={index}>
              <TableCell className="text-left font-medium">
                {book.bookTitle}
              </TableCell>
              <TableCell>{book.userName}</TableCell>
              <TableCell>{book.issueDate}</TableCell>
              <TableCell>{book.returnDate}</TableCell>

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
                      Edit Book Information
                      <DropdownMenuShortcut>
                        <NotebookPen />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Remove Book
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
    </div>
  );
};

export default IssuedBookDashboard;
