import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { buttonVariants } from "./ui/button";

import axios from "axios";
import { useEffect, useState } from "react";

const DashboardUser = () => {
  const [books, setBooks] = useState<
    {
      _id: number;
      title: string;
      quantity: number;
      author: string;
      image: string;
    }[]
  >([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/bookdashboard").then((res) => {
      setBooks(res.data);
    });
  }, []);

  const HandleRemove = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/deletebook/${id}`
      );
      if (res.status === 200) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Book Name</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Available</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book, index) => (
          <TableRow key={index} className="h-12">
            <TableCell className="text-left font-medium">
              {book.title}
            </TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.quantity}</TableCell>
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
                  {/* <DropdownMenuItem>
                    Edit Book Information
                    <DropdownMenuShortcut>
                      <NotebookPen />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem> */}
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
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={4}
            className="text-right  bg-white dark:bg-neutral-500"
          >
            <a
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <p className="text-custompink">See All</p>
            </a>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardUser;
