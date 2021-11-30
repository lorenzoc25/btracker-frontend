import { ChangeEvent } from 'react';
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

interface InputPopupProps {
  content: any;
  title: string;
  placeholder: string;
  action: () => void;
  value: string;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

const InputPopup = ({
  content,
  title,
  placeholder,
  action,
  value,
  handleInputChange,
}: InputPopupProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wrapOnClose = () => {
    action();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} p={0}>
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
                onChange={handleInputChange}
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

export default InputPopup;
