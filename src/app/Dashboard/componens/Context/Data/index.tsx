import { createContext, useContext } from "react";
import { Event } from "@/app/Dashboard/page";

type ThemeContext = {
 
};

/*ContextProviding for Data*/
export const CardContext = createContext<ThemeContext | undefined>(undefined);

export function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
