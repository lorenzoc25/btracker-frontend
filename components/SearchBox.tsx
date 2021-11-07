import React from 'react';
import { InputGroup, Input, Button, Flex} from '@chakra-ui/react';
// import styles from '../styles/SearchBox.module.css';

const SearchBox = () => {
  return <Flex>
        <InputGroup justifyContent={'center'}>
            <Input rounded='lg' mx={3} width={'50%'} placeholder='Enter a tracking number' />
            <Button colorScheme='blue'> Search </Button>
        </InputGroup>
        </Flex>;
};

export default SearchBox;