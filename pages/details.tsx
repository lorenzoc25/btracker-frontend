import { NextPage } from 'next';
import Head from 'next/head';
import { useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import Nav from '../components/Nav';
import { AppContext } from '../context/context';
import Detail from '../components/Details';
import { PackageList } from '../public/fakeData';

const Home: NextPage = () => {
  const { state } = useContext(AppContext);
  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Nav isLoggedIn={state.token !== ''} />
      <div>
        <Detail
          item={PackageList[0]}
        />
      </div>
    </>
  );
};

export default Home;
