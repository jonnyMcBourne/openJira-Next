import { createContext } from 'react';
import { Entry } from '../../interfaces';

export interface ContextProps {
  entrie: Entry[];
  addNewTask: (desc: string) => void;
  onEntryUpdated: (entry:Entry) =>void
}

export const EntriesContext = createContext({} as ContextProps);