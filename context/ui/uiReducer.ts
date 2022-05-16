import { UIstate } from "./UIProvider"
type UIActionType =
  | { type: "UI-OpenSideBar" }
  | { type: "UI-CloseSideBar" }
  | { type: "UI-IsAddingEntry", payload: boolean }
  | { type: "UI-StartDragging" }
  | { type: "UI-EndDragging"}

export const uiReducer = (state:UIstate, action :UIActionType):UIstate => {
  switch (action.type) {
    case 'UI-OpenSideBar':
      return{...state, sidemenuOpen:true}
    case 'UI-CloseSideBar':
      return{...state, sidemenuOpen:false}
    case 'UI-IsAddingEntry':
      return {...state, isAddingEntry: action.payload }

      case 'UI-StartDragging':
        return {
          ...state,
          isDragging:true
        }
      case 'UI-EndDragging':
        return {
          ...state,
          isDragging:false
        }
    default:
      return state;
  }
}

export default uiReducer