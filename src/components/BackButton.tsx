import { ArrowBackIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts/AppStateContext";
import useAppButton from "../hooks/components/useAppButton";

interface IBackButton {
  animDelay?: number;
  action: () => void;
}

const hslWhite = "hsl(0, 0, 100)";
const hslBlack = "hsl(0,0,0)";

/**
 * Button used to navigate backwards
 */
const BackButton = ({ animDelay = 0, action }: IBackButton) => {
  const { playingGame } = useAppContext();

  const { state, functions } = useAppButton(animDelay, action);
  const { hovering } = state;
  const { handleMouseEnter, handleMouseLeave, handleHoverState, handleClick } =
    functions;

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "absolute",
        top: "5%",
        left: "5%",
        zIndex: 2,
        borderRadius: 50,
        cursor: "pointer",
        display: playingGame ? "flex" : "none",
        border: "2px solid white",
        padding: "5px",
      }}
      animate={{
        opacity: [0, 1],
        backgroundColor: handleHoverState(hslBlack, hslWhite) as any,
      }}
      transition={{
        opacity: {
          delay: animDelay,
        },
      }}
    >
      <Center boxSize="100%">
        <ArrowBackIcon color={hovering ? "black" : "white"} boxSize={7} />
      </Center>
    </motion.div>
  );
};

export default BackButton;
