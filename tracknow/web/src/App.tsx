import * as React from "react";
import { ChakraProvider, color, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin";
import { UserSignUp } from "./components/User/UserSignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";
import '@fontsource-variable/exo-2'
// TODO #ff3131 red. change colourtheme
const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "black",
                color: "white",
            },
        },
    },
    colors: {
        dark: "#1a1919"
    },
    fonts: {
        heading: `'Exo 2 Variable', sans-serif`,
        body: `'Exo 2 Variable', sans-serif`
    }
});

export const App = () => (
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/create-user" element={<UserSignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
);
