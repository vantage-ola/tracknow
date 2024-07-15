import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./tracknowTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin";
import { UserSignUp } from "./components/User/UserSignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";
import UserAddLaptimes from "./components/User/UserAddLaptimes";
import UserAccountSettings from "./components/User/UserAccountSettings";
import UserLaptimes from "./components/User/UserLaptimes";

export const App = () => (
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/create-user" element={<UserSignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user/:username/create-moments" element={<UserAddLaptimes />} />
                <Route path="/user/:username/account-settings" element={<UserAccountSettings />} />
                <Route path="/user/:username/my-moments" element={<UserLaptimes />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
);
