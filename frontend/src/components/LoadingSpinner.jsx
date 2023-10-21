import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, CircularProgress } from "@chakra-ui/react";

const LoadingSpinner = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none" textAlign="center">
        <ModalBody>
          <CircularProgress isIndeterminate color="teal.500" size="3rem" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingSpinner;
