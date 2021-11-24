import React, { useState } from 'react';
import { InputGroup, Input, Button, Flex } from '@chakra-ui/react';

const SearchBox = () => {
  const [value, setValue] = useState('');
  const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) => setValue(event.target.value);
  const handleClick = () =>{
    console.log(value);
  };
  return <Flex width='100%' my='2em'>
        <InputGroup justifyContent={'center'}>
            <Input 
              rounded='lg'
              mx={3} 
              width='70%' 
              placeholder='Enter a tracking number'
              value={value}
              onChange={handleChange}
              isFullWidth={true}
            />
            <Button colorScheme='blue' onClick={handleClick}> Search </Button>
        </InputGroup>
        </Flex>;
};

export default SearchBox;
