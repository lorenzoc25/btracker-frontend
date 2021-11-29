import React, { useState } from 'react';
import {
  InputGroup,
  Input,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const SearchBox = () => {
  const [tracking, setTracking] = useState('');
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setTracking(event.target.value);

  const handleClick = () => {
    console.log(tracking);
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
          colorScheme="blue"
          onClick={handleClick}
        >
          Track
        </Button>
      </InputGroup>
    </Flex>
  );
};

export default SearchBox;
