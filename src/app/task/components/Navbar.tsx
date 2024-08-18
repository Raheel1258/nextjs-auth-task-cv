import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-end items-center">
      <Link
        href="/"
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
