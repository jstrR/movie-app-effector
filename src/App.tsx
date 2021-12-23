import React from "react";
import { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ViewContextProvider from "./utils/ViewsContextProvider";
import { logIn } from "./redux/modules/auth";
import HomePage from "./views/HomePage";
import Authorization from "./views/Authorization";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser && Object.entries(currentUser).length) {
      dispatch(logIn(currentUser));
    }
  }, [dispatch]);

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
