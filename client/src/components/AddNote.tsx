import React, { useState } from "react";
import useMqtt from "../hooks/useMqtt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const AddNote = () => {
  const { handlePublish } = useMqtt();
  const [input, setInput] = useState<string | undefined>();

  const handleSubmit = () => {
    handlePublish();
    setInput(undefined);
  };
  return (
    <div className="pt-2 pb-2 3xl:pb-5">
      <div className="flex flex-col items-end md:items-center md:flex-row gap-3 w-full">
        <input
          type="text"
          placeholder="New Note..."
          id="form-input"
          onChange={(e) => setInput(e.currentTarget.value)}
          className="w-full md:w-3/4 border border-[#D3D4D9] rounded-xl shadow text-[17px] text-[20px] 3xl:text-[30px] px-4 pt-2 pb-1 md:pt-2.5 md:pb-1.5 lg:pb-2 3xl:pt-1.5 3xl:pb-1 placeholder:font-normal placeholder:text-2xl"
        />
        <button
          className="border transition duration-700 w-1/3 sm:w-1/3 md:w-1/4 py-1 md:py-2 lg:py-2.5 px-4 text-[20px] 3xl:text-[28px] rounded-xl flex items-center justify-center gap-3 text-white"
          onClick={handleSubmit}
          style={{
            backgroundColor: input ? "#92400E" : "#d3d3d3",
            cursor: input ? 'pointer' : 'not-allowed'
          }}
          disabled={input ? false : true}
        >
          <div className="rounded-full w-4 h-4 3xl:w-7 3xl:h-7 flex items-center justify-center">
            <FontAwesomeIcon icon={faCirclePlus} />
          </div>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNote;
