import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import Nav from '../../components/Nav';
import Detail from '../../components/Details';
import { Package } from '../../types/package';

const Home: NextPage = () => {
  const router = useRouter();
  const { tracking } = router.query;
  const [packageInfo, setPackageInfo] = useState<Package>({} as Package);

  useEffect(() => {
    const getTrackingInfo = async () => {
      try {
        const packageItem = await axios.get<Package>(
          `http://localhost:4000/tracking/${tracking}`,
        );
        setPackageInfo(packageItem.data);
      } catch (error) {
        const toast = useToast();
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Failed to track the package',
            description: error.response?.data?.message || '',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw error;
        }
      }
      return {};
    };

    getTrackingInfo();
  });

  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Nav isLoggedIn={state.token !== ''} />
      <div>
        <Detail
          item={packageInfo}
        />
      </div>
    </>
  );
};

export default Home;
