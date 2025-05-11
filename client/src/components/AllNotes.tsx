import React from "react";
import useNotes from "../hooks/useNotes";

interface INote {
  id: string;
  content: string;
}

const AllNotes = () => {
  // write hook to get all notes here
  const { notes } = useNotes();
  return (
    <div className="3xl:text-[30px] lg:text-[22px] 3xl:pt-3">
      <h1 className="font-bold border-b border-[#C5CAD3]">Notes</h1>
      <div className="font-normal max-h-[24vh] overflow-scroll">
        {notes && notes.length > 0 ? (
          notes.map((el, idx) => {
            return (
              <div key={idx} className="border-b border-[#C5CAD3] py-3">
                {/* @ts-ignore */}
                {el.content}
              </div>
            );
          })
        ) : (
          <p>No Notes Yet..</p>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
