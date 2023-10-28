import { VStack, Text, Input, useToast, Textarea } from "@chakra-ui/react";
import { motion } from "framer-motion";
import StaticAppButton from "./StaticAppButton";
import { useAppContext } from "../contexts/AppStateContext";
import { useState } from "react";

/**
 * UI Elements that display when the user
 * is prompted to submit the title of their story
 */
const StoryTitleSubmission = () => {
  const toast = useToast();

  const { handleGenerateAct, apiKey, storyTitle } = useAppContext();

  const [storyTitleInput, setStoryTitleInput] = useState<string | undefined>(
    undefined
  );
  const [storyIntroductionInput, setStoryIntroductionInput] = useState<
    string | undefined
  >(undefined);

  const [submittingStoryIntroduction, setSubmittingStoryIntroduction] =
    useState(false);

  const [introSubmitted, setIntroSubmitted] = useState(false);

  const handleSubmitStoryTitle = async () => {
    if (!storyTitleInput || !storyIntroductionInput) {
      toast({
        title: "Invalid Story Title and Introduction",
        description: "Please submit a valid story title and introduction",
        status: "error",
      });

      return;
    }

    setSubmittingStoryIntroduction(true);

    // This handles fading it out
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIntroSubmitted(true);

    await handleGenerateAct(
      storyTitleInput as string,
      storyIntroductionInput as string
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStoryTitleInput(undefined);
    setSubmittingStoryIntroduction(false);
  };

  return (
    apiKey &&
    !storyTitle && (
      <motion.div
        style={{
          opacity: 0,
          display:
            apiKey && !storyTitle ? "flex" : introSubmitted ? "none" : "none",
        }}
        animate={{
          opacity: submittingStoryIntroduction ? [1, 0] : [0, 1],
        }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0,
        }}
      >
        <VStack h="100%" pt="20%" spacing="30px" w="100%">
          <Text fontFamily="YsabeauInfant" color="white" fontSize="28px">
            Begin Your Story
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
            Provide a title and a brief overview of the beginning of your story.
            Once submitted the machine learning model will craft the
            introduction to your story.
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

          <Text my="-5" color="white" w="80%" fontFamily="YsabeauInfant">
            {storyIntroductionInput?.length ?? 0} / 200
          </Text>

          <Textarea
            border="2px solid white"
            w="80%"
            textColor="white"
            fontSize="16px"
            h="150px"
            mb="30px"
            fontFamily="YsabeauInfant"
            placeholder="Story Beginning Prompt"
            maxLength={200}
            onChange={(e) => setStoryIntroductionInput(e.target.value)}
          />
          <StaticAppButton
            height={60}
            width={200}
            action={handleSubmitStoryTitle}
            label="SUBMIT"
          />
        </VStack>
      </motion.div>
    )
  );
};

export default StoryTitleSubmission;
