import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import 'effector-logger/inspector';

import ViewContextProvider from "./utils/ViewsContextProvider";
import HomePage from "./views/HomePage";
import Authorization from "./views/Authorization";

const App = () => {
  return (
    <div className="App">
      <ViewContextProvider>
        <Suspense fallback="loading">
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

export default App;
