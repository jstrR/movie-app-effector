import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import 'effector-logger/inspector';

import "./styles/index.scss";
import "./providers/i18n";
import ViewContextProvider from "./providers/ViewsContextProvider";

import { CircularLoader } from "shared";

const HomePage = lazy(() => import("pages/HomePage"));
const Authorization = lazy(() => import("pages/Authorization"));

const App = () => {
  return (
    <div className="app">
      <ViewContextProvider>
        <Suspense fallback={<CircularLoader />}>
          <Routes>
            <Route path="/login/*" element={<Authorization />} />
            <Route path="/signup/*" element={<Authorization />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </ViewContextProvider>
    </div>
  );
};

export { ViewContext } from "./providers/ViewsContextProvider";
export default App;
