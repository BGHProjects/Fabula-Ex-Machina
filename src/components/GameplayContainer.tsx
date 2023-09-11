import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts/AppStateContext";
import BackButton from "./BackButton";

const screenTransitionDuration = 1;

const GameplayContainer = () => {
  const { playingGame, setPlayingGame } = useAppContext();

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
          <BackButton
            animDelay={screenTransitionDuration * 2}
            action={() => setPlayingGame(false)}
          />
        )}
      </motion.div>
    </Flex>
  );
};

export default GameplayContainer;
