import React from 'react';
import {
  Box,
  Flex,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { History } from '../types/package';

interface HistProp{
  hist : History;
}

const HistStat = ({
  hist,
}: HistProp) => {
  const {
    status, location, timestamp, message,
  } = hist;

  const date = new Date(timestamp);
  const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  return (
    <Flex
      my={0}
    >
      <Box
        mx="auto"
        w="full"
        bg={useColorModeValue('#fafafa', 'gray.800')}
        rounded="lg"
      >
        <Box px={4} py={2}>
          <chakra.h3
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="medium"
            fontSize="2xl"
          >
            {dateStr}
          </chakra.h3>
          <chakra.p
            mt={1}
            color={useColorModeValue('gray.700', 'gray.300')}
          >
            {message ? `${status}, ${message}` : status}
          </chakra.p>
          <chakra.p
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {location}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  );
};

export default HistStat;
