import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { Toast } from "./ToastMessage";

const IssueBook = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<
    {
      _id: string;
      name: string;
    }[]
  >([]);

  const [book, setBook] = useState<
    {
      _id: string;
      title: string;
    }[]
  >([]);

  const [issueDate, setIssueDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const [formdata, setFormData] = useState<{
    userId: string;
    bookId: string;
  }>({
    userId: "",
    bookId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/usernames");
        setUser(res.data);
        const res1 = await axios.get("http://localhost:3000/api/booknames");
        setBook(res1.data);
      } catch (error) {
        Toast.error("Error in fetching data");
      }
    };
    fetchData();
  }, []);

  const HandleSubmit = async () => {
    if (!issueDate || !returnDate) {
      Toast.error("Please select issue and return dates");
      return;
    }
    if (issueDate > returnDate) {
      Toast.error("Issue date cannot be greater than return date");
      return;
    }
    if (formdata.userId === "" || formdata.bookId === "") {
      Toast.error("Please select user and book");
      return;
    }

    const payload = {
      ...formdata,
      issueDate: issueDate.toISOString(),
      returnDate: returnDate.toISOString(),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/issuebook",
        payload
      );
      if (res.status === 200) {
        Toast.success("Book issued successfully");
     
        setOpen(false);
      } else {
        Toast.error("Error in issuing book");
      }
    } catch (error) {
      Toast.error("Error in issuing book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
        <Button variant="outline">Issue Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Issue Book</DialogTitle>
          <DialogDescription>Issue Book to User</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="User" className="text-right">
              User Name
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formdata, userId: value })
              }
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a User" />
              </SelectTrigger>
              {user.map((u, index) => (
                <SelectContent key={index}>
                  <SelectGroup>
                    <SelectItem value={u._id} key={index}>
                      {u.name}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Book" className="text-right">
              Book Name
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formdata, bookId: value })
              }
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Book" />
              </SelectTrigger>
              <SelectContent>
                {book.map((b, index) => (
                  <SelectGroup>
                    <SelectItem key={index} value={b._id}>
                      {b.title}
                    </SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="DatePicker" className="text-right">
              Issue Date
            </Label>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !issueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {issueDate ? (
                        format(issueDate, "PPP")
                      ) : (
                        <span>Pick issue date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={issueDate}
                      onSelect={setIssueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ReturnDate" className="text-right">
              Return Date
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? (
                      format(returnDate, "PPP")
                    ) : (
                      <span>Pick return date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    disabled={(date) =>
                      !issueDate || date < issueDate || date < new Date()
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={HandleSubmit}>
            Issue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IssueBook;
