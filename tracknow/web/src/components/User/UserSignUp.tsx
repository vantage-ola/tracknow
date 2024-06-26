import * as React from "react";
import { Flex, Input, Button, Image, Text, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import { Navbar } from "../Navbar/Navbar";

export const UserSignUp = () => {

    return (
        <>
            <Navbar />
            <Flex h="80vh" alignItems="center" justifyContent="center">
                <Flex
                    flexDirection="column"
                    p={12}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Image boxSize="80px" alignSelf="center" src='./web_svg/arrow_done.svg' alt='track-bnow img' />
                    <Text marginBottom="10px" alignSelf="center" fontSize='xs'>Welcome, driver. Create an account</Text>
                    <Input
                        focusBorderColor='red.500'
                        placeholder="Username"
                        type="text"
                        variant="outline"
                        mb={3}
                    />
                    <Input
                        focusBorderColor='red.500'
                        placeholder="Password"
                        type="password"
                        variant="outline"
                        mb={3}
                    />
                    <Button colorScheme="red" mb={3}>
                        Create an Account
                    </Button>
                    <Text alignSelf="center" fontSize='xs'>You have an account?<Link as={ReactRouterLink} to='/login' color="red"> Sign in here</Link></Text>
                </Flex>
            </Flex>
        </>
    )
};