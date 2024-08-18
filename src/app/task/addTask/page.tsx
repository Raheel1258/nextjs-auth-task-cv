"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TaskFormSchema } from "../../../constant/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormValues {
  title: string;
  description: string;
  status: string;
}

const TaskForm: React.FC = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    title: "",
    description: "",
    status: "Pending",
  };

  const handleSubmit = async (values: FormValues) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/createTask`,
      values,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 201) {
      router.push("/task");
    } else {
      console.log("Error:", response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={TaskFormSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows={4}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
            <p className="text-center mt-2">
              <Link href="/task" className="text-blue-500 mt-4">
                Back to Task List
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
