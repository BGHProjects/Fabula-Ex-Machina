import { Center, Text } from "@chakra-ui/react";

const App = () => {
  return (
    <Center
      bg="rgba(0,0,0,0)"
      w="100vw"
      h="100vh"
      position="absolute"
      zIndex="1"
    >
      <Center h="50vh" w="100vw" bg="rgba(0,0,0,0.9)">
        <Text color="white" textAlign="center" fontSize="40px">
          FABULA EX MACHINA
        </Text>
      </Center>
    </Center>
  );
};

export default App;
