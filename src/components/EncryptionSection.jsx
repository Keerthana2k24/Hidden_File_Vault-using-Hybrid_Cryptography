import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Input,
  useToast,
  Progress,
} from '@chakra-ui/react';
import CryptoJS from 'crypto-js';

const EncryptionSection = ({ hiddenFiles, setHiddenFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const toast = useToast();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const generateEncryptionKey = () => {
    return CryptoJS.lib.WordArray.random(256/8).toString();
  };

  const encryptFile = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const key = generateEncryptionKey();
        const encrypted = CryptoJS.AES.encrypt(e.target.result, key).toString();
        
        // Create key file
        const keyBlob = new Blob([key], { type: 'text/plain' });
        const keyUrl = URL.createObjectURL(keyBlob);
        
        // Download key file
        const keyLink = document.createElement('a');
        keyLink.href = keyUrl;
        keyLink.download = `${file.name}.key`;
        keyLink.click();
        
        resolve({
          name: file.name,
          encryptedContent: encrypted,
          timestamp: new Date().toISOString()
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEncryption = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsEncrypting(true);
    
    try {
      const encryptedFiles = await Promise.all(
        selectedFiles.map(file => encryptFile(file))
      );
      
      setHiddenFiles([...hiddenFiles, ...encryptedFiles]);
      
      toast({
        title: "Files encrypted successfully",
        description: "Download and save your encryption keys safely!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      setSelectedFiles([]);
    } catch (error) {
      toast({
        title: "Encryption failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text mb={2} fontWeight="bold">Select Files to Encrypt</Text>
        <Input
          type="file"
          multiple
          onChange={handleFileSelect}
          accept="*/*"
          p={1}
        />
      </Box>

      {selectedFiles.length > 0 && (
        <Box>
          <Text fontWeight="bold" mb={2}>Selected Files:</Text>
          {selectedFiles.map((file, index) => (
            <Text key={index}>{file.name}</Text>
          ))}
        </Box>
      )}

      {isEncrypting && <Progress size="xs" isIndeterminate />}

      <Button
        colorScheme="blue"
        onClick={handleEncryption}
        isLoading={isEncrypting}
        loadingText="Encrypting..."
      >
        Encrypt Files
      </Button>
    </VStack>
  );
};

export default EncryptionSection;