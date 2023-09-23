import { Center } from "@chakra-ui/react";
import useAppButton from "../hooks/components/useAppButton";
import { motion } from "framer-motion";
import buttonStyle from "../styles/buttonStyle";

export interface IStaticAppButton {
  width?: number;
  height?: number;
  action: () => void;
  label: string;
}

const hslWhite = "hsl(0, 0, 100)";
const hslBlack = "hsl(0,0,0)";

/**
 * Button that doesn't have the drop animation
 */
const StaticAppButton = ({
  width = 200,
  height = 80,
  action,
  label,
}: IStaticAppButton) => {
  const animDuration = 0.2;

  const { state, functions } = useAppButton(animDuration, action);
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
        backgroundColor: handleHoverState("hsl(0, 0, 0, 0.8)", hslWhite) as any,
      }}
      transition={{
        ease: "easeInOut",
        duration: animDuration,
        delay: animationDelay,
      }}
    >
      <Center boxSize="100%">
        <motion.span
          style={{
            color: hslWhite,
            fontFamily: "YsabeauInfant",
            fontSize: "24px",
          }}
          animate={{
            color: handleHoverState(hslWhite, hslBlack) as any,
            fontWeight: handleHoverState("normal", "bold") as any,
          }}
          transition={{
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

export default StaticAppButton;
