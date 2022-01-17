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

  useEffect(() => {
    const func = async () => {
      const diceQuery = `query RollDice($sides: Int, $rolls: Int!) {
        getDie(numSides: $sides) {
          rollOnce,
          roll(numRolls: $rolls)
        }
      }`;
      await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: diceQuery, variables: { sides: 6, rolls: 3 }})
      })

      const messageMutation = `mutation CreateMessage($input: MessageInput) {
        createMessage(input: $input) {
          id
        }
      }`;
      await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: messageMutation,
          variables: {
            input: {
              author: 'test author',
              content: 'test content',
            }
          }
        })
      })
    };
    func();
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
