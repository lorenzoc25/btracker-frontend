import { useState, KeyboardEvent, ChangeEvent } from 'react';
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
  action: () => Promise<void>;
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
  const [loading, setLoading] = useState(false);

  const wrapOnClose = async () => {
    setLoading(true);
    await action();
    setLoading(false);
    onClose();
  };

  const handleKeyboard = async (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      await wrapOnClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen} p={0} background="transparent">
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
                onKeyPress={handleKeyboard}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter justifyContent="space-around">
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              isDisabled={value === ''}
              onClick={wrapOnClose}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InputPopup;
