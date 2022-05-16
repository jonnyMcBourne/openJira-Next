import { FC, useContext, useEffect, useState, DragEvent } from "react";
import { List, Paper } from "@mui/material";
import { EntriesContext,  } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { Entry, EntryStatus } from "../../interfaces";
import EntryCard from "./EntryCard";
import styles from "./EntryList.module.css"

interface Props {
  status: EntryStatus;
}
export const EntryList: FC<Props> = ({ status }) => {
  
  const { entrie, onEntryUpdated } = useContext(EntriesContext);
  const {isDragging} = useContext(UIContext)
  const [entriesFiltered, setEntriesFiltered] = useState<Entry[]>([])
  useEffect(() => {
      const entriesMemorized = entrie.filter((ent) => ent.status === status)
      setEntriesFiltered(entriesMemorized)
  }, [entrie])
  
  const onDropEntry = (event:DragEvent<HTMLDivElement>)=>{
    const id = event.dataTransfer.getData('text')
    const entry=entrie.find((entry)=>entry._id === id)!;
    entry.status = status;
    onEntryUpdated(entry);

  }
  const onDropAllow = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  };
  return (
    <div 
    onDrop={onDropEntry} 
    onDragOver={onDropAllow}
    className={isDragging?styles.dragging:''}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          padding: "1px",
          background: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/** Todo: will change depending if its making drag or not */}
        <List sx={{ opacity: isDragging? 0.7 : 1, transition: 'all 0.3s' }}>
          {entriesFiltered.map((task) => (
            <EntryCard entry={task} key={task._id} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EntryList;
