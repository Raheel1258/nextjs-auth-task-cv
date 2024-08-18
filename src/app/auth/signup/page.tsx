"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SignupFormSchema } from "../../../constant/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

const SignupForm: React.FC = () => {

  const router = useRouter();

  const initialValues: SignupFormValues = {
    email: "",
    password: "",
    name: "",
  };

  const handleSubmit = async (values: SignupFormValues) => {
    console.log("Form data:", values);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, values);
    console.log("Response:", response);
    if(response.status === 201) {
       router.push("/");
    } else {
      console.log("Error:", response.data);
    }
    // You can send these values to your backend API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupFormSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                name="email"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">Already have an account? <Link href="/">Login</Link></p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
