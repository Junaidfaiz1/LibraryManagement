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
// import { NotebookPen } from "lucide-react";
import { BookX } from "lucide-react";
import { Ellipsis } from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKS_DASHBOARD_API, DELETE_BOOK_API } from "@/apiRoute.ts";

const DashboardBooks = () => {
  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [books, setBooks] = useState<
    {
      _id: number;
      title: string;
      quantity: number;
      author: string;
      image: string;
    }[]
  >([]);


  const fetchBooks = async () => {
    axios.get(`${BOOKS_DASHBOARD_API}?page=${currentPage}`).then((res) => {
      setBooks(res.data.books);
      setPage(res.data.pages);
      setCurrentPage(res.data.currentPage);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const HandleRemove = async (id: number) => {
    try {
      const res = await axios.delete(
        `${DELETE_BOOK_API}/${id}`
      );
      if (res.status === 200) {
        fetchBooks();
        setBooks(() => res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Book Name</TableHead>
            <TableHead className="text-center">Author</TableHead>
            <TableHead className="text-center">Available</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="text-left font-medium">
                {book.title}
              </TableCell>
              <TableCell className="text-center">{book.author}</TableCell>
              <TableCell className="text-center">{book.quantity}</TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <TableCell className="float-right mr-3">
                    <Ellipsis />
                  </TableCell>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{book.title}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <button
                        onClick={() => {
                          HandleRemove(book._id);
                        }}
                      >
                        Remove Book
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
      <div>
        <Pagination className="flex justify-end mt-1 mb-4">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                />
              </PaginationItem>
            )}
            {Array.from({ length: page }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                  }}
                  className={
                    currentPage === index + 1
                      ? "bg-custompink dark:bg-custompink"
                      : ""
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < page) {
                    const next = currentPage + 1;
                    setCurrentPage(next);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default DashboardBooks;
