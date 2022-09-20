import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import Store from "src/store";
import "src/day";

import App from "./App";
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={new Store()}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
