/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { AppProps } from 'next/app';
import {
  ChakraProvider,
  localStorageManager,
  extendTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { AppProvider } from '../context/context';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api.btracker.xyz';
} else {
  axios.defaults.baseURL = 'http://localhost:4000';
}

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      'html body': {
        height: '100%',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'gray.800')(props),
        lineHeight: 'base',
      },
    }),
  },
  initialColorMode: 'light',
  useSystemColorMode: true,
});

const App = ({
  Component,
  pageProps,
}: AppProps) => (
  <ChakraProvider
    colorModeManager={localStorageManager}
    theme={theme}
  >
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </ChakraProvider>
);

export default App;
