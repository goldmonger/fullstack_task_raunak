import React from "react";

interface IAddNoteProps {
  submit: () => Promise<void>;
}

const AddNote = ({ submit }: IAddNoteProps) => {
  return (
    <div className="pt-2 pb-2 3xl:pb-5">
      <div className=" flex gap-5 w-full">
        <input
          type="text"
          placeholder="New Note..."
          id="form-input"
          className="w-3/4 border border-[#D3D4D9] rounded-xl shadow 3xl:text-[30px] px-4 py-2 placeholder:font-normal placeholder:text-2xl"
        />
        <button
          className="border lg:text-[24px] 3xl:text-[28px] rounded-xl w-1/4 flex items-center justify-center gap-3 bg-[#92400E] text-white"
          onClick={submit}
        >
          <div className="rounded-full w-7 h-7 bg-white flex items-center justify-center">
            <div className="relative w-4 h-0.5">
              <div className="w-4 h-0.5 bg-[#92400E] absolute top-0 left-0"></div>
              <div className="w-4 h-0.5 bg-[#92400E] absolute top-0 left-0 rotate-90"></div>
            </div>
          </div>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNote;
