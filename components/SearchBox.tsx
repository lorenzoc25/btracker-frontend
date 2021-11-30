import axios from 'axios';
import { useContext, useState } from 'react';
import {
  InputGroup,
  Input,
  Button,
  Flex,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';

import { Package } from '../types/package';
import { AppContext } from '../context/context';

const SearchBox = () => {
  const toast = useToast();
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState('');
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setTracking(event.target.value);

  const handleClick = async () => {
    if (state.packageList !== undefined
      && state.packageList.some(
        (item) => item.tracking === tracking,
      )) {
      toast({
        title: 'The package exists in the package list',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post<Package>(
        `http://localhost:4000/tracking/${tracking}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      );

      dispatch({
        type: 'AddPackage',
        payload: {
          package: response.data,
        },
      });

      setTracking('');
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
    } finally {
      setLoading(false);
      setTracking('');
    }
  };

  return (
    <Flex
      my="2em"
      justify="center"
    >
      <InputGroup
        w="70%"
      >
        <Input
          rounded="lg"
          mx={3}
          placeholder="Enter a tracking number"
          value={tracking}
          onChange={handleChange}
          bg={useColorModeValue('white', 'gray.600')}
        />
        <Button
          disabled={tracking === ''}
          colorScheme="blue"
          isLoading={loading}
          onClick={handleClick}
        >
          Track
        </Button>
      </InputGroup>
    </Flex>
  );
};

export default SearchBox;
