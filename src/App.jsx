import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import EncryptionSection from './components/EncryptionSection';
import DecryptionSection from './components/DecryptionSection';

function App() {
  const [hiddenFiles, setHiddenFiles] = useState([]);
  const [masterPassphrase, setMasterPassphrase] = useState('');

  return (
    <ChakraProvider>
      {/* Background Image Layer */}
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('1.jpg')`,
          position: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      ></div>

      {/* Main UI Content */}
      <Box minH="100vh" p={8} display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={8} w={{ base: "100%", md: "80%", lg: "60%" }}>
          <Box
            w="full"
            bg="rgba(255, 255, 255, 0.1)"
            p={6}
            borderRadius="xl"
            boxShadow="0 0 25px rgba(30, 144, 255, 0.7), 0 0 60px rgba(30, 144, 255, 0.4)"
            backdropFilter="blur(15px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            transition="0.3s ease-in-out"
          >
            <Tabs isFitted variant="unstyled">
              <TabList mb="1em" gap={4}>
                <Tab
                  _selected={{
                    bg: 'blue.500',
                    color: 'white',
                    borderRadius: 'md',
                    boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)'
                  }}
                  _hover={{ bg: 'blue.400', color: 'white' }}
                  fontWeight="bold"
                  py={3}
                >
                  Encrypt Files
                </Tab>
                <Tab
                  _selected={{
                    bg: 'blue.500',
                    color: 'white',
                    borderRadius: 'md',
                    boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)'
                  }}
                  _hover={{ bg: 'blue.400', color: 'white' }}
                  fontWeight="bold"
                  py={3}
                >
                  Decrypt Files
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <EncryptionSection
                    hiddenFiles={hiddenFiles}
                    setHiddenFiles={setHiddenFiles}
                  />
                </TabPanel>
                <TabPanel>
                  <DecryptionSection
                    hiddenFiles={hiddenFiles}
                    setHiddenFiles={setHiddenFiles}
                    masterPassphrase={masterPassphrase}
                    setMasterPassphrase={setMasterPassphrase}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
