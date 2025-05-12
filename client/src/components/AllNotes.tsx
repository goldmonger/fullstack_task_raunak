import React, { useContext } from "react";
import NotesContext from "../contexts/NotesContext";

const AllNotes = () => {
  // write hook to get all notes here
  const allNotes = useContext(NotesContext)["tasks"];

  return (
    <div className="3xl:text-[30px] lg:text-[22px] 3xl:pt-3 pb-5">
      <h1 className="font-bold py-1">Notes</h1>
      <div className="font-normal max-h-[24vh] flex flex-col no-scrollbar">
        {allNotes && allNotes.length > 0 ? (
          allNotes.map((el, idx) => {
            if (idx === 0) {
              return (
                <div
                  key={idx}
                  className="border-b border-t border-[#C5CAD3] py-3"
                >
                  {el}
                </div>
              );
            }
            return (
              <div key={idx} className="border-b border-[#C5CAD3] py-3">
                {el}
              </div>
            );
          })
        ) : (
          <p className="py-2">Add a new note.</p>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
