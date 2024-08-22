import React from "react";
import { ChakraProvider, Flex, useDisclosure } from "@chakra-ui/react";
import { theme } from "./tracknowTheme";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { NavbarLayout, NavbarLoggedInLayout, NavbarWelcomeLayout } from "./components/Navbar/Navbar";
import MainLayout from "./components/MainLayout";

import { UserLogin } from "./components/User/UserLogin";
import { UserSignUp } from "./components/User/UserSignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";

import UserAddLaptimes from "./components/User/UserAddLaptimes";
import UserAccountSettings from "./components/User/UserAccountSettings";
import UserLaptimes from "./components/User/UserLaptimes";
import { UserProfile } from "./components/User/UserProfile";

import { SelectedPost } from "./components/Post/Post";

import ErrorPage from "./components/404/ErrorPage";

import { UserProvider } from "./hooks/useUsers";


export const App = () => {

    const UserProfileWrapper = () => {
        const { user_id } = useParams();
        // fetch user data based on user_id
        const id = Number(user_id);

        return <UserProfile id={id} />;
    };
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (

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
                            <NavbarLoggedInLayout onOpen={onOpen} />
                        </UserProvider>
                    }>
                        <Route element={
                            <Flex height={{ base: "auto", md: "100vh" }}>
                                <MainLayout isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                            </Flex>
                        }>


                            <Route
                                path="/home"
                                element={

                                    <Home />

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

                                    <UserProfileWrapper />

                                }
                            />
                            <Route
                                path="user/:user_id/moments/:id/"
                                element={

                                    <SelectedPost />

                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider >
    )
};

