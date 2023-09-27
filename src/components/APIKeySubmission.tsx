import { VStack, Text, Input, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import StaticAppButton from "./StaticAppButton";
import { useState } from "react";
import { useAppContext } from "../contexts/AppStateContext";

/**
 * UI Elements that display when the user
 * is prompted to submit their API key
 */
const APIKeySubmission = () => {
  const toast = useToast();
  const [submittingAPIKey, setSubmittingAPIKey] = useState(false);
  const [apiInput, setAPIInput] = useState<string | undefined>(undefined);

  const { apiKey, setAPIKey } = useAppContext();

  const handleSubmitAPIKey = () => {
    if (!apiInput) {
      toast({
        title: "Invalid API Key",
        description: "Please submit a valid API key",
        status: "error",
      });

      return;
    }

    setSubmittingAPIKey(true);

    setTimeout(() => {
      setAPIKey(apiInput);
      setAPIInput(undefined);
      setSubmittingAPIKey(false);
    }, 1000);
  };

  return (
    <motion.div
      style={{
        opacity: 1,
        display: !apiKey ? "flex" : "none",
      }}
      animate={{
        opacity: submittingAPIKey ? [1, 0] : !apiKey ? [0, 1] : 1,
      }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      }}
    >
      <VStack h="100%" w="100%" pt="20%" spacing="30px" alignItems="center">
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
