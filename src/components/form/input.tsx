import React from "react";
import { useState } from "react";

type inputProps = {
    id: string;
    type: string;
    placeholder: string;
};

const Input: React.FC<inputProps> = ({ id, type, placeholder }) => {
    const [visible, setVisible] = useState(false);
    const commonClass =
        "p-2 text-lg border-b-white h-8 m-4 text-white font-[Poppins] bg-transparent w-full focus:outline-none";

    return (
        <>
            {type === "password" ? (
                <>
                    <input
                        id={id}
                        type={visible ? "text" : "password"}
                        className={`${commonClass}${!visible ? " text-3xl" : ""}`}
                        placeholder={placeholder}
                    />
                    <p
                        className="text-white -ml-12 text-3xl cursor-pointer select-none"
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? "🙈" : "👁️"}
                    </p>
                </>
            ) : (
                <input
                    type={type}
                    className={commonClass}
                    placeholder={placeholder}
                />
            )}
        </>
    );
};

export default Input;
