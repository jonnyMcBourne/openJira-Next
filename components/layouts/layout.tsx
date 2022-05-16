import { FC, PropsWithChildren } from "react"
import { Box } from "@mui/material"
import {NavBar, SideBar} from '../ui'
import Head from "next/head"
interface Props{
    title?: string
}

export const Layout:FC<PropsWithChildren<Props>> = ({title='Open Jira App',children }) => {
  return (
    <Box sx={{flexFlow:1}} >
        <Head>
            <title>{title}</title>
        </Head>
        <NavBar/>
        <SideBar/>  
        <Box sx={{paddingTop: '10px 20px'}} >
        {children}
        </Box>
    </Box>
  )
}

export default Layout