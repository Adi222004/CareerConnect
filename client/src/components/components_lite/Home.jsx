import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.job.allJobs);

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <div className="max-w-7xl mx-auto px-4">
        {loading && <p className="text-center py-10">Loading jobs...</p>}
        {error && <p className="text-red-500 text-center py-10">Error: {error}</p>}
        {!loading && !error && <LatestJobs jobs={jobs} />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
