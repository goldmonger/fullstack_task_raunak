import { useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState([]);

  return { notes };
};

export default useNotes;
