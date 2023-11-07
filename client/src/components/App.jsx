import React from "react";
import { ThemeContext } from "../theme/theme-context";
const themeColors = require("../theme/theme.json");

const App = () => {
    const [theme, setTheme] = React.useState("light");
    return (
        <ThemeContext.Provider value={themeColors[theme]}>
            <h1>MakeMyInvoice</h1>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Change theme</button>
        </ThemeContext.Provider>
    )
}

export default App;