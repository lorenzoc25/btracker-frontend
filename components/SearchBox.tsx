import axios from 'axios';
import {
  useContext,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
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
    event: ChangeEvent<HTMLInputElement>,
  ) => setTracking(event.target.value);

  const handleClick = async () => {
    if (
      state.packageList !== undefined
      && state.packageList.some(
        (item) => item.tracking === tracking,
      )
    ) {
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
        `/tracking/${tracking}`,
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
    }
  };

  const handleKeyboard = async (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      await handleClick();
    }
  };

  return (
    <Flex
      my="2em"
      justify="center"
    >
      <InputGroup
        mr={4}
        w={{
          base: 'full',
          md: '75%',
        }}
      >
        <Input
          rounded="lg"
          ml={4}
          mr={2}
          placeholder="Enter a tracking number"
          value={tracking}
          onChange={handleChange}
          onKeyPress={handleKeyboard}
          bg={useColorModeValue('white', 'gray.600')}
          disabled={state.token === ''}
        />
        <Button
          disabled={tracking === '' || state.token === ''}
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
