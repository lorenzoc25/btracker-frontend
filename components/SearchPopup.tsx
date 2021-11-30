import { useState, useContext, ChangeEvent } from 'react';
import {
  Button,
  Input,
  InputGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { AppContext } from '../context/context';
import PackageList from './PackageList';

const SearchPopup = () => {
  const { state } = useContext(AppContext);
  const { packageList } = state;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');
  const [matchedPackage, setMatchedPackge] = useState(packageList);

  const searchPackage = () => {
    const searchKey = value.toLowerCase();
    const mathced = packageList.filter(
      (packageInfo) => (
        packageInfo.name.toLowerCase().includes(searchKey)
        || packageInfo.tracking.includes(searchKey)
      ),
    );
    setMatchedPackge(mathced);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value);
    if (event.target.value === '') {
      setMatchedPackge(packageList);
      return;
    }
    searchPackage();
  };

  const wrapOnClose = () => {
    setValue('');
    setMatchedPackge(packageList);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} background="transparent" p={0}>
        <Search2Icon />
      </Button>
      <Modal isOpen={isOpen} onClose={wrapOnClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Search Existing Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup justifyContent="center">
              <Input
                rounded="lg"
                mx={3}
                placeholder="Enter name/tracking number of your package"
                value={value}
                onChange={handleChange}
              />
            </InputGroup>
          </ModalBody>
          <PackageList items={matchedPackage} isExtended={false} />
          <ModalFooter justifyContent="space-around">
            <Button colorScheme="blue" mr={3} onClick={wrapOnClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchPopup;
