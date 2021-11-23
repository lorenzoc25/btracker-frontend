import React from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface PopupProps {
  content : any;
  title : string;
  message : string;
  button1 : string;
  button2: string;
}

const ConfirmPopup = ({ content, title, message, button1, button2 } : PopupProps) =>{
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
        <>
         <Button onClick={onOpen} background='none' p={0}>
              {content}
            </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader textAlign='center'>{title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {message}
                  </ModalBody>

                  <ModalFooter justifyContent='space-around'>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      {button1}
                    </Button>
                    <Button variant="ghost">{button2}</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
        </>
  );
};

export default ConfirmPopup;