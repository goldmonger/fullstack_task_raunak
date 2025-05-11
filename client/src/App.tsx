import React from "react";
import AddNote from "./components/AddNote";
import AllNotes from "./components/AllNotes";
import Layout from "./components/Layout";
import useMqtt from "./hooks/useMqtt";
import useNotes from "./hooks/useNotes";

function App() {
  const { handlePublish } = useMqtt();
  const { notes } = useNotes();

  return (
    <Layout>
      <AddNote submit={handlePublish} />
      <AllNotes notes={notes} />
    </Layout>
  );
}

export default App;
