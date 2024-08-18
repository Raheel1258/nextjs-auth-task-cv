import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, src, title }) => {
  if (!isOpen) return null;

  const downloadFile = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "download"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <iframe
            src={src}
            className="w-full h-96"
            frameBorder="0"
            title="File Preview"
          ></iframe>
          <div className="mt-4 text-right">
            <button
              onClick={() => downloadFile(src)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
