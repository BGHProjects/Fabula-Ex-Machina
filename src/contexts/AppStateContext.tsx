import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";

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
  handleGenerateAct: (prompt: string, prompt2?: string) => Promise<void>;
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
  restartGame: () => void;
  generatingError: boolean;
  setGeneratingError: Dispatch<SetStateAction<boolean>>;
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
  const [generatingError, setGeneratingError] = useState(false);
  const [chain, setChain] = useState<ConversationChain | undefined>(undefined);

  const modelTemplate =
    "You are StoryGPT. You are to write an epic story consisting of an introduction, a first act, a second act, and a third part. Each of these parts must be no longer than 300 words. Each of these parts will be based on a prompt that is given to you by the user. Just include the raw text of the part of the story in your response. Do not include any formatting strings in your response, including \n or \t.";
  const humanTemplate =
    "Get ready to generate the next part of the story. Remember to limit your response to no longer than 300 words. {input}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", modelTemplate],
    new MessagesPlaceholder("history"),
    ["human", humanTemplate],
  ]);

  const createChain = () => {
    const model = new OpenAI({
      openAIApiKey: apiKey,
      temperature: 0.9,
      modelName: "gpt-3.5-turbo",
    });
    const memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
    });
    const newChain = new ConversationChain({
      llm: model,
      memory: memory,
      prompt: chatPrompt,
    });
    setChain(newChain);
  };

  useEffect(() => {
    if (apiKey) createChain();
  }, [apiKey]);

  const handleGenerateAct = async (prompt: string, prompt2?: string) => {
    const actions: Record<number, any> = {
      0: {
        setPrompt: () => {
          setStoryTitle(prompt), setStoryIntroPrompt(prompt2);
        },
        chainCall: {
          input:
            "Now you are to generate the introduction to the story. The name of the story is: " +
            prompt +
            " and the prompt is this: " +
            prompt2,
        },
        setContent: setIntro,
      },
      1: {
        setPrompt: () => setAct1Prompt(prompt),
        chainCall: {
          input:
            "Now you are to generate the first act of the story. The prompt to generate is: " +
            prompt,
        },
        setContent: setAct1Content,
      },
      2: {
        setPrompt: () => setAct2Prompt(prompt),
        chainCall: {
          input:
            "Now you are to generate the second act of the story. The prompt to generate is: " +
            prompt,
        },
        setContent: setAct2Content,
      },
      3: {
        setPrompt: () => setAct3Prompt(prompt),
        chainCall: {
          input:
            "Now you are to generate the final act of the story. The prompt to generate is: " +
            prompt,
        },
        setContent: setAct3Content,
      },
    };

    try {
      // Generate the act of the story

      setGenerating(true);
      setGeneratingFinished(false);

      actions[whichAct].setPrompt();
      const res = await (chain as ConversationChain).call(
        actions[whichAct].chainCall
      );
      actions[whichAct].setContent(res.response);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGeneratingFinished(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGenerating(false);
      setWhichAct(whichAct + 1);
    } catch (err) {
      console.log("Error was this: ", err);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGeneratingError(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGenerating(false);
    }
  };

  const restartGame = () => {
    setPlayingGame(false);
    setWhichAct(0);

    setAPIKey(undefined);
    setStoryTitle(undefined);
    setStoryIntroPrompt(undefined);
    setIntro(undefined);
    setAct1Prompt(undefined);
    setAct1Content(undefined);
    setAct2Prompt(undefined);
    setAct2Content(undefined);
    setAct3Prompt(undefined);
    setAct3Content(undefined);
    setGeneratingError(false);
    setChain(undefined);
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
        restartGame,
        generatingError,
        setGeneratingError,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppContext = () => useContext(AppStateContext);

export { AppStateContextProvider, useAppContext };
