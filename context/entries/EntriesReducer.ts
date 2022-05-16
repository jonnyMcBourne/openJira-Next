import { Entry } from '../../interfaces'
import {EntriesState}  from '.'
type EntriesActionsType =
  | { type: "[Entry]-Add Entry"; payload: Entry }
  | { type: "[Entry]-Update Entry"; payload: Entry }
  | { type: "[Entry]-GET-Entries"; payload:  Entry[]  };

export const entriesReducer = (state: EntriesState, action:EntriesActionsType):EntriesState => {
    switch (action.type) {
        case '[Entry]-Add Entry':
            return{
               ...state,
               entrie:[...state.entrie, action.payload] 
            }
        case '[Entry]-Update Entry':
            return{
                ...state,
                entrie:state.entrie.map(entry=>{
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status
                        entry.description = action.payload.description
                    }
                    return entry
                })
            }
        case '[Entry]-GET-Entries':
            return {
                ...state,
                entrie:[...action.payload]
            }
    
        default:
            break;
    }
    return { 
        entrie:[]
    }
}