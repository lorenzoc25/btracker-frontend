import React from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Chrono } from 'react-chrono';
import { getStatusColor } from './Item';
import { Package } from '../types/package';
import ConfirmPopup from './ConfirmPopup';
import InputPopup from './InputPopup';

interface ItemProps {
  item: Package;
}

const deleteItem = async () => {
  console.log('deleted item!');
};

// const example = [{
//   title: "May 1940",
//   cardTitle: "Dunkirk",
//   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
//   cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
//   media: {
//     type: "IMAGE",
//     source: {
//       url: "http://someurl/image.jpg"
//     }
//   }
// }, ...];

const Detail = ({ item }: ItemProps) => {
  const statColor = getStatusColor(item.status);
  const { history } = item;
  const { location, timestamp } = history[0];
  const date = new Date(timestamp);
  const dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

  const histroyList = history.map((event: { status: string; timestamp: number }) => {
    const eventDate = new Date(event.timestamp);
    const eventDateStr = `${eventDate.getFullYear()}/${eventDate.getMonth() + 1}/${eventDate.getDate()}`;
    const historyItem = {
      title: eventDateStr,
      cardTitle: event.status,
      cardDetailedText: `Package was last seen at ${location} on ${eventDateStr}`,
    };
    return historyItem;
  });
  return (
    <>
      <Flex
        py={2}
        px={{ base: 0 }}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            {item.carrier}
            {' '}
            -
            {' '}
            {item.tracking}
          </chakra.span>
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
      </Flex>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="70%"
        >
          <Chrono
            items={histroyList}
            mode="VERTICAL_ALTERNATING"
            scrollable
            cardHeight={60}
            useReadMore={false}
            theme={{
              primary: '#3182CE',
              secondary: '#EBF8FF',
            }}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Detail;
