import axios from 'axios';
import { useState, useContext, ChangeEvent } from 'react';
import {
  chakra,
  Center,
  Text,
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChatIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import ConfirmPopup from './ConfirmPopup';
import InputPopup from './InputPopup';
import HistStat from './HistStat';
import { AppContext } from '../context/context';
import { Package as PackageType, Status } from '../types/package';

interface PackageProps {
  item: PackageType;
}

interface PackageDeleteResponse {
  deletedCount: number;
}

interface PackageUpdateResponse {

}

const getStatusColor = (status: Status): string[] => {
  if (status === Status.Delivered) {
    return ['green.600', 'green.200'];
  } if (status === Status.OutOfDelivery) {
    return ['orange.400', 'orange.300'];
  } if (status === Status.InTransit) {
    return ['cyan.600', 'cyan.200'];
  }
  return ['red.500', 'red.400'];
};

const Package = ({ item }: PackageProps) => {
  const router = useRouter();
  const { tracking } = router.query;
  const toast = useToast();
  const { state, dispatch } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(item.name);
  const statColor = getStatusColor(item.status);
  const handleCopy = () => {
  };
  const { history } = item;
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setInputValue(event.target.value);

  const handleDeletePackage = async () => {
    try {
      const response = await axios.delete<PackageDeleteResponse>(
        `http://localhost:4000/tracking/${item.tracking}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      );
      if (response.data.deletedCount > 0) {
        dispatch({
          type: 'DeletePackage',
          payload: {
            tracking: item.tracking,
          },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: 'Failed to delete the package',
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

  const handleUpdatePackage = async () => {
    try {
      await axios.put<PackageUpdateResponse>(
        `http://localhost:4000/tracking/${item.tracking}`,
        {
          tracking: item.tracking,
          name: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      );
      dispatch({
        type: 'UpdatePackage',
        payload: {
          tracking: item.tracking,
          name: inputValue,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: 'Failed to update the name of the package',
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

  return (
    <Flex
      pb={4}
      px={{ base: 4, md: 35, lg: 50 }}
      w="full"
      alignItems="center"
      justifyContent="center"
      mt="2em"
    >
      <Box
        w="full"
        mx="auto"
        px={4}
        py={3}
        bg={useColorModeValue('white', 'gray.700')}
        rounded="md"
      >
        <Flex justifyContent="space-between" alignItems="start">
          <chakra.h3
            fontSize="2xl"
            fontWeight="bold"
            mb={0}
            px={0}
            p={4}
            color={useColorModeValue('blue.600', 'blue.200')}
          >
            {item.name}
          </chakra.h3>

          <chakra.span
            bg={useColorModeValue('brand.200', 'brand.300')}
            color={useColorModeValue('brand.800', 'brand.900')}
            px={3}
            py={1}
            rounded="full"
          >
            <Flex>
              <InputPopup
                title="Change Name"
                content={<AiOutlineEdit />}
                placeholder="Enter a new name"
                action={handleUpdatePackage}
                value={inputValue}
                handleInputChange={handleInputChange}
              />
              <ConfirmPopup
                content={<AiFillDelete />}
                title="Caution"
                message="Are you sure you want to delete this tracking?"
                button1="Delete"
                button2="Cancel"
                action={handleDeletePackage}
              />
            </Flex>
          </chakra.span>
        </Flex>

        <Box>
          <chakra.p
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
            ml="1em"
          >
            {`${item.carrier} - ${item.tracking}`}
          </chakra.p>
        </Box>

        <Box>
          <Flex
            alignItems="center"
            mt="1em"
            mb="2em"
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            <chakra.p
              fontWeight="light"
              ml="1em"
            >
              Status:&nbsp;
            </chakra.p>
            <chakra.p
              fontWeight="semibold"
              color={useColorModeValue(statColor[0], statColor[1])}
            >
              {item.status}
            </chakra.p>
          </Flex>

          <Stack align="stretch">
            {
              history.map(
                (hist) => <HistStat key={hist.timestamp} hist={hist} />,
              )
            }
          </Stack>
          <CopyToClipboard text={`https://btracker.xyz/details/${tracking}`} onCopy={handleCopy}>
            <Center p={8}>
              <Button
                w="full"
                maxW="xl"
                colorScheme="messenger"
                leftIcon={<ChatIcon />}
                onClick={() => toast({
                  title: '',
                  description: 'Link copied to clipboard!',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })}
              >
                <Center>
                  <Text>Share with Other</Text>
                </Center>
              </Button>
            </Center>
          </CopyToClipboard>
        </Box>
      </Box>
    </Flex>
  );
};

export default Package;
