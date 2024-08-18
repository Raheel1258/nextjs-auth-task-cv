"use client";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/getUserTasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks(response.data.response);
      } else {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created On
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length > 0 ? (
            tasks.map((task: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(task.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 text-sm font-medium text-gray-900 text-center"
              >
                No tasks found
              </td>
            </tr>
          )}

          {/* More rows can be added here */}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
