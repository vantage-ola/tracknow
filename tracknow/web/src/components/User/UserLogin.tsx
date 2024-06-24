import * as React from "react";
import { Flex, Input, Button, Image, Text, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';

export const UserLogin = () => {

    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Image boxSize="80px" alignSelf="center" src='./web_svg/arrow_done.svg' alt='track-bnow img' />

                <Text marginBottom="10px" alignSelf="center" fontSize='xs'>Welcome, driver. Sign in to continue</Text>

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
                    Sign In
                </Button>
                <Text alignSelf="center" fontSize='xs'>New here? <Link as={ReactRouterLink} to='/create-user' color="red"> Create an account</Link></Text>
            </Flex>
        </Flex>
    )
};

// TODO move new? here... closer to the sign in button and change link colour to red. 