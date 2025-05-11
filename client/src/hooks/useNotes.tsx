import { useEffect, useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchData = () => {
    fetch(
      `${import.meta.env.VITE_SERVER_PROTOCOL}://${
        import.meta.env.VITE_SERVER_HOST
      }:${import.meta.env.VITE_SERVER_PORT}/fetchAllTasks`
    )
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { notes, refetch: fetchData };
};

export default useNotes;
