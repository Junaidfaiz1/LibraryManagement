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
import axios from "axios";
import { useState } from "react";
import { Toast } from "./ToastMessage";
import { REGISTER_USER_API } from "@/apiRoute";


const AddUser = () => {
  const [formdata, setFormdata] = useState<{
    name: string;
    email: string;
    registration: string;
    department: string;
    password: string;
  }>({
    name: "",
    email: "",
    registration: "",
    department: "",
    password: "",
  });

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formdata.name === "" ||
      formdata.email === "" ||
      formdata.registration === "" ||
      formdata.department === "" ||
      formdata.password === ""
    ) {
      Toast.error("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(REGISTER_USER_API, {
        name: formdata.name,
        email: formdata.email,
        rnumber: formdata.registration,
        department: formdata.department,
        password: formdata.password,
      });
      if (res.status === 200) {
        Toast.success(res.data.message);
        setFormdata({
          name: "",
          email: "",
          department: "",
          registration: "",
          password: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Toast.error(error.response.data.error);
      } else {
        Toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"lg"}>
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            write the book name, author, quantity and upload the image.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              User Name
            </Label>
            <Input
              id="name"
              value={formdata.name}
              onChange={(e) => {
                setFormdata({ ...formdata, name: e.target.value });
              }}
              type="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-right">
              Email
            </Label>
            <Input
              value={formdata.email}
              id="Email"
              onChange={(e) => {
                setFormdata({ ...formdata, email: e.target.value });
              }}
              type="email"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Registration" className="text-start ">
              Registration Number
            </Label>
            <Input
              value={formdata.registration}
              id="Registration"
              onChange={(e) => {
                setFormdata({ ...formdata, registration: e.target.value });
              }}
              type="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Department" className="text-start ">
              Department
            </Label>
            <Input
              value={formdata.department}
              id="Department"
              onChange={(e) => {
                setFormdata({ ...formdata, department: e.target.value });
              }}
              type="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Password" className="text-right">
              Password
            </Label>
            <Input
              value={formdata.password}
              id="Password"
              onChange={(e) => {
                setFormdata({ ...formdata, password: e.target.value });
              }}
              type="password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={HandleSubmit}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
