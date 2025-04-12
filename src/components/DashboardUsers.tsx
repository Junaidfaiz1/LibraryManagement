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
import { UserRoundX } from "lucide-react";
import { UserPen } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { buttonVariants } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const fetchUsers = async () => {
    axios.get("http://localhost:3000/api/userdashboard").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    try {
      fetchUsers();
    } catch (error) {
      toast.error("Error in fetching data");
    }
  }, []);

  const Handlesubmit = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/deleteuser/${id}`
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
            <TableCell className="text-left font-medium">{user.name}</TableCell>
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
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-right bg-white dark:bg-neutral-500"
          >
            <a
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <p className="text-custompink ">See All</p>
            </a>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardUser;
