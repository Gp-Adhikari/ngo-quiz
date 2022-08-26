import React, { createContext, useState } from "react";

export const AnimationContext = createContext(null);

const AnimationContextProvider = ({ children }) => {
  const [initialAnimationHandler, setInitialAnimationHandler] = useState(false);

  return (
    <AnimationContext.Provider
      value={{ initialAnimationHandler, setInitialAnimationHandler }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
