import React, { useState } from 'react';
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

interface InfoPopupProps {
  content : any;
  title : string;
  placeholder : string;
}

const InfoPopup = ({ content, title, placeholder } : InfoPopupProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setValue(event.target.value);

  const wrapOnClose = () => {
    console.log(value);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} background="none" p={0}>
        {content}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup justifyContent="center">
              <Input
                rounded="lg"
                mx={3}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter justifyContent="space-around">
            <Button colorScheme="blue" mr={3} onClick={wrapOnClose}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoPopup;
