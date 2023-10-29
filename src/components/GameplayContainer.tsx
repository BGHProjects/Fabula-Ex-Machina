import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts/AppStateContext";
import BackButton from "./BackButton";
import APIKeySubmission from "./APIKeySubmission";
import StoryTitleSubmission from "./StoryTitleSubmission";
import GeneratingLoadingUI from "./GeneratingLoadingUI";
import CurrentArcUI from "./CurrentArcUI";
import GeneratingErrorUI from "./GeneratingErrorUI";

const screenTransitionDuration = 1;

const GameplayContainer = () => {
  const { playingGame, setPlayingGame, generating, storyTitle } =
    useAppContext();

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
              <APIKeySubmission />
              <StoryTitleSubmission />
              <GeneratingLoadingUI />
              {!generating && storyTitle && <CurrentArcUI />}
              <GeneratingErrorUI />
            </motion.div>
          </>
        )}
      </motion.div>
    </Flex>
  );
};

export default GameplayContainer;
