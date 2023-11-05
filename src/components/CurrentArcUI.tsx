import {
  VStack,
  Text,
  Flex,
  Textarea,
  useToast,
  HStack,
  chakra,
} from "@chakra-ui/react";
import StaticAppButton from "./StaticAppButton";
import { useAppContext } from "../contexts/AppStateContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * UI displayed  for the current arc of the story
 * that has been generated by the machine learning model
 * for the user
 */
const CurrentArcUI = () => {
  const {
    handleGenerateAct,
    whichAct,
    intro,
    act1Content,
    act2Content,
    act3Content,
    generatingFinished,
    generating,
    storyTitle,
    storyIntroPrompt,
    act1Prompt,
    act2Prompt,
    act3Prompt,
    generatingError,
    restartGame,
  } = useAppContext();

  const [promptInput, setPromptInput] = useState<string | undefined>();
  const [actDisplayed, setActDisplayed] = useState<string | undefined>();
  const [showWholeStory, setShowWholeStory] = useState(false);
  const [showWholeStoryWithPrompts, setShowWholeStoryWithPrompts] =
    useState(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const toast = useToast();

  const handleSubmit = async () => {
    if (!promptInput) {
      toast({
        title: "Invalid Prompt",
        description: "Please submit a valid prompt",
        status: "error",
      });
      return;
    }

    setSubmitting(true);
    await handleGenerateAct(promptInput);
  };

  const handleViewWholeStory = () => {
    setShowWholeStoryWithPrompts(false);
    setShowWholeStory(true);
  };

  const handleViewWholeStoryWithPrompts = () => {
    setShowWholeStory(false);
    setShowWholeStoryWithPrompts(true);
  };

  const actContent: Record<number, { promptText: string; titleText: string }> =
    {
      0: { promptText: "", titleText: "" },
      1: { promptText: "first", titleText: "Introduction" },
      2: { promptText: "second", titleText: "Act One" },
      3: { promptText: "final", titleText: "Act Two" },
      4: { promptText: "N/A", titleText: "Act Three" },
    };

  useEffect(() => {
    if (whichAct === 1) setActDisplayed(intro);
    if (whichAct === 2) setActDisplayed(act1Content);
    if (whichAct === 3) setActDisplayed(act2Content);
    if (whichAct === 4) setActDisplayed(act3Content);
  }, [whichAct]);

  const finalButtonStyles = {
    height: 80,
    width: 200,
    fontSize: 18,
  };

  return (
    <motion.div
      style={{
        opacity: 0,
        display:
          !generating && !generatingError && storyTitle ? "flex" : "none",
      }}
      animate={{
        opacity: submitting ? [1, 0] : generatingFinished ? [0, 1] : [1, 0],
      }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      }}
    >
      <VStack h="100%" spacing="10" pt="100px" w="100%">
        <Text fontFamily="YsabeauInfant" color="white" fontSize="28px">
          {" "}
          {!showWholeStory && !showWholeStoryWithPrompts
            ? actContent[whichAct].titleText
            : storyTitle}
        </Text>

        <Flex
          maxH="45vh"
          overflowY="auto"
          py="30px"
          px="10%"
          paddingBottom="50px"
          sx={{
            "&::-webkit-scrollbar": {
              w: "3",
              mr: "10",
            },
            "&::-webkit-scrollbar-track": {
              w: "2",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10",
              bg: "white",
            },
          }}
        >
          {!showWholeStory && !showWholeStoryWithPrompts && (
            <Base16Text>{actDisplayed}</Base16Text>
          )}
          {showWholeStory && (
            <VStack spacing={10}>
              <Base16Text>{intro}</Base16Text>
              <Base16Text>{act1Content}</Base16Text>
              <Base16Text>{act2Content}</Base16Text>
              <Base16Text>{act3Content}</Base16Text>
            </VStack>
          )}
          {showWholeStoryWithPrompts && (
            <VStack spacing={10}>
              <Base16Text w="100%">
                Story Intro Prompt:{" "}
                <Text fontStyle="italic">{storyIntroPrompt}</Text>
              </Base16Text>
              <Base16Text>{intro}</Base16Text>
              <Base16Text w="100%">
                Act 1 Prompt: <Text fontStyle="italic">{act1Prompt}</Text>
              </Base16Text>
              <Base16Text>{act1Content}</Base16Text>
              <Base16Text w="100%">
                Act 2 Prompt: <Text fontStyle="italic">{act2Prompt}</Text>
              </Base16Text>
              <Base16Text>{act2Content}</Base16Text>
              <Base16Text w="100%">
                Act 3 Prompt: <Text fontStyle="italic">{act3Prompt}</Text>
              </Base16Text>
              <Base16Text>{act3Content}</Base16Text>
            </VStack>
          )}
        </Flex>

        {whichAct !== 4 && (
          <VStack w="100%">
            <Text
              fontFamily="YsabeauInfant"
              color="white"
              fontSize="20px"
              mb="20px"
            >
              What happens in the {actContent[whichAct].promptText} act of the
              story?
            </Text>
            <Text color="white" w="80%" fontFamily="YsabeauInfant" my="-5px">
              {promptInput?.length ?? 0} / 200
            </Text>
            <Textarea
              border="2px solid white"
              w="80%"
              textColor="white"
              fontSize="16px"
              h="100px"
              mb="30px"
              fontFamily="YsabeauInfant"
              maxLength={200}
              onChange={(e) => setPromptInput(e.target.value)}
            />
            <StaticAppButton
              height={60}
              width={200}
              action={handleSubmit}
              label="SUBMIT"
            />
          </VStack>
        )}

        {whichAct === 4 && (
          <VStack w="100%">
            <Text
              fontFamily="YsabeauInfant"
              color="white"
              fontSize="20px"
              mb="20px"
              px="10%"
              textAlign="center"
            >
              This is the end of your story. Thank you for playing Fabula Ex
              Machina.
            </Text>
            <HStack
              mt="20px"
              w="80%"
              maxW="800px"
              justifyContent="space-between"
            >
              <StaticAppButton
                {...finalButtonStyles}
                action={handleViewWholeStory}
                label="View Full Story"
              />
              <StaticAppButton
                {...finalButtonStyles}
                action={handleViewWholeStoryWithPrompts}
                label="View Full Story With Prompts"
              />
              <StaticAppButton
                {...finalButtonStyles}
                action={restartGame}
                label="Play Again"
              />
            </HStack>
          </VStack>
        )}
      </VStack>
    </motion.div>
  );
};

const Base16Text = chakra(Text, {
  baseStyle: {
    fontFamily: "YsabeauInfant",
    color: "white",
    fontSize: "16px",
  },
});

export default CurrentArcUI;
