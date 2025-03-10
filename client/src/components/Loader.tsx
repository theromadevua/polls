import React from 'react';

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 flex justify-center items-center z-50">
    <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default Loader;
