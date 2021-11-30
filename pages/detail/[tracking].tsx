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
import PackageListSkeleton from '../../components/PackageListSkeleton';

const Tracking: NextPage = () => {
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { tracking } = router.query;
  const [loading, setLoading] = useState(false);
  const [packageInfo, setPackageInfo] = useState<Package>({} as Package);
  const toast = useToast();

  useEffect(() => {
    const getTrackingInfo = async () => {
      setLoading(true);
      try {
        const packageItem = await axios.get<Package>(
          `/tracking/${tracking}`,
        );
        setPackageInfo(packageItem.data);
        setLoading(false);
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

  const renderDetails = () => {
    if (loading) {
      return (
        <PackageListSkeleton />
      );
    }

    if (tracking === undefined) {
      return false;
    }

    return (
      <Details
        item={packageInfo}
      />
    );
  };

  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Nav
        isLoggedIn={state.token !== ''}
      />

      <div>
        {renderDetails()}
      </div>
    </>
  );
};

export default Tracking;
