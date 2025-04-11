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
  PaginationEllipsis,
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
import {useState, useEffect} from "react"
import axios from "axios";


const DashboardUser = () => {
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


  useEffect(() => {
    try {
      const fetchOverdueBooks = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/overduebooks"
        );
        const data = await response.data;
        setOverdueBook(data);
      };
      fetchOverdueBooks();
    } catch (error) {
      console.error("Error fetching overdue books:", error);
    }
  }, []);
  console.log(overdueBook);


  return (
    <div className=" bg-white dark:bg-neutral-500 rounded-2xl flex flex-col mt-10">
      <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-700  p-4">
        Overdue Book List
      </h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="h-12 ">
            <TableHead className="text-left">User Name</TableHead>
            <TableHead className="text-left">Book Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Overdue</TableHead>
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
                    Overdue Paid
                      <DropdownMenuShortcut>
                        <NotebookPen />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    Overdue Unpaid
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
        <Pagination className="flex justify-end mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-custompink dark:bg-custompink"
                isActive
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DashboardUser;
