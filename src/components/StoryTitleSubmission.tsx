import { VStack, Text, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import StaticAppButton from "./StaticAppButton";

interface IStoryTitleSubmission {
  submittingStoryTitle: boolean;
  screenTransitionDuration: number;
  setStoryTitleInput: (arg1: string) => void;
  handleSubmitStoryTitle: () => void;
}

/**
 * UI Elements that display when the user
 * is prompted to submit the title of their story
 */
const StoryTitleSubmission = ({
  submittingStoryTitle,
  screenTransitionDuration,
  setStoryTitleInput,
  handleSubmitStoryTitle,
}: IStoryTitleSubmission) => {
  return (
    <motion.div
      style={{
        opacity: 0,
      }}
      animate={{
        opacity: submittingStoryTitle ? [1, 0] : [0, 1],
      }}
      transition={{
        ease: "easeInOut",
        duration: screenTransitionDuration,
        delay: 0,
      }}
    >
      <VStack h="100%" pt="20%" spacing="30px">
        <Text fontFamily="YsabeauInfant" color="white" fontSize="28px">
          Enter the title of your Story
        </Text>
        <Text
          fontFamily="YsabeauInfant"
          color="white"
          fontSize="16px"
          w="80%"
          textAlign="center"
          mt="0"
          mb="30px"
        >
          Once submitted, the machine learning model will craft the introduction
          to your story based on the title you have provided.
        </Text>
        <Input
          type="text"
          textAlign="center"
          border="2px solid white"
          w="80%"
          maxWidth="800px"
          textColor="white"
          fontSize="24px"
          h="60px"
          mb="30px"
          onChange={(e) => setStoryTitleInput(e.target.value)}
          placeholder="Story Title"
          fontFamily="YsabeauInfant"
        />
        <StaticAppButton
          height={60}
          width={200}
          action={handleSubmitStoryTitle}
          label="SUBMIT"
        />
      </VStack>
    </motion.div>
  );
};

export default StoryTitleSubmission;
