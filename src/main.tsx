import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "app/App";
import { Provider } from "react-redux";
import { store } from "app/AppStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
