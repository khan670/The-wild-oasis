import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkMoodContext = createContext();
function DarkMoodProvider({ children }) {
  const [isDarkMood, setIsDarkMood] = useLocalStorageState(
    window.matchMedia("(prefer-color-scheme:dark)").matches,
    "isDarkMood"
  );
  const toogleDarkMood = () => setIsDarkMood((dark) => !dark);
  useEffect(
    function () {
      if (isDarkMood) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMood]
  );
  return (
    <DarkMoodContext.Provider value={{ isDarkMood, toogleDarkMood }}>
      {children}
    </DarkMoodContext.Provider>
  );
}
export function useDarkMood() {
  const context = useContext(DarkMoodContext);
  if (context === undefined)
    throw new Error(
      "there is an error and should do this context after the initiazation"
    );
  return context;
}
export default DarkMoodProvider;
