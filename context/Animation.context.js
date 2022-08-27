import React, { createContext, useRef, useState } from "react";

export const AnimationContext = createContext(null);

const AnimationContextProvider = ({ children }) => {
  const headerRef = useRef(null);
  const [initialAnimationHandler, setInitialAnimationHandler] = useState(false);

  return (
    <AnimationContext.Provider
      value={{ initialAnimationHandler, setInitialAnimationHandler, headerRef }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
