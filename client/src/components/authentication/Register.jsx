import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";

      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 bg-white border border-gray-200 shadow-lg rounded-xl p-8 my-10"
        >
          {/* Branding */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold">
              <span className="text-[#6B3AC2]">Career</span>
              <span className="text-[#FA4F09]">Connect</span>
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Connecting Talent with Opportunity
            </p>

            <h2 className="font-bold text-2xl mt-6 text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Start your professional journey today
            </p>
          </div>

          {/* Fullname */}
          <div className="my-4">
            <Label>Full Name</Label>

            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="my-4">
            <Label>Email</Label>

            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label>Password</Label>

            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          {/* PAN */}
          <div className="my-4">
            <Label>PAN Card Number</Label>

            <Input
              type="text"
              value={input.pancard}
              name="pancard"
              onChange={changeEventHandler}
              placeholder="ABCDEF1234G"
            />
          </div>

          {/* Aadhaar */}
          <div className="my-4">
            <Label>Aadhaar Card Number</Label>

            <Input
              type="text"
              value={input.adharcard}
              name="adharcard"
              onChange={changeEventHandler}
              placeholder="123456789012"
            />
          </div>

          {/* Phone */}
          <div className="my-4">
            <Label>Phone Number</Label>

            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91 9876543210"
            />
          </div>

          {/* Role */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-6 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />

                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />

                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Photo */}
          <div className="flex items-center gap-3 my-4">
            <Label>Profile Photo</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={ChangeFilehandler}
              className="cursor-pointer"
            />
          </div>

          {/* Button */}
          {loading ? (
            <div className="flex items-center justify-center my-10">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="block w-full py-3 my-4 text-white font-semibold bg-[#6B3AC2] hover:bg-[#5a30a3] rounded-md transition-all duration-300"
            >
              Register
            </button>
          )}

          {/* Login */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?
            </p>

            <Link to="/login">
              <button className="w-full py-3 mt-4 text-white font-semibold bg-[#FA4F09] hover:bg-orange-700 rounded-md transition-all duration-300">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;