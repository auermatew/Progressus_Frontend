import { FC } from 'react';

type submitButtonProps = {
  content: string;
};

const submitButton: FC<submitButtonProps> = ({ content }) => {
  return (
    <div className="submit backdrop-opacity-30 flex w-[65%] items-center justify-center rounded-xl bg-black p-4 cursor-pointer border-2 border-white">
      <p className="font-[Poppins] text-xl font-bold text-white">{content}</p>
    </div>
  );
};

export default submitButton;
