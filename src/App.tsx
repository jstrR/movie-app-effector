import React from "react";
import { useEffect, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ViewContextProvider from "./utils/ViewsContextProvider";
import { logIn } from "./redux/modules/auth";
import HomePage from "./views/HomePage";
import Authorization from "./views/Authorization";
import NotFound from "./views/NotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    if (currentUser && Object.entries(currentUser).length) {
      dispatch(logIn(currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ViewContextProvider>
        <Suspense fallback="loading">
          <Switch>
            <Route exact path="/login" component={Authorization} />
            <Route exact path="/signup" component={Authorization} />
            <Route path="/" component={HomePage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </ViewContextProvider>
    </div>
  );
};

export default App;
