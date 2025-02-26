import React from 'react';

interface HeadingProps {
    content: string;
}

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return (
    <div className="header mb-8 flex flex-col items-center justify-center">
      <p className="font-[Pacifico] leading-0 text-white">Progressus.</p>
      <h1 className="bg-radial from-white to-[#999999] bg-clip-text px-8 py-4 font-[Poppins] text-5xl font-bold text-transparent md:p-4 md:text-6xl">
        {content}
      </h1>
      <p className="font-[Poppins] leading-2 text-gray-400 text-sm md:text-md">Lépj be a modern tanulás világába!</p>
    </div>
  );
};

export default Heading;
