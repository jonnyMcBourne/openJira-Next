import { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
import { Button, TextField,Box } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
    const [inputValue, setInputValue] = useState("");
    const [touched, setTouched] = useState(false);

    const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);
    const { addNewTask } = useContext(EntriesContext);

    const onTextChange = (
      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setInputValue(e.target.value);
    };

    const onSave = () => {
      if (inputValue.length <= 0) return;
      addNewTask(inputValue);
      setInputValue("");
      setTouched(false);
      setIsAddingEntry(false);
    };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, mariginButton: 1 }}
            placeholder="new Entry"
            autoFocus
            label="a new ticket"
            multiline
            helperText={inputValue.length <= 0 && touched && "type a task"}
            value={inputValue}
            error={inputValue.length <= 0 && touched}
            onChange={onTextChange}
            onBlur={() => {
              setTouched(true);
            }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => {
                setIsAddingEntry(false);
              }}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => {
            setIsAddingEntry(true);
          }}
        >
          Add a new ticket
        </Button>
      )}
    </Box>
  );
};

export default NewEntry;
