import { VStack, Text, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import StaticAppButton from "./StaticAppButton";

interface IAPIKeySubmission {
  submittingAPIKey: boolean;
  screenTransitionDuration: number;
  setAPIInput: (arg1: string) => void;
  handleSubmitAPIKey: () => void;
}

/**
 * UI Elements that display when the user
 * is prompted to submit their API key
 */
const APIKeySubmission = ({
  submittingAPIKey,
  screenTransitionDuration,
  setAPIInput,
  handleSubmitAPIKey,
}: IAPIKeySubmission) => {
  return (
    <motion.div
      style={{
        opacity: 1,
      }}
      animate={{
        opacity: submittingAPIKey ? [1, 0] : 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: screenTransitionDuration,
        delay: 0,
      }}
    >
      <VStack h="100%" pt="20%" spacing="30px">
        <Text fontFamily="YsabeauInfant" color="white" fontSize="28px">
          Enter your OpenAI API Key
        </Text>
        <Input
          type="password"
          textAlign="center"
          border="2px solid white"
          w="80%"
          maxWidth="800px"
          textColor="white"
          fontSize="24px"
          h="60px"
          mb="30px"
          placeholder="API Key"
          fontFamily="YsabeauInfant"
          onChange={(e) => setAPIInput(e.target.value)}
        />
        <StaticAppButton
          height={60}
          width={200}
          action={handleSubmitAPIKey}
          label="SUBMIT"
        />
      </VStack>
    </motion.div>
  );
};

export default APIKeySubmission;
