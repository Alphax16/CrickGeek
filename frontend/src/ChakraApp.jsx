import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorSchema } from "./ColorSchema.jsx";


const customTheme = extendTheme({
    colors: {
        primary: {
            seaGreen: "#12504B",
            oceanBlue: "#082438",
        },
        secondary: {
            green: "#12504B",
            blue: "#1b5784",
        },
    },
});

export const ChakraApp = () => {
    return (
        <ChakraProvider theme={customTheme}>
            <ColorSchema theme={customTheme} />
        </ChakraProvider>
    )
};
