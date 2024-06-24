import * as React from "react";
import {
    Box,
    Flex,
    Text,
    Link,
    Stack,
    Center,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export const NavbarWelcome = () => (
    <Box px={4}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Link as={ReactRouterLink} to={'/login'} >Login</Link>
                    <Center>
                        <Text as='del' >Leaderboard</Text> {/*coming soon*/}
                    </Center>
                </Stack>
            </Flex>
        </Flex>
    </Box>
);