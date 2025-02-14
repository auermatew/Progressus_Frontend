import React, { FC } from 'react';
import '../../styles/actionButton.css';

type ActionButtonProps = {
    content: string;
};

const ActionButton: FC<ActionButtonProps> = ({ content }) => {
    return (
        <>
            <div className="action-button cursor-pointer">
                <button className="text-white font-[Poppins] font-bold text-lg py-2 px-4 rounded-lg">
                    {content}
                </button>
            </div>
        </>
    )
}

export default ActionButton;