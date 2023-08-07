import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useAppButton from "../hooks/components/useAppButton";
import buttonStyle from "../styles/buttonStyle";

export interface IAppButton {
  width: number;
  height: number;
  animDuration: number;
  animDelay?: number;
  action: () => void;
  label: string;
}

const hslWhite = "hsl(0, 0, 100)";
const hslBlack = "hsl(0,0,0)";

const AppButton = ({
  width,
  height,
  animDelay = 0,
  animDuration,
  action,
  label,
}: IAppButton) => {
  const { state, functions } = useAppButton(animDelay, action);
  const { animationDelay } = state;
  const { handleMouseEnter, handleMouseLeave, handleHoverState, handleClick } =
    functions;

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={
        {
          ...buttonStyle(width, height),
          backgroundColor: "hsl(0, 0, 0, 0.8)",
        } as any
      }
      animate={{
        y: [-100, 0],
        opacity: [0, 1],
        width: [0, width],
        height: [0, height],
        backgroundColor: handleHoverState("hsl(0, 0, 0, 0.8)", hslWhite) as any,
      }}
      transition={{
        ease: "easeInOut",
        duration: animDuration,
        delay: animationDelay,
        y: {
          duration: animDuration * 3,
          delay: animationDelay,
        },
        width: {
          delay: animDuration * 5 + animationDelay,
          duration: animDuration * 1.5,
        },
        height: {
          delay: animDuration * 3 + animationDelay,
          duration: animDuration * 1.5,
        },
      }}
    >
      <Center boxSize="100%">
        <motion.span
          style={{
            color: hslWhite,
            fontFamily: "YsabeauInfant",
            fontSize: "24px",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1],
            color: handleHoverState(hslWhite, hslBlack) as any,
            fontWeight: handleHoverState("normal", "bold") as any,
          }}
          transition={{
            opacity: {
              duration: animDuration / 2,
              delay: animationDelay + 1.5,
            },
            color: {
              duration: animDuration / 2,
              delay: 0,
            },
            ease: "easeInOut",
          }}
        >
          {label}
        </motion.span>
      </Center>
    </motion.div>
  );
};

export default AppButton;
