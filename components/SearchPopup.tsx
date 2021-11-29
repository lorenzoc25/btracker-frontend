import { useState, useContext } from 'react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');
  const [matchedPackage, setMatchedPackge] = useState(state.packageList);
  const searchPackage = (key : string) : void => {
    const searchKey = key.toLowerCase();
    const mathced = state.packageList.filter(
      (packageInfo) => (
        packageInfo.name.toLowerCase().includes(searchKey)
        || packageInfo.tracking.includes(searchKey)
      ),
    );
    setMatchedPackge(mathced);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value);
    searchPackage(value);
  };

  const wrapOnClose = () => {
    setValue('');
    setMatchedPackge(state.packageList);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} background="none" p={0}>
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
                placeholder="Enter name/tracking number of your package: "
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
