import React from 'react';
import { Package, Status } from '../types/Package';
import { chakra, Box, Flex, useColorModeValue, Link } from '@chakra-ui/react';

import { AiFillCaretDown } from 'react-icons/ai';

interface ItemProps {
  item: Package;
}

const getStatusColor = (status: Status ): string[] =>  {
  if (status === Status.Delivered) {
    return ['green.600', 'green.200'];
  } else if (status === Status.OutOfDelivery) {
    return ['orange.400', 'orange.300'];
  } else if (status === Status.InTransit) {
    return ['cyan.800', 'cyan.200'];
  } else {
    return ['red.500', 'red.400'];
  }
};

const Item = ({ item }: ItemProps) => {
  const statColor = getStatusColor(item.status);
  return (
    <Flex
      p={50}
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
            {item.tracking}
          </chakra.span>
          <chakra.span
            bg={useColorModeValue('brand.200', 'brand.300')}
            color={useColorModeValue('brand.800', 'brand.900')}
            px={3}
            py={1}
            rounded="full"
            textTransform="uppercase"
            fontSize="xs"
          >
            {item.carrier}
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
          > 
          </chakra.p>
        </Box>

        <Box>
          <Flex
            alignItems="center"
            mt={2}
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            <chakra.p
                fontWeight="light">
                Status:    
            </chakra.p>
            <chakra.p
                fontWeight="semibold"
                color={useColorModeValue(statColor[0], statColor[1])}
            >
                {item.status}
            </chakra.p>
            
          </Flex>

          <Flex alignItems="center" justifyContent="center" mt={4}>
            <Link
              mr={2}
              color={useColorModeValue('gray.800', 'gray.400')}
              _hover={{ color: useColorModeValue('gray.700', 'gray.300') }}
              cursor="pointer"
            >
              <AiFillCaretDown />
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Item;