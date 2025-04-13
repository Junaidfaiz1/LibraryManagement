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
import { UserRoundX } from "lucide-react";
import { UserPen } from "lucide-react";
import { Ellipsis } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DELETE_USER_API, USERS_API } from "@/apiRoute";

const DashboardUser = () => {
  const [users, setUsers] = useState<
    {
      _id: number;
      name: string;
      email: string;
      rnumber: string;
      department: string;
      password: string;
    }[]
  >([]);

  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fetchUsers = async () => {
    axios
      .get(`${USERS_API}?page=` + currentPage)
      .then((res) => {
        setUsers(res.data.users);
        setPage(res.data.page);
        setCurrentPage(res.data.currentPage);
      });
  };

  useEffect(() => {
    try {
      fetchUsers();
    } catch (error) {
      toast.error("Error in fetching data");
    }
  }, [currentPage]);

  const Handlesubmit = async (id: number) => {
    try {
      const res = await axios.delete(
        `${DELETE_USER_API}/${id}`
      );
      if (res.status === 200) {
        setUsers(() => res.data);
        toast.success("User Removed Successfully");
      }
    } catch (error) {
      toast.error("Error in removing user");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-center">Registration Number</TableHead>
            <TableHead className="text-center">Department</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="text-left font-medium">
                {user.name}
              </TableCell>
              <TableCell className="text-center">{user.rnumber}</TableCell>
              <TableCell className="text-center">{user.department}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <TableCell className="float-right mr-3">
                    <Ellipsis />
                  </TableCell>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>User Name</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Edit User Information
                      <DropdownMenuShortcut>
                        <UserPen />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => {
                          Handlesubmit(user._id);
                        }}
                      >
                        Remove User
                      </button>
                      <DropdownMenuShortcut>
                        <UserRoundX />
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

export default DashboardUser;
