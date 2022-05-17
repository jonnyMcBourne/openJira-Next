import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, DragEvent, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { Entry } from '../../interfaces'
import {dateFunctions} from '../../utils'
interface Props{
    entry: Entry
}
export const EntryCard:FC<Props> = ({ entry}) => {
  const {endDragging,startDragging} = useContext(UIContext)
  const{push} =useRouter()
    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text',entry._id)
        startDragging()
    };

    const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
      endDragging()
    };
    const onClickToDetails =()=>{
      push(`/entries/${entry._id}`)
    }
    return (
      <Card
       sx={{ marginBottom: 1 }} 
       draggable 
       onDragStart={onDragStart}
       onDragEnd={onDragEnd}
       onClick={onClickToDetails}
       >
      
        <CardActionArea>
          <CardContent>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {entry.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
          >
            <Typography variant="body2">{`created ${dateFunctions.getFormartDistanceTonow(entry.createdAt)} ago` }</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    );
}

export default EntryCard