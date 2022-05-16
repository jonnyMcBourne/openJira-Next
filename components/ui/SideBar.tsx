import { useContext } from "react";
import { Drawer,Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const menuItems:string[] =['Inbox','Started','send Email','Drafts'];
import {UIContext} from '../../context/ui'

export const SideBar = () => {
  const {sidemenuOpen,closeSideMenu} = useContext(UIContext)
  const openCloseMenu =()=>{
    
  }
  return (
    <Drawer 
    anchor="left" 
    open={sidemenuOpen} 
    onClose={() => closeSideMenu() }>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5x 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar