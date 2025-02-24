import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from './Header'
import React from "react"
import Kanban from './contents/Kanban'
const Home = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full border-gray-300">
        <Navbar />
        <hr className="border-t border-gray-300" />
        <div className=" mx-4 md:mx-8 lg:mx-12 mt-5">
          <div className="mt-10">
            <Kanban />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
