"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";

interface Cv {
  fileUrl: string;
  name: string;
  id: string;
  email: string;
}

const UserCvs: React.FC = () => {
  const [cvData, setCvData] = useState<Cv[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentFileUrl, setCurrentFileUrl] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    const fetchCvs = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/files/all-files`
      );

      if (response.status === 200) {
        setCvData(response.data.response);
      } else {
        setCvData([]);
      }
    };
    fetchCvs();
  }, [uploadedFile]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file as Blob);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 201) {
      setUploadedFile(response.data.response.fileUrl);
    }
  };

  const openModal = (fileUrl: string, name: string) => {
    <a href={fileUrl} download />;
    setCurrentFileUrl(fileUrl);
    setModalTitle(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentFileUrl("");
    setModalTitle("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User CVs</h1>

      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Upload a file
        </label>
        <input
          type="file"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={handleChange}
        />
      </div>

      {/* CVs Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cvData.length > 0 ? (
              cvData?.map((cv) => (
                <tr key={cv.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{cv.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cv.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openModal(cv.fileUrl, cv.name)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View CV
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 whitespace-nowrap text-center"
                >
                  No CVs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        src={currentFileUrl}
        title={modalTitle}
      />
    </div>
  );
};

export default UserCvs;
