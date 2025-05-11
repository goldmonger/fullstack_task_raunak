import React from "react";

interface IAddNoteProps {
  submit: () => Promise<void>;
}

const AddNote = ({ submit }: IAddNoteProps) => {
  return (
    <div className="pt-2 pb-2 3xl:pb-5">
      <div className="flex flex-col items-end md:items-center md:flex-row gap-3 md:gap-5 w-full">
        <input
          type="text"
          placeholder="New Note..."
          id="form-input"
          className="w-full md:w-3/4 border border-[#D3D4D9] rounded-xl shadow text-[17px] text-[20px] 3xl:text-[30px] px-4 pt-2 pb-1 md:pt-2.5 md:pb-1.5 3xl:pt-1.5 3xl:pb-1 placeholder:font-normal placeholder:text-2xl"
        />
        <button
          className="border w-1/2 md:w-1/4 py-1 md:py-2 px-4 text-[20px] 3xl:text-[28px] rounded-xl flex items-center justify-center gap-3 bg-[#92400E] text-white"
          onClick={submit}
        >
          <div className="rounded-full w-4 h-4 3xl:w-7 3xl:h-7 bg-white flex items-center justify-center">
            <div className="relative w-4 h-0.5">
              <div className="w-2 h-0.5 3xl:w-4 3xl:h-0.5 bg-[#92400E] absolute left-1 3xl:top-0 3xl:left-0"></div>
              <div className="w-2 h-0.5 3xl:w-4 3xl:h-0.5 bg-[#92400E] absolute left-1 3xl:top-0 3xl:left-0 rotate-90"></div>
            </div>
          </div>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNote;
