import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Nav from '../components/Nav';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }: AppProps) =>  {
  return (
    <ChakraProvider>
      <Nav />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
