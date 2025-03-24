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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/DatePicker";

const IssueBook = () => {
  return (
    <Dialog>
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
            <Input id="User" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Book" className="text-right">
              Book Name
            </Label>
            <Input id="Book" value="@peduarte" className="col-span-3" />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Issued Date
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div> */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="DatePicker" className="text-right">
              Issue and Return Date
            </Label>
            <div id="DatePicker" className="col-span-3">
              <DatePicker />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Issue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IssueBook;
