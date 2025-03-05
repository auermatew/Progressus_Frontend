import { FC } from 'react';
import '../../styles/actionButton.css';

type ActionButtonProps = {
  content: string;
};

const ActionButton: FC<ActionButtonProps> = ({ content }) => {
  return (
    <>
      <div className="action-button z-10 cursor-pointer">
        <button className="rounded-lg px-4 py-2 font-[Poppins] text-lg font-bold text-white">
          {content}
        </button>
      </div>
    </>
  );
};

export default ActionButton;
