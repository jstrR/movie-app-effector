import React, { useState, useEffect } from "react";

export const ViewContext = React.createContext(false);

const ViewContextProvider = props => {
  const [isMobile, setMobile] = useState(
    window.matchMedia("(max-width: 960px)").matches
  );
// change resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobile(window.matchMedia("(max-width: 960px)").matches);
    });
    return () => {
      window.removeEventListener("resize", setMobile(false));
    };
  }, []);

  return (
    <ViewContext.Provider value={isMobile}>
      {props.children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
