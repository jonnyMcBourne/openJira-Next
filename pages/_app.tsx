import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {darkTheme,lightTheme} from '../themes'
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '../context/entries'
import { SnackbarProvider } from "notistack";

const MyApp = ({ Component, pageProps }: AppProps) => (
<SnackbarProvider maxSnack={5} >
  <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
</SnackbarProvider>
);

export default MyApp
