import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  localStorageManager,
} from '@chakra-ui/react';
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import { AppProvider } from '../context/context';

const config : ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

const App = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <ChakraProvider
      colorModeManager={localStorageManager}
      theme={theme}
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
