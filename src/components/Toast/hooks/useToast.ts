import { useState } from "react";

export const useToast = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => setIsShowing(!isShowing);

  return {
    isShowing,
    toggle,
  };
};
