import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Input,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import CryptoJS from 'crypto-js';

const DecryptionSection = ({ hiddenFiles, setHiddenFiles, masterPassphrase, setMasterPassphrase }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [decryptionKey, setDecryptionKey] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handlePassphraseSubmit = (e) => {
    e.preventDefault();
    if (masterPassphrase === 'keerdivi') { // In a real app, this should be properly hashed and stored
      setIsRevealed(true);
    } else {
      toast({
        title: "Invalid passphrase",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleKeyFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDecryptionKey(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const decryptFile = async () => {
    if (!selectedFile || !decryptionKey) {
      toast({
        title: "Missing file or key",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(selectedFile.encryptedContent, decryptionKey).toString(CryptoJS.enc.Utf8);
      
      // Create and download decrypted file
      const link = document.createElement('a');
      link.href = decrypted;
      link.download = selectedFile.name;
      link.click();

      toast({
        title: "File decrypted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      setSelectedFile(null);
      setDecryptionKey('');
    } catch (error) {
      toast({
        title: "Decryption failed",
        description: "Invalid key or corrupted file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {!isRevealed ? (
        <Box as="form" onSubmit={handlePassphraseSubmit}>
          <Text mb={2} fontWeight="bold">Enter master passphrase to reveal hidden files:</Text>
          <Input
            type="password"
            value={masterPassphrase}
            onChange={(e) => setMasterPassphrase(e.target.value)}
            mb={4}
          />
          <Button type="submit" colorScheme="blue">
            Reveal Files
          </Button>
        </Box>
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>File Name</Th>
              
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hiddenFiles.map((file, index) => (
                <Tr key={index}>
                  <Td>{file.name}</Td>
                  <Td>{new Date(file.timestamp).toLocaleDateString()}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => {
                        setSelectedFile(file);
                        onOpen();
                      }}
                    >
                      Decrypt
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Decrypt {selectedFile?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={4}>
                  <Box>
                    <Text mb={2}>Upload Decryption Key:</Text>
                    <Input
                      type="file"
                      accept=".key"
                      onChange={handleKeyFileSelect}
                      p={1}
                    />
                  </Box>
                  <Button
                    colorScheme="blue"
                    onClick={decryptFile}
                    isDisabled={!decryptionKey}
                  >
                    Decrypt File
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </VStack>
  );
};

export default DecryptionSection;