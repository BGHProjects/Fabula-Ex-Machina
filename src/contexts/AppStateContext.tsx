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
  act1Prompt: string | undefined;
  setAct1Prompt: Dispatch<SetStateAction<string | undefined>>;
  act2Prompt: string | undefined;
  setAct2Prompt: Dispatch<SetStateAction<string | undefined>>;
  act3Prompt: string | undefined;
  setAct3Prompt: Dispatch<SetStateAction<string | undefined>>;
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
  const [act1Prompt, setAct1Prompt] = useState<string | undefined>(undefined);
  const [act2Prompt, setAct2Prompt] = useState<string | undefined>(undefined);
  const [act3Prompt, setAct3Prompt] = useState<string | undefined>(undefined);

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
        act1Prompt,
        setAct1Prompt,
        act2Prompt,
        setAct2Prompt,
        act3Prompt,
        setAct3Prompt,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppContext = () => useContext(AppStateContext);

export { AppStateContextProvider, useAppContext };
