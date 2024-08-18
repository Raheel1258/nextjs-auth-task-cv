import React from "react";
import Navbar from "./components/Navbar";
import TaskTable from "./list/page";
import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <div className="flex gap-4">
            <Link
              href="/userCvs"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              All user cvs
            </Link>
            <Link
              href="/task/addTask"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Add New Task
            </Link>
          </div>
        </div>
        <TaskTable />
      </div>
    </div>
  );
};

export default Home;
