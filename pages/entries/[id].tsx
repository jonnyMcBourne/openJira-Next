import { ChangeEvent, FC, useContext, useState } from "react";
import { capitalize,Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"
import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from "../../interfaces";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";



const validStatus: EntryStatus[] = ['pending','in-progress','finished'];
interface Props{
  entry:Entry
}
const Entrie:FC<Props> = ({entry}) => {

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const {onEntryUpdated,onDeleteEntry} = useContext(EntriesContext)

 

  const onStatusValueChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value)
  }
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value.trim() as EntryStatus);
  };
  const onSave = () => {
    if(inputValue.trim().length <= 0)return 
    onEntryUpdated({...entry,status:status,description:inputValue},true)
  }
  const onDelete =()=>{
    onDeleteEntry(entry)
  }
  return (
    <Layout title={inputValue.substring(0,20)+'...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: `}
              subheader={`created ${entry.createdAt} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                value={inputValue}
                multiline
                label="new Entry"
                helperText={inputValue.length <= 0 && touched && "type a Entry"}
                onChange={onStatusValueChange}
                onBlur={() => {
                  setTouched(true);
                }}
                error={inputValue.length <= 0 && touched}
              />
              <FormControl>
                <FormLabel>status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <CardActions>
                <Button
                  startIcon={<SaveAsOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={onDelete}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import mongoose from "mongoose";
import { getEntryById } from "../../database";
import { EntriesContext } from "../../context/entries";


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const  { id } = params as {id:string}
  
  if(!mongoose.isValidObjectId(id)){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  const entry = await getEntryById(id);

    return {
      props: {
        entry
      }
    }

}
export default Entrie