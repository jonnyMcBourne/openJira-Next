import { FC, PropsWithChildren, useReducer } from "react"
import { UIContext, uiReducer } from "./"

export interface UIstate{
    sidemenuOpen:boolean
    isAddingEntry:boolean
    isDragging:boolean
}
const UI_INITIAL_STATE: UIstate ={
    sidemenuOpen:false,
    isAddingEntry:false,
    isDragging:false
  }

export const UIProvider:FC<PropsWithChildren<{}>> = ({children}) => {
  
  const [{sidemenuOpen, isAddingEntry,isDragging},dispatch ] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({type:"UI-OpenSideBar"} )
  };

  const closeSideMenu =()=>{
    dispatch({type:"UI-CloseSideBar"})
  }
  const setIsAddingEntry =(isAdding:boolean)=>{
    dispatch({type:'UI-IsAddingEntry',payload:isAdding})
  }

  const startDragging = ()=>{
    dispatch({type:'UI-StartDragging'})
  }
  const endDragging =()=>{
    dispatch({type:'UI-EndDragging'})
  }
  
  return (
    <UIContext.Provider
      value={{
        sidemenuOpen,
        isAddingEntry,
        isDragging,
        setIsAddingEntry,
        openSideMenu,
        closeSideMenu,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
