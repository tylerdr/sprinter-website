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
  const gradient = colorMode === "light" ? "linear-gradient(#39598A, #79D7ED)" : "linear-gradient(#091236, #1E215D)"
  const sunTransform = colorMode === "light" ? "translateY(0)": "translateY(100px)"
  const moonTransform = colorMode === "light" ? "translateY(-100px)" : "translateY(0)"
  const color = colorMode === "light" ? "#FDB813" : "#FEFCD7"
  const containerBorder = colorMode === "light" ? "1px solid #FFF" : "1px solid #6B8096" 
  console.log(nextColorMode)
  return (
    <button
        sx={{
        position: "absolute",
        top: 1,
        right: 53,
        borderRadius: "20px",
        fontSize: "1.25em",
        justifyContent: "space-between",
        display: "flex",
        overflow: "hidden",
        margin: "0 auto",
        padding: "0.5rem",
        width: "4rem",
        height: "3rem",
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
        transform: sunTransform
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