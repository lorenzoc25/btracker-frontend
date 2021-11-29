import {
  chakra,
  Box,
  Flex,
  Link,
  Stack,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Package, Status } from '../types/package';
import ConfirmPopup from './ConfirmPopup';
import InputPopup from './InputPopup';
import HistStat from './HistStat';

interface ItemProps {
  item: Package;
  isExtended: boolean;
}

const getStatusColor = (status: Status): string[] => {
  if (status === Status.Delivered) {
    return ['green.600', 'green.200'];
  } if (status === Status.OutOfDelivery) {
    return ['orange.400', 'orange.300'];
  } if (status === Status.InTransit) {
    return ['cyan.800', 'cyan.200'];
  }
  return ['red.500', 'red.400'];
};

const deleteItem = async () => {
  console.log('deleted item!');
};

const Item = ({ item, isExtended }: ItemProps) => {
  const statColor = getStatusColor(item.status);
  const { history } = item;
  const { location, timestamp } = history[0];
  const date = new Date(timestamp);
  const dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  return (
    <Flex
      py={2}
      px={{ base: 0, md: 35, lg: 50 }}
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
            {item.carrier}
            {' '}
            -
            {item.tracking}
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
                />
                <ConfirmPopup
                  content={<AiFillDelete />}
                  title="Caution"
                  message="Are you sure you want to delete this tracking?"
                  button1="Delete"
                  button2="Cancel"
                  action={deleteItem}
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
              Status:
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
              Package was last seen at
              {' '}
              {location}
              {' '}
              on
              {' '}
              {dateStr}
            </Flex>
          )
            : (
              <Flex justifyContent="center">
                <Link color="blue.400" href={`/${item.tracking}`}>
                  View Detail
                </Link>
              </Flex>
            )}
          {isExtended && (
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
                  <Link color="blue.400" href={`/${item.tracking}`}>View More</Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          ) }
        </Box>
      </Box>
    </Flex>
  );
};

export default Item;
