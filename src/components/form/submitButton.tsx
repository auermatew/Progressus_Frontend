import { FC } from 'react';

type submitButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  content: string;
  onClick?: () => void;
};

const submitButton: FC<submitButtonProps> = ({ type, content, onClick }) => {
  return (
    <div className="submit flex w-[65%] cursor-pointer items-center justify-center rounded-xl border-2 border-white bg-black p-4 backdrop-opacity-30">
      <button type={type} onClick={onClick}>
        <p className="font-[Poppins] text-xl font-bold text-white">{content}</p>
      </button>
    </div>
  );
};

export default submitButton;
