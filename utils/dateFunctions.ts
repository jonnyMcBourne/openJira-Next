import {formatDistanceToNow  } from "date-fns";

export const getFormartDistanceTonow = (date:number) =>{
    const fromNow = formatDistanceToNow(date)
    return fromNow;
} 
