import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import {v4 as uuidv4} from 'uuid'
import { Entry } from '../../interfaces'
import {entriesApi} from '../../apis'
import { EntriesContext, entriesReducer } from '.' 

export interface EntriesState{
    entrie: Entry[]
}
const INITIAL_STATE_ENTRIES: EntriesState = {
  entrie: [],
};
export const EntriesProvider:FC<PropsWithChildren<{}>> = ({children}) => {

const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE_ENTRIES);

useEffect(() => {
     refreshentries()
}, [])

const refreshentries = async() =>{
  try {
    const {data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({type:'[Entry]-GET-Entries',payload:data})
  } catch (error) {
    console.log("Error on get entries: ",error)
  }
}

const addNewTask = async  (desc:string)=>{

    const newTask:Entry ={
      _id:uuidv4(),
      description:desc,
      createdAt: Date.now(),
      status:'pending'
    }
    const { data } = await entriesApi.post('/entries',{description:desc})
    dispatch({type:'[Entry]-Add Entry', payload:newTask})
  }

  const onEntryUpdated = async (entry:Entry)=>{
    try {
      const entryUpdated = await entriesApi.put(`/entries/${entry._id}`,entry)
      dispatch({type:'[Entry]-Update Entry', payload:entry })
      
    } catch (error) {
      console.log("something went wrong, please try again ")
    }
  }

  return (
    <EntriesContext.Provider value={{ ...state, addNewTask, onEntryUpdated }}>
      {children}
    </EntriesContext.Provider>
  );
}