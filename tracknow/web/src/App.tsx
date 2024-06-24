import * as React from "react";
import {
    ChakraProvider,
    Box,
    Grid,
    extendTheme,
    color,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin";
import { UserSignUp } from "./components/User/UserSignUp";
import { Welcome } from "./components/Welcome/Welcome";

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
});

export const App = () => (
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/create-user" element={<UserSignUp />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
);
