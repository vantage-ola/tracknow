import * as React from "react";
import { Flex, Input, Button, Image, Text, Link, useToast, InputRightElement, InputGroup } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import API from "../../hooks/API"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const UserSignUp = () => {

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
            const existingUser = await API.fetchUsers().then((users) =>
                users.find((user) => user.username === username)
            );
            if (existingUser) {
                // username exists error here
                toast({
                    title: "Username exists, Be unique.",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            const response = await API.CreateUser({ username, password });
            toast({
                title: "Account created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/login");
        } catch (error) {
            toast({
                title: "Error creating account",
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
                    as="form"
                    onSubmit={handleSubmit}
                >
                    <Image boxSize="80px" alignSelf="center" src="./web_svg/arrow_done.svg" alt="track-bnow img" />
                    <Text marginBottom="10px" alignSelf="center" fontSize="xs">
                        Welcome, driver. Create an account
                    </Text>
                    <Input
                        focusBorderColor="grey"
                        placeholder="Username"
                        type="text"
                        variant="outline"
                        mb={3}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUsernameValid(e.target.value.length >= 5 && e.target.value.length <= 10);
                        }}
                        borderColor={'grey'}
                    />
                    <Text fontSize="10px" color={usernameValid ? "green.500" : "red.500"} mb={2}>
                        Username must be between 5 and 10 characters long.
                    </Text>
                    <InputGroup>
                        <Input
                            focusBorderColor="grey"
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outline"
                            mb={3}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordValid(e.target.value.length >= 8);
                            }}
                            borderColor={'grey'}
                        />
                        <InputRightElement>
                            <Button
                                color={'red'}
                                variant={'ghost'}
                                colorScheme='black'
                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}

                            </Button>


                        </InputRightElement>
                    </InputGroup>

                    <Text fontSize="10px" color={passwordValid ? "green.500" : "red.500"} mb={2}>
                        Password must be at least 8 characters long.
                    </Text>
                    <Button
                        colorScheme={usernameValid && passwordValid ? "red" : "red"}
                        mb={3}
                        type="submit"
                        isDisabled={!usernameValid || !passwordValid}
                        cursor={usernameValid && passwordValid ? "pointer" : "not-allowed"}
                        isLoading={isLoading}
                    >
                        Create an Account
                    </Button>
                    <Text alignSelf="center" fontSize="xs">
                        You have an account?{" "}
                        <Link as={ReactRouterLink} to="/login" color="red">
                            Sign in here
                        </Link>
                    </Text>
                </Flex>
            </Flex>
        </>
    );
};
