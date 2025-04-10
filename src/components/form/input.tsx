import React from 'react';
import { useState } from 'react';

type inputProps = {
  id: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input: React.FC<inputProps> = ({ id, type, value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const commonClass =
    'p-2 text-lg border-b-white h-8 m-4 text-white font-[Poppins] bg-transparent w-full focus:outline-none';

  return (
    <>
      {type === 'password' ? (
        <>
          <input
            id={id}
            type={visible ? 'text' : 'password'}
            className={`${commonClass}${!visible ? 'text-3xl' : ''} select-none`}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
          <p
            className="-ml-12 cursor-pointer text-3xl text-white select-none"
            onClick={() => setVisible(!visible)}
          >
            {visible ? '🙈' : '🙉'}
          </p>
        </>
      ) : (
        <input
          id={id}
          type={type}
          className={commonClass}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Input;
