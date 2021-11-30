import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import SearchBox from '../components/SearchBox';
import Nav from '../components/Nav';
import ItemList from '../components/ItemList';
import { AppContext } from '../context/context';
import { PackageList } from '../public/fakeData';

const Home: NextPage = () => {
  const { state } = useContext(AppContext);
  const textColor = useColorModeValue('gray.500', 'gray.50');
  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Nav isLoggedIn={state.token !== '' } />
      <div>
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
