import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./tracknowTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin";
import { UserSignUp } from "./components/User/UserSignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";


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
