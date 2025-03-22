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

const invoices = [
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const DashboardUser = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">User Name</TableHead>
          <TableHead>Book Issued</TableHead>
          <TableHead>Department</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow className="h-12" key={invoice.invoice}>
            <TableCell className="text-left font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>

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
                    Remove User
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
          <TableCell colSpan={4} className="text-right">
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
