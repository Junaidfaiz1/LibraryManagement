import { Button } from "@/components/ui/button";
import { Toast } from "./ToastMessage";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import ImagePoster from "@/assets/TCgR7rV1SqCxtjpJwfrGQg.jpeg";

const AddBook = () => {
  const imgref = useRef<HTMLInputElement>(null);

  const [formdata, setFormdata] = useState<{
    name: string;
    Author: string;
    image: string;
    Quantity: number;
  }>({
    name: "",
    Author: "",
    image: ImagePoster,
    Quantity: 0,
  });

  const SelectImage = () => {
    if (imgref.current) {
      imgref.current.click();
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormdata({ ...formdata, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const HandelSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/addbook", {
        title: formdata.name,
        image: formdata.image,
        quantity: formdata.Quantity,
        author: formdata.Author,
      });
      console.log(res);
      if (res.status === 200) {
        setFormdata({
          name: "",
          Quantity: 0,
          Author: "",
          image: ImagePoster,
        });
        Toast.success(res.data.message);
       
      } else {
        Toast.error(res.data.error);
      }
    } catch (error) {
      Toast.error("An error occurred while adding the book.");
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"lg"}>
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
          <DialogDescription>
            write the book name, author, quantity and upload the image.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Book Name
            </Label>
            <Input
              id="name"
              onChange={(e) => {
                setFormdata({ ...formdata, name: e.target.value });
              }}
              type="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Author" className="text-right">
              Author
            </Label>
            <Input
              id="Author"
              onChange={(e) => {
                setFormdata({ ...formdata, Author: e.target.value });
              }}
              type="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="Quantity"
              onChange={(e) => {
                setFormdata({
                  ...formdata,
                  Quantity: parseInt(e.target.value),
                });
              }}
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Image" className="text-right">
              Image
            </Label>
            <Input
              id="Image"
              type="file"
              ref={imgref}
              onChange={handleImage}
              accept="image/*"
              className="col-span-3 hidden"
            />
            <img
              src={formdata.image}
              onClick={SelectImage}
              alt="This is image"
              className="h-16  object-cover cursor-pointer rounded-lg ml-12"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={HandelSubmit}>
            Add Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
