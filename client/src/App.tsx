import React, { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import AllNotes from "./components/AllNotes";
import Layout from "./components/Layout";
import NotesContext from "./contexts/NotesContext.js";
import useNotes from "./hooks/useNotes.js";

function App() {
  const { notes, refetch } = useNotes();
  const [allNotes, setAllNotes] = useState<undefined | string[]>(notes);

  useEffect(() => {
    setAllNotes(notes);
  }, [notes]);

  return (
    <Layout>
      <NotesContext.Provider value={{ tasks: allNotes, refetch: refetch }}>
        <AddNote />
        <AllNotes />
      </NotesContext.Provider>
    </Layout>
  );
}

export default App;
