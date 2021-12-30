import React from "react";
import { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ViewContextProvider from "./utils/ViewsContextProvider";
import { logIn } from "./effector/auth";
import HomePage from "./views/HomePage";
import Authorization from "./views/Authorization";

const App = () => {
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser && Object.entries(currentUser).length) {
      logIn(currentUser);
    }
  }, []);

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
