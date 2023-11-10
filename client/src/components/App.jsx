import React from "react";
import { ThemeContext } from "../theme/theme-context";
import { Container } from "./Container";
const themeColors = require("../theme/theme.json");

const App = () => {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={themeColors[theme]}>
      <div className="App">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Change theme</button>
        <Container />
      </div>
    </ThemeContext.Provider>
  )
}

export default App;