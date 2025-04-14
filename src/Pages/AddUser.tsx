import { useState } from "react";
import axios from "axios";
import { Toast } from "@/components/ToastMessage";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
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
        // Reset form after successful submission
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
    <div className="max-w-2xl mx-auto  p-8 rounded-lg shadow-md dark:shadow-xl dark:shadow-gray-800 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold ">Add User</h1>
        <p className=" mt-1">
          Register a new user 
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium "
          >
            User Name
          </label>
          <input
            id="name"
            type="text"
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="john.doe@example.com"
          />
        </div>

        {/* Registration Number Field */}
        <div className="space-y-2">
          <label
            htmlFor="registration"
            className="block text-sm font-medium "
          >
            Registration Number
          </label>
          <input
            id="registration"
            type="text"
            value={formdata.registration}
            onChange={(e) =>
              setFormdata({ ...formdata, registration: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="REG12345"
          />
        </div>

        {/* Department Field */}
        <div className="space-y-2">
          <label
            htmlFor="department"
            className="block text-sm font-medium "
          >
            Department
          </label>
          <input
            id="department"
            type="text"
            value={formdata.department}
            onChange={(e) =>
              setFormdata({ ...formdata, department: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Computer Science"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium "
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
