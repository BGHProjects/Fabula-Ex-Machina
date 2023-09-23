import { Flex, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts/AppStateContext";
import BackButton from "./BackButton";
import { useState } from "react";
import APIKeySubmission from "./APIKeySubmission";
import StoryTitleSubmission from "./StoryTitleSubmission";

const screenTransitionDuration = 1;

const GameplayContainer = () => {
  const toast = useToast();

  const {
    playingGame,
    setPlayingGame,
    apiKey,
    setAPIKey,
    storyTitle,
    setStoryTitle,
  } = useAppContext();
  const [apiInput, setAPIInput] = useState<string | undefined>(undefined);
  const [submittingAPIKey, setSubmittingAPIKey] = useState(false);

  const [storyTitleInput, setStoryTitleInput] = useState<string | undefined>(
    undefined
  );
  const [submittingStoryTitle, setSubmittingStoryTitle] = useState(false);

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
    }, screenTransitionDuration * 1000);
  };

  const handleSubmitStoryTitle = () => {
    if (!storyTitleInput) {
      toast({
        title: "Invalid Story Title",
        description: "Please submit a valid story title",
        status: "error",
      });

      return;
    }

    setSubmittingStoryTitle(true);

    setTimeout(() => {
      setStoryTitle(storyTitleInput);
      setStoryTitleInput(undefined);
      setSubmittingStoryTitle(false);
    }, screenTransitionDuration * 1000);
  };

  return (
    <Flex justifyContent="center" w="100vw" h="100vh" position="absolute">
      <motion.div
        style={{
          position: "absolute",
          width: "80vw",
          maxWidth: "1200px",
          height: "0vh",
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 3,
        }}
        animate={{
          height: playingGame ? ["0vh", "100vh"] : "0vh",
        }}
        transition={{
          ease: "easeInOut",
          duration: screenTransitionDuration,
          delay: playingGame ? screenTransitionDuration : 0,
        }}
      >
        {playingGame && (
          <>
            <BackButton
              animDelay={screenTransitionDuration * 2}
              action={() => setPlayingGame(false)}
            />
            {/**
             * Container that holds all the content
             */}
            <motion.div
              style={{
                opacity: 0,
              }}
              animate={{
                opacity: playingGame ? [0, 1] : 0,
              }}
              transition={{
                ease: "easeInOut",
                duration: screenTransitionDuration,
                delay: playingGame ? screenTransitionDuration * 2.5 : 0,
              }}
            >
              {!apiKey && (
                <APIKeySubmission
                  submittingAPIKey={submittingAPIKey}
                  screenTransitionDuration={screenTransitionDuration}
                  setAPIInput={setAPIInput}
                  handleSubmitAPIKey={handleSubmitAPIKey}
                />
              )}

              {apiKey && !storyTitle && (
                <StoryTitleSubmission
                  submittingStoryTitle={submittingStoryTitle}
                  screenTransitionDuration={screenTransitionDuration}
                  setStoryTitleInput={setStoryTitleInput}
                  handleSubmitStoryTitle={handleSubmitStoryTitle}
                />
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </Flex>
  );
};

export default GameplayContainer;
