import React from "react";
import AddNote from "./components/AddNote";
import AllNotes from "./components/AllNotes";
import Layout from "./components/Layout";

function App() {
  

  return (
    <Layout>
      <AddNote />
      <AllNotes />
    </Layout>
  );
}

export default App;
