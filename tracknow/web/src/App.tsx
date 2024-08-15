import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./tracknowTheme";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { NavbarLayout, NavbarLoggedInLayout, NavbarWelcomeLayout } from "./components/Navbar/Navbar";

import { UserLogin } from "./components/User/UserLogin";
import { UserSignUp } from "./components/User/UserSignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";

import UserAddLaptimes from "./components/User/UserAddLaptimes";
import UserAccountSettings from "./components/User/UserAccountSettings";
import UserLaptimes from "./components/User/UserLaptimes";
import { UserProfile } from "./components/User/UserProfile";

import ErrorPage from "./components/404/ErrorPage";

import { UserProvider } from "./hooks/useUsers";

export const App = () => (
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<ErrorPage />} />

                {/*welcome page*/}
                <Route element={
                    <NavbarWelcomeLayout />
                }>
                    <Route path="/" element={<Welcome />} />
                </Route>

                {/*user is about to login/signup */}
                <Route element={
                    <NavbarLayout />
                }>
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/create-user" element={<UserSignUp />} />
                </Route>

                {/*user is logged in */}
                <Route element={
                    <UserProvider>
                        <NavbarLoggedInLayout />
                    </UserProvider>
                }>
                    <Route
                        path="/home"
                        element={
                            <UserProvider>
                                <Home />
                            </UserProvider>
                        }
                    />
                    <Route
                        path="/user/:username/create-moments"
                        element={
                            <UserProvider>
                                <UserAddLaptimes />
                            </UserProvider>
                        }
                    />
                    <Route
                        path="/user/:username/account-settings"
                        element={
                            <UserProvider>
                                <UserAccountSettings />
                            </UserProvider>
                        }
                    />
                    <Route
                        path="/user/:username/my-moments"
                        element={
                            <UserProvider>
                                <UserLaptimes />
                            </UserProvider>
                        }
                    />
                    <Route
                        path="user/:user_id/:username/"
                        element={
                            <UserProvider>
                                <UserProfileWrapper />
                            </UserProvider>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </ChakraProvider >
);

const UserProfileWrapper = () => {
    const { user_id } = useParams();
    // fetch user data based on user_id
    const id = Number(user_id);

    return <UserProfile id={id} />;
};