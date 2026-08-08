import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, FileText, Briefcase, Building2, HomeIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  // 1. Get user from Redux store
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. Logout Logic
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
        
        {/* LOGO SECTION */}
        <div>
          <Link to="/">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-[#6B3AC2]">Career</span>
              <span className="text-[#FA4F09]">Connect</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Connecting Talent with Opportunity
            </p>
          </Link>
        </div>

        {/* NAVIGATION LINKS & AUTH BUTTONS */}
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {/* If user is a Recruiter, show Admin navigation */}
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="flex items-center gap-1 hover:text-[#6B3AC2] transition">
                    <Building2 size={18} /> Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="flex items-center gap-1 hover:text-[#6B3AC2] transition">
                    <Briefcase size={18} /> Jobs
                  </Link>
                </li>
              </>
            ) : (
              /* If user is Student or Not Logged In, show General navigation */
              <>
                <li>
                  <Link to="/" className="flex items-center gap-1 hover:text-[#6B3AC2] transition">
                    <HomeIcon size={18} /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="flex items-center gap-1 hover:text-[#6B3AC2] transition">
                    <Briefcase size={18} /> Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#6B3AC2] transition">Browse</Link>
                </li>
                <li>
                  <Link to="/resume-builder" className="flex items-center gap-1 hover:text-[#6B3AC2] transition">
                    <FileText size={18} /> Resume Builder
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* AUTH SECTION */}
          {!user ? (
            <div className="flex items-center gap-3">
              {/* Navigate to Login */}
              <Link to="/login">
                <Button variant="outline" className="rounded-md border-[#6B3AC2] text-[#6B3AC2] hover:bg-[#6B3AC2] hover:text-white transition">
                  Login
                </Button>
              </Link>

              {/* Navigate to Register */}
              <Link to="/register">
                <Button className="bg-[#6B3AC2] hover:bg-[#5a30a3] text-white rounded-md transition">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            /* USER PROFILE DROPDOWN (Logged In State) */
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-gray-100 hover:ring-[#6B3AC2] transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-800 truncate">{user?.fullname}</h3>
                    <p className="text-xs text-gray-500 truncate">{user?.profile?.bio || "No bio added"}</p>
                  </div>
                </div>

                <hr className="my-2" />

                <div className="flex flex-col gap-1">
                  {user.role === "Student" && (
                    <>
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition group text-gray-600"
                      >
                        <User2 size={20} className="group-hover:text-[#6B3AC2]" />
                        <span className="text-sm font-medium">View Profile</span>
                      </Link>

                      <Link 
                        to="/resume-builder" 
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition group text-gray-600"
                      >
                        <FileText size={20} className="group-hover:text-[#6B3AC2]" />
                        <span className="text-sm font-medium">My Resumes</span>
                      </Link>
                    </>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-md transition group text-red-600 mt-2"
                  >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;