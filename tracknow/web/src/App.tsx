import * as React from "react";
import {
    ChakraProvider,
    Box,
    Grid,
    extendTheme,
} from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "black",
                color: "white",
            },
        },
    },
});

export const App = () => (
    <ChakraProvider theme={theme}>

    </ChakraProvider>
);
