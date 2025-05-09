import React from "react";
import { useState } from "react";

// import './App.css'
const response = [
  {
    id: 1,
    content: "Note 1",
  },
  {
    id: 2,
    content: "Note 2",
  },
  {
    id: 3,
    content: "Note 3",
  },
  {
    id: 4,
    content: "Note 4",
  },
  {
    id: 5,
    content: "Note 5",
  },
  {
    id: 6,
    content: "Note 6",
  },
  {
    id: 7,
    content: "Note 7",
  },
  {
    id: 8,
    content: "Note 8",
  },
  {
    id: 9,
    content: "Note 9",
  },
  {
    id: 10,
    content: "Note 10",
  },
  {
    id: 11,
    content: "Note 11",
  },
  {
    id: 12,
    content: "Note 12",
  },
];
function App() {
  const [notes, setNotes] = useState(response);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border border-[#D3D4D9] font-inter font-semibold rounded-lg shadow 3xl:px-6">
        <div className="pt-5 pb-1 rounded-t-lg flex items-center">
          <div className="h-16 w-16 rounded-lg relative">
            <img src="/logo.png" className="absolute -top-0.5 -left-2.5" />
          </div>
          <div className="lg:text-[32px] 3xl:text-[48px]">Note App</div>
        </div>
        <div className="pt-2 pb-2 3xl:pb-5">
          <div className=" flex gap-5 w-full">
            <input
              type="text"
              placeholder="New Note..."
              className="w-3/4 border border-[#D3D4D9] rounded-xl shadow 3xl:text-[30px] px-4 py-2 placeholder:font-normal placeholder:text-2xl"
            />
            <button className="border lg:text-[24px] 3xl:text-[28px] rounded-xl w-1/4 flex items-center justify-center gap-3 bg-[#92400E] text-white">
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
        <div className="3xl:text-[30px] lg:text-[22px] 3xl:pt-3">
          <h1 className="font-bold border-b border-[#C5CAD3]">
            Notes
          </h1>
          <div className="font-normal max-h-[24vh] overflow-scroll">
            {notes?.map((el, idx) => {
              return <div key={idx} className="border-b border-[#C5CAD3] py-3">{el.content}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
