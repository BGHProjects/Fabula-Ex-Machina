import { Center, Text, chakra } from "@chakra-ui/react";
import { AnimatedDiv, AnimatedSpan } from "../components/AnimatedComponents";
import { useAppContext } from "../contexts/AppStateContext";
import { GameplayContainer, AppButton } from "../components";

const Home = () => {
  const gameName = "FABULA EX MACHINA";
  const subtitle = "A Generative Narrative Game";
  const text_anim_duration = 0.5;
  const full_anim_duration = text_anim_duration * 4;
  const { playingGame, setPlayingGame } = useAppContext();

  return (
    <>
      <FadeContainer
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 0],
        }}
        // @ts-ignore
        transition={{
          delay: 3.5,
          duration: 5,
          ease: "easeInOut",
        }}
      />
      <GameplayContainer />
      <MainMenuContainer
        initial={{ opacity: 1, display: "flex" }}
        animate={{
          opacity: playingGame ? [1, 0] : [0, 1],
          display: playingGame ? ["flex", "none"] : "flex",
        }}
        // @ts-ignore
        transition={{
          ease: "easeInOut",
          display: {
            delay: 1,
          },
          opacity: {
            delay: !playingGame ? 1 : 0,
            duration: 1,
          },
        }}
      >
        <Center h="25vh" w="100vw" bg="rgba(0,0,0,0.9)" flexDir="column">
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
          <Text textAlign="center" fontSize="30px" fontFamily="YsabeauInfant">
            {subtitle.split("").map((char, index) => (
              <AnimatedSpan
                style={{ color: "white" }}
                key={char}
                // @ts-ignore
                transition={{
                  opacity: {
                    delay: full_anim_duration + (index * 1) / subtitle.length,
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
        <Center height={180} width="fit-content">
          <AppButton
            width={200}
            height={80}
            animDuration={0.2}
            label="PLAY NOW"
            action={() => setPlayingGame(true)}
            animDelay={6}
          />
        </Center>
      </MainMenuContainer>
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

const MainMenuContainer = chakra(AnimatedDiv, {
  shouldForwardProp: () => true,
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "rgba(0,0,0,0)",
    w: "100vw",
    h: "100vh",
    position: "absolute",
    zIndex: "1",
    flexDir: "column",
  },
});

export default Home;
