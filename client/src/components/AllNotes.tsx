import React, { useContext } from "react";
import NotesContext from "../contexts/NotesContext";


const AllNotes = () => {
  // write hook to get all notes here
  const allNotes = useContext(NotesContext)["tasks"];

  return (
    <div className="3xl:text-[30px] lg:text-[22px] 3xl:pt-3">
      <h1 className="font-bold border-b border-[#C5CAD3]">Notes</h1>
      <div className="font-normal max-h-[24vh] overflow-scroll">
        {allNotes && allNotes.length > 0 ? (
          allNotes.map((el, idx) => {
            return (
              <div key={idx} className="border-b border-[#C5CAD3] py-3">
                {el}
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
