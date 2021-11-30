import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { AppContext } from '../../context/context';
import Nav from '../../components/Nav';
import Details from '../../components/Details';
import { Package } from '../../types/package';

const Tracking: NextPage = () => {
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { tracking } = router.query;
  const [packageInfo, setPackageInfo] = useState<Package>({} as Package);
  const toast = useToast();

  useEffect(() => {
    const getTrackingInfo = async () => {
      try {
        const packageItem = await axios.get<Package>(
          `/tracking/${tracking}`,
        );
        setPackageInfo(packageItem.data);
      } catch (error) {
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
    };

    if (tracking === undefined) {
      return;
    }
    getTrackingInfo();
  }, [tracking]);

  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Nav isLoggedIn={state.token !== ''} />
      <div>
        {tracking && (
          <Details
            item={packageInfo}
          />
        )}
      </div>
    </>
  );
};

export default Tracking;
