// src/components/theme-switcher.js
/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";

const ThemeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();
  const nextColorMode = colorMode === "light" ? "dark" : "light";
  return (
    <button
      sx={{
        position: "absolute",
        top: 11,
        right: 53,
        backgroundColor: "primary",
        color: "background",
        border: 0,
        px: 3,
        py: 2,
        cursor: "pointer"
      }}
      onClick={() => setColorMode(nextColorMode)}
    >
    {makeStandardCase(nextColorMode)}
    </button>
  );
};

const makeStandardCase = (string) => {
    return string[0].toUpperCase()+string.slice(1).toLowerCase()
}

export default ThemeSwitcher;