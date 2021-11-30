import axios from 'axios';
import { useState, useContext, ChangeEvent } from 'react';
import {
  chakra,
  Box,
  Flex,
  Link,
  Stack,
  useColorModeValue,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';

import ConfirmPopup from './ConfirmPopup';
import InputPopup from './InputPopup';
import HistStat from './HistStat';
import { AppContext } from '../context/context';
import { Package as PackageType, History as HistoryType, Status } from '../types/package';

interface PackageProps {
  item: PackageType;
  isExtended: boolean;
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

const getHistInfo = (history : HistoryType[]) => {
  const location = history[0] === undefined ? 'N/A' : history[0].location;
  const timestamp = history[0] === undefined ? 'N/A' : history[0].timestamp;
  return [location, timestamp];
};

const notFoundMsg = 'Unable to get the tracking information for this package.';

const getMsg = (location : string | number, timestamp : string | number) => {
  if (timestamp === 'N/A' && location === 'N/A') {
    return notFoundMsg;
  }
  const date = new Date(timestamp);
  const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  return `Package was last seen at ${location} on ${dateStr}`;
};

const Package = ({ item, isExtended }: PackageProps) => {
  const toast = useToast();
  const { state, dispatch } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(item.name);
  const statColor = getStatusColor(item.status);
  const { history } = item;
  const [location, timestamp] = getHistInfo(history);
  const packageMsg = getMsg(location, timestamp);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setInputValue(event.target.value);

  const handleDeletePackage = async () => {
    try {
      const response = await axios.delete<PackageDeleteResponse>(
        `/tracking/${item.tracking}`,
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
        `/tracking/${item.tracking}`,
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
    >
      <Box
        w="full"
        mx="auto"
        px={4}
        py={3}
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            {`${item.carrier} - ${item.tracking}`}
          </chakra.span>
          {isExtended && (
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
          )}
        </Flex>

        <Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color={useColorModeValue('gray.800', 'white')}
          >
            {item.name}
          </chakra.h1>
          <chakra.p
            fontSize="sm"
            mt={2}
            color={useColorModeValue('gray.600', 'gray.300')}
          />
        </Box>

        <Box>
          <Flex
            alignItems="center"
            mt={2}
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            <chakra.p
              fontWeight="light"
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

          {isExtended ? (
            <Flex>
              {packageMsg}
            </Flex>
          ) : (
            <Flex justifyContent="center">
              {packageMsg !== notFoundMsg && (
              <Link color="blue.400" href={`/detail/${item.tracking}`}>
                View Detail
              </Link>
              )}
            </Flex>
          )}

          {(isExtended
          && packageMsg !== notFoundMsg
          ) && (
            <Accordion allowToggle>
              <AccordionItem border="hidden">
                <AccordionButton mr={2} _hover={{ color: useColorModeValue('gray.700', 'gray.300') }} _focus={{ boxShadow: 'none' }} textAlign="center" padding={0}>
                  <AccordionIcon marginX="auto" />
                </AccordionButton>

                <AccordionPanel px={0} pb="1em">
                  <Stack align="stretch">
                    {
                      history.map(
                        (hist) => <HistStat key={hist.timestamp} hist={hist} />,
                      )
                    }
                  </Stack>
                  <Flex justifyContent="center" mt="1em">
                    <Link color="blue.400" href={`/detail/${item.tracking}`}>View More</Link>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default Package;
