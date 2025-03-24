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

const IssuedBookDashboard = () => {
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
            <TableHead className="text-left">Issued Date</TableHead>
            <TableHead>Return Date</TableHead>

            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow className="h-12 " key={invoice.invoice}>
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
