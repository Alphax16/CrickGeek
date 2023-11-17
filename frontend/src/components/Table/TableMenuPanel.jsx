import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  VStack,
} from '@chakra-ui/react';


const TableMenuPanel = ({ columns, toggleColumnVisibility, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Column Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={2}>
            {columns.map((column) => (
              <Checkbox
                key={column.id}
                isChecked={column.isVisible}
                onChange={() => toggleColumnVisibility(column.id)}
              >
                {column.Header}
              </Checkbox>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TableMenuPanel;
