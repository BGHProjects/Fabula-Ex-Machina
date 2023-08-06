import Home from "./pages/Home";
import LoadingPage from "./pages/LoadingPage";
import { useEffect, useState } from "react";

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const checkFontLoad = async () => {
    const font = new FontFace(
      "Ysabeau Infant",
      'url("/assets/fonts/Ysabeau_Infant/static/YsabeauInfant-Regular.ttf")'
    );

    try {
      await font.load();
      document.fonts.add(font);
      setIsFontLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkFontLoad();
  }, []);

  return isFontLoaded ? <Home /> : <LoadingPage />;
};

export default App;
