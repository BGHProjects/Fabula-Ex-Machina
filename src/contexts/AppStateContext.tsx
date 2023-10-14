import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { loremIpsum } from "../constants/loremIpsum";

interface IAppStateContext {
  playingGame: boolean;
  setPlayingGame: Dispatch<SetStateAction<boolean>>;
  apiKey: string | undefined;
  setAPIKey: Dispatch<SetStateAction<string | undefined>>;
  generating: boolean;
  setGenerating: Dispatch<SetStateAction<boolean>>;
  generatingFinished: boolean;
  setGeneratingFinished: Dispatch<SetStateAction<boolean>>;
  storyTitle: string | undefined;
  setStoryTitle: Dispatch<SetStateAction<string | undefined>>;
  storyIntroPrompt: string | undefined;
  setStoryIntroPrompt: Dispatch<SetStateAction<string | undefined>>;
  handleGenerateAct: (prompt: string, prompt2?: string) => void;
  intro: string | undefined;
  setIntro: Dispatch<SetStateAction<string | undefined>>;
  whichAct: number;
  setWhichAct: Dispatch<SetStateAction<number>>;
  act1Prompt: string | undefined;
  setAct1Prompt: Dispatch<SetStateAction<string | undefined>>;
  act2Prompt: string | undefined;
  setAct2Prompt: Dispatch<SetStateAction<string | undefined>>;
  act3Prompt: string | undefined;
  setAct3Prompt: Dispatch<SetStateAction<string | undefined>>;
  act1Content: string | undefined;
  setAct1Content: Dispatch<SetStateAction<string | undefined>>;
  act2Content: string | undefined;
  setAct2Content: Dispatch<SetStateAction<string | undefined>>;
  act3Content: string | undefined;
  setAct3Content: Dispatch<SetStateAction<string | undefined>>;
}

const AppStateContext = createContext<IAppStateContext>({} as IAppStateContext);

const AppStateContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [playingGame, setPlayingGame] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingFinished, setGeneratingFinished] = useState(false);
  const [apiKey, setAPIKey] = useState<string | undefined>(undefined);
  const [storyTitle, setStoryTitle] = useState<string | undefined>(undefined);
  const [storyIntroPrompt, setStoryIntroPrompt] = useState<string | undefined>(
    undefined
  );
  const [intro, setIntro] = useState<string | undefined>(undefined);
  const [act1Prompt, setAct1Prompt] = useState<string | undefined>(undefined);
  const [act2Prompt, setAct2Prompt] = useState<string | undefined>(undefined);
  const [act3Prompt, setAct3Prompt] = useState<string | undefined>(undefined);
  const [act1Content, setAct1Content] = useState<string | undefined>(undefined);
  const [act2Content, setAct2Content] = useState<string | undefined>(undefined);
  const [act3Content, setAct3Content] = useState<string | undefined>(undefined);
  const [whichAct, setWhichAct] = useState(0);

  const handleGenerateAct = async (prompt: string, prompt2?: string) => {
    // Generate the act of the story

    setGenerating(true);
    setGeneratingFinished(false);

    // Just for testing purposes
    if (whichAct === 3) {
      setAct3Content("Third Act Content");
    }
    if (whichAct === 2) {
      setAct2Content("Second Act Content");
      setWhichAct(3);
    }
    if (whichAct === 1) {
      setAct1Content("First Act Content");
      setWhichAct(2);
    }
    if (whichAct === 0) {
      setStoryTitle(prompt);
      setStoryIntroPrompt(prompt2);
      setIntro(loremIpsum);
      setWhichAct(1);
    }

    /**
     * First we set generating finished to true so it fades out
     *
     * Then we set generating to false so it is removed from the dom
     *
     */

    setTimeout(() => {
      setGeneratingFinished(true);
    }, 1000);

    setTimeout(() => {
      setGenerating(false);
    }, 2000);
  };

  return (
    <AppStateContext.Provider
      value={{
        playingGame,
        setPlayingGame,
        apiKey,
        setAPIKey,
        generating,
        setGenerating,
        generatingFinished,
        setGeneratingFinished,
        storyTitle,
        setStoryTitle,
        storyIntroPrompt,
        setStoryIntroPrompt,
        handleGenerateAct,
        intro,
        setIntro,
        act1Prompt,
        setAct1Prompt,
        act2Prompt,
        setAct2Prompt,
        act3Prompt,
        setAct3Prompt,
        act1Content,
        setAct1Content,
        act2Content,
        setAct2Content,
        act3Content,
        setAct3Content,
        whichAct,
        setWhichAct,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppContext = () => useContext(AppStateContext);

export { AppStateContextProvider, useAppContext };
