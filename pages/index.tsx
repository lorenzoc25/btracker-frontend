import axios from 'axios';
import {
  useState,
  useContext,
  useEffect,
} from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import PackageListSkeleton from '../components/PackageListSkeleton';
import SearchBox from '../components/SearchBox';
import Nav from '../components/Nav';
import ItemList from '../components/PackageList';
import { AppContext } from '../context/context';
import { Package } from '../types/package';

const Home: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const textColor = useColorModeValue('gray.500', 'gray.50');

  useEffect(() => {
    const fetchPackageList = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Package[]>(
          'https://api.btracker.xyz/user/tracking',
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        );

        dispatch({
          type: 'SetPackageList',
          payload: {
            packageList: response.data || [],
          },
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Failed to fecth the list of packages',
            description: error.response?.data?.message || '',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw error;
        }
      }
      setLoading(false);
    };

    if (state.token === '') {
      return;
    }
    fetchPackageList();
  }, [state.token]);

  const renderPackageList = () => {
    if (loading) {
      return (
        <PackageListSkeleton />
      );
    }

    if (
      state.packageList !== undefined
      && state.packageList.length > 0
    ) {
      return (
        <ItemList
          items={state.packageList}
          isExtended
        />
      );
    }

    return (
      <Box textAlign="center" mt="2em">
        <Text fontSize="2xl" color={textColor}>
          You don&#39;t have any packages right now. Try to add one from above.
        </Text>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Nav isLoggedIn={state.token !== ''} />
      <div>
        <SearchBox />
        { state.token !== '' ? renderPackageList() : (
          <Box textAlign="center" color={textColor}>
            <Text>
              {'You haven\'t login yet. '}
              <Text color="blue.500" display="inline">
                <Link href="/login">
                  Login
                </Link>
              </Text>
              {' to see all your packages.'}
            </Text>
          </Box>
        ) }
      </div>
    </>
  );
};

export default Home;
