import React from "react";
import App from "./App.jsx";
import { ColorModeScript } from "@chakra-ui/react";
import { GradientShineBox } from "./GradientShineBox";
import "./index.css";


export const ColorSchema = ({ theme }) => {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <GradientShineBox>
                <App />
            </GradientShineBox>
        </>
    )
};
