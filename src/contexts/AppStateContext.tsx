import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

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
  handleSubmitStoryTitle: (storyTitleInput: string) => void;
  handleGenerateAct: (whichAct: number, prompt: string) => void;
  intro: string | undefined;
  setIntro: Dispatch<SetStateAction<string | undefined>>;
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
  const [intro, setIntro] = useState<string | undefined>(undefined);
  const [act1Prompt, setAct1Prompt] = useState<string | undefined>(undefined);
  const [act2Prompt, setAct2Prompt] = useState<string | undefined>(undefined);
  const [act3Prompt, setAct3Prompt] = useState<string | undefined>(undefined);
  const [act1Content, setAct1Content] = useState<string | undefined>(undefined);
  const [act2Content, setAct2Content] = useState<string | undefined>(undefined);
  const [act3Content, setAct3Content] = useState<string | undefined>(undefined);

  const handleGenerateAct = (whichAct: number, prompt: string) => {
    // Generate the act of the story
    const result = "content";

    if (whichAct === 3) setAct3Content(result);
    if (whichAct === 2) setAct2Content(result);
    if (whichAct === 1) setAct1Content(result);
  };

  const handleSubmitStoryTitle = (storyTitleInput: string) => {
    // Generate the story introduction
    const result = "content";

    setStoryTitle(result);
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
        handleSubmitStoryTitle,
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
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppContext = () => useContext(AppStateContext);

export { AppStateContextProvider, useAppContext };
