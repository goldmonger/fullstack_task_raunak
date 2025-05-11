import { createContext } from "react";

interface INotesContext {
  tasks: undefined | string[];
  refetch: () => void;
}
const NotesContext = createContext<INotesContext>({
  tasks: undefined,
  refetch: () => {},
});

export default NotesContext;
