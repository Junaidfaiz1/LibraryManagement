import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  console.log(pages, currentPage);
  const [issuedBook, setIssuedBook] = useState<
    {
      id: string;
      bookTitle: string;
      issueDate: string;
      returnDate: string;
      userName: string;
      currentPage: number;
      pages: number;
    }[]
  >([]);
  console.log(issuedBook);

  const fetchIssuedBooks = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/getissuedbooks?page=${currentPage}`
    );
    setIssuedBook(response.data.formattedData);
    setPages(response.data.pages);
    setCurrentPage(response.data.currentPage);
  };

  useEffect(() => {
    try {
      fetchIssuedBooks();
    } catch (error) {
      Toast.error("Error fetching issued books:");
    }
  }, [currentPage]);

  const HandleReturn = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/returnbook/${id}`
      );
      if (response.status === 200) {
        Toast.success("Book returned successfully!");
        setIssuedBook((prevBooks) =>
          prevBooks.filter((book) => book.id !== id)
        );
      } else {
        Toast.error("Error returning the book!");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
      Toast.error("Error returning the book!");
    }
  };

  return (
    <div className=" bg-white dark:bg-neutral-500 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700">
          Issue Book
        </h1>
        <div>
          <IssueBook fetchIssuedBooks={fetchIssuedBooks} />
        </div>
      </div>
      {!issuedBook.length ? (
        <div className="flex justify-center items-center h-40">
          <NotebookPen className="h-10 w-10 text-gray-500" />
          <p className="text-gray-500">No Issued Books</p>
        </div>
      ) : (
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
                        <button
                          type="button"
                          onClick={() => HandleReturn(book.id)}
                        >
                          Book Returned
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
      <div>
        <Pagination className="flex justify-end mt-1 mb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((prev) => prev - 1);
                    
                  }
                }}
              />
            </PaginationItem>

            {Array.from({ length: pages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={
                    currentPage === index + 1
                      ? "bg-custompink dark:bg-custompink"
                      : ""
                  }
                  isActive={currentPage === index + 1}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < pages) {
                    setCurrentPage((prev) => prev + 1);
                    
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default IssuedBookDashboard;
