import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "app/App";
import { TelegramWebAppProvider } from "@telegram-web-app/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <TelegramWebAppProvider>
        <App />
    </TelegramWebAppProvider>
);
