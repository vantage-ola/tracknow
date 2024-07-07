import * as React from "react";
import { Flex, Input, Button, Image, Text, Link, useToast, InputRightElement, InputGroup } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Navbar } from "../Navbar/Navbar";
import API from "../../hooks/API";

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export const UserLogin = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [usernameValid, setUsernameValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usernameValid || !passwordValid) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await API.loginUser({ username, password });
            localStorage.setItem("access_token", response.token)

            toast({
                title: `Welcome, ${username}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/home");
            //console.log(response.msg);
        } catch (error) {
            //console.error(error);
            toast({
                title: "Error logging in, try again.",
                description: (error as Error).message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Flex h="80vh" alignItems="center" justifyContent="center">
                <Flex
                    flexDirection="column"
                    p={12}
                    borderRadius={8}
                    boxShadow="lg"
                    as={"form"}
                    onSubmit={handleSubmit}

                >
                    <Image boxSize="80px" alignSelf="center" src='./web_svg/arrow_done.svg' alt='track-bnow img' />

                    <Text marginBottom="10px" alignSelf="center" fontSize='xs'>Welcome, driver. Sign in to continue</Text>
                    <Input
                        focusBorderColor='grey'
                        placeholder="Username"
                        type="text"
                        variant="outline"
                        mb={3}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUsernameValid(e.target.value.length > 0);

                        }}
                    />
                    <InputGroup>
                        <Input
                            focusBorderColor='grey'
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outline"
                            mb={3}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setPasswordValid(e.target.value.length > 0)
                            }}
                        />
                        <InputRightElement >
                            <Button
                                color={'red'}
                                variant={'ghost'}
                                colorScheme='black'
                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button
                        colorScheme="red"
                        mb={3}
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={!usernameValid || !passwordValid}
                        cursor={usernameValid && passwordValid ? "pointer" : "not-allowed"}
                    >
                        Sign In
                    </Button>
                    <Text alignSelf="center" fontSize='xs'>New here? <Link as={ReactRouterLink} to='/create-user' color="red"> Create an account</Link></Text>
                </Flex>
            </Flex>
        </>
    )
};

// TODO change link colour to red. 