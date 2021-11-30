/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import {
  ChakraProvider,
  localStorageManager,
  extendTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { AppProvider } from '../context/context';

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
