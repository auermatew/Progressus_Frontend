import React, { FC } from 'react';
import '../../styles/actionButton.css';

type ActionButtonProps = {
    content: string;
};

const ActionButton: FC<ActionButtonProps> = ({ content }) => {
    return (
        <>
            <div className="action-button cursor-pointer z-10">
                <button className="text-white font-[Poppins] font-bold text-lg py-2 px-4 rounded-lg">
                    {content}
                </button>
            </div>
        </>
    )
}

export default ActionButton;