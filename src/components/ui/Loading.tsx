import { AiOutlineLoading3Quarters as LoadIcon } from "react-icons/ai";

const Loading = () => {
    return (
        <div
            className="wrapper h-screen w-full flex justify-center items-center absolute"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <LoadIcon className="animate-spin text-white" size={50} />
        </div>
    );
};

export default Loading;
