import * as React from "react";
import {
    Box,
    Flex,
    Text,
    Stack,
    Button,
    Center,
    useColorModeValue,
    Link,
    Avatar,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom';
import { SignUpResponse } from "../../Types";

export const NavbarWelcome = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('dark', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>
            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Link as={ReactRouterLink} to={'/login'} >Login</Link>
                    {/*
                    <Center>
                        <Text as='del' >Leaderboard</Text> coming soon
                    </Center>
                    */}
                </Stack>
            </Flex>

        </Flex>
    </Box>
);

export const Navbar = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('dark', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    {/* 
                    <Center>
                        <Text as='del' >Leaderboard</Text>
                    </Center>
                    */}
                </Stack>
            </Flex>
        </Flex>
    </Box>
);

export const NavbarLoggedIn = ({ username }: SignUpResponse) => {


    // handle logout
    const handleLogout = () => {

        localStorage.removeItem("access_token");
        window.location.href = '/login';
        window.location.reload()
    };

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={1}
            bg={"dark"}
            px={4}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("#323536", "white")}
        >
            <Flex h={10} alignItems={"center"} justifyContent={'space-between'}>
                <Box>
                    <Text fontSize="xl" as="b">
                        tracknow
                    </Text>
                </Box>

                <Flex alignItems={"center"}>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            size={"sm"}
                            variant="navbarButton"
                            as={ReactRouterLink}
                            to={`/user/${username}/create-moments`}
                            leftIcon={<AddIcon />}>
                            Create
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={'https://i.postimg.cc/874tLgmf/Untitled-design-1.png'}
                                />

                            </MenuButton>
                            <MenuList alignItems={'center'} >
                                <br />
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={'https://i.postimg.cc/874tLgmf/Untitled-design-1.png'}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <p>{username}</p>
                                </Center>
                                <br />
                                <MenuDivider />
                                <MenuItem>My Moments</MenuItem>
                                <MenuItem >Account Settings</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Flex>
            </Flex>

        </Box>
    );
};