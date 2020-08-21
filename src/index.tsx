import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./i18n";

import { configureStore } from "./redux/configureStore";
import App from "./App";
import "./index.scss";

ReactDOM.render(
  <Provider store={configureStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
