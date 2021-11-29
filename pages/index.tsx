import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import SearchBox from '../components/SearchBox';
import Nav from '../components/Nav';
import ItemList from '../components/ItemList';

import { PackageList } from '../public/fakeData';

const Home: NextPage = () => {
  const textColor = useColorModeValue('gray.500', 'gray.50');
  return (
    <>
      <Nav isLoggedIn={false} />
      <div className={styles.container}>
        <Head>
          <title>BTracker</title>
          <meta name="description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <SearchBox />
        </main>
        {
        PackageList.length > 0
          ? <ItemList items={PackageList} />
          : (
            <Box textAlign="center" mt="2em">
              <Text fontSize="2xl" color={textColor}>You don&#39;t have any packages right now. Try to add one from above!</Text>
            </Box>
          )
      }
      </div>
    </>
  );
};

export default Home;
