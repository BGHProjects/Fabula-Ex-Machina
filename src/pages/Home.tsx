import { Center, Text, chakra } from "@chakra-ui/react";
import { AnimatedDiv, AnimatedSpan } from "../components/AnimatedComponents";
import { useState } from "react";

const Home = () => {
  const gameName = "FABULA EX MACHINA";

  const text_anim_duration = 0.5;

  return (
    <>
      <FadeContainer
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 0],
        }}
        // @ts-ignore
        transition={{
          delay: 2,
          duration: 5,
          ease: "easeInOut",
        }}
      />
      <Center
        bg="rgba(0,0,0,0)"
        w="100vw"
        h="100vh"
        position="absolute"
        zIndex="1"
      >
        <Center h="20vh" w="100vw" bg="rgba(0,0,0,0.9)">
          <Text textAlign="center" fontSize="80px" fontFamily="YsabeauInfant">
            {gameName.split("").map((char, index) => (
              <AnimatedSpan
                style={{ color: "white" }}
                key={char}
                // @ts-ignore
                transition={{
                  opacity: {
                    delay: 0.5 + (index * 1) / gameName.length,
                    duration: text_anim_duration,
                  },
                }}
                animate={{
                  opacity: [0, 1],
                }}
                initial={{ opacity: 0 }}
              >
                {char}
              </AnimatedSpan>
            ))}
          </Text>
        </Center>
      </Center>
    </>
  );
};

const FadeContainer = chakra(AnimatedDiv, {
  shouldForwardProp: () => true,
  baseStyle: {
    w: "100%",
    h: "100vh",
    bg: "black",
    position: "absolute",
  },
});

export default Home;
