import { useEffect } from "react";
import Header from "./components/Header/Header";

import { blockVerticalScrollApp } from "./lib/utils/blockVerticalScrollApp";

function App() {

  window.Telegram.WebApp.expand();

  useEffect(() => {
    blockVerticalScrollApp(true)
  }, [])

  return <>
    <Header />
  </>;
}

export default App;
