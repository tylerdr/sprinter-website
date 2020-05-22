// src/components/theme-switcher.js
import React from 'react'
/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { withTheme } from 'styled-components'


const ThemeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();
  const nextColorMode = colorMode === "light" ? "dark" : "light";
  const gradient = colorMode === "dark" ? "linear-gradient(#091236, #1E215D)" : "linear-gradient(#39598A, #79D7ED)"
  const sunTransform = colorMode === "dark" ? "translateY(100px)" : "translateY(0)"
  const moonTransform = colorMode === "dark" ? "translateY(0)": "translateY(-100px)"
  const color = colorMode === "dark" ? "#FEFCD7": "#FDB813"
  const containerBorder = colorMode === "dark" ?"1px solid #6B8096" : "1px solid #FFF"
  //console.log(nextColorMode)
  return (
    <button 
    className="toggle-mode"
        sx={{
        position: "absolute",
        top: 1,
        right: 50,
        borderRadius: "30px",
        fontSize: "1.25em",
        justifyContent: "space-between",
        display: "flex",
        overflow: "hidden",
        margin: "0 auto",
        padding: "0.5rem",
        cursor: "pointer",
        background : gradient,
        color: color,
        border: containerBorder
     }}
      onClick={() => setColorMode(nextColorMode)}
    >
      <FontAwesomeIcon 
      sx={{
        height: "auto",
        width: "2.5rem",
        transition: "all 0.3s linear",
        transform: sunTransform, 
      }} 
      icon={faSun}/>
      <FontAwesomeIcon 
      sx={{
        height: "auto",
        width: "2.5rem",
        transition: "all 0.3s linear",
        transform: moonTransform
      }}
      icon={faMoon}/>
    </button>
  );
};

const makeStandardCase = (string) => {
    return string[0].toUpperCase()+string.slice(1).toLowerCase()
}

export default ThemeSwitcher;