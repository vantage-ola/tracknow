import * as React from "react";
import {
    Box,
    Flex,
    Text,
    Link,
    Stack,
    Center,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom';
import { SignUpResponse } from "../../Types";

export const NavbarWelcome = () => (
    <Box px={4} borderBottom={2} borderStyle={'solid'} borderColor={useColorModeValue('red', 'white')}>
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

export const Navbar = () => (
    <Box px={4} borderBottom={2} borderStyle={'solid'} borderColor={useColorModeValue('red', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Center>
                        <Text as='del' >Leaderboard</Text> {/*coming soon*/}
                    </Center>
                </Stack>
            </Flex>
        </Flex>
    </Box>
);

export const NavbarLoggedIn = ({ username }: SignUpResponse) => {

    return (
        <Box px={4} borderBottom={2} borderStyle={'solid'} borderColor={useColorModeValue('red', 'white')}>
            <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

                <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={1}>

                        <Button
                            top={0.5}
                            variant={'solid'}
                            colorScheme={'red'}
                            size={'xs'}
                            mr={1}><PlusSquareIcon color={"black"} />
                        </Button>

                        <Center>
                            <Text  >@{username}</Text>
                        </Center>

                    </Stack>
                </Flex>
            </Flex>
        </Box>
    )
}