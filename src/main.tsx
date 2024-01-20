import ReactDOM from "react-dom/client";
import "./index.css";
import { ProfilePage } from "pages/profile";
import { ConfigurePage } from "pages/configure";
import { App } from "app/App";
import { StrategyPage } from "pages/strategy";

ReactDOM.createRoot(document.getElementById("root")!).render(<StrategyPage />);
