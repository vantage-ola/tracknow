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
    MenuList,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { FiMenu } from "react-icons/fi";
import { Link as ReactRouterLink } from 'react-router-dom';
import { identityProfile } from "../../Types";
import useMiscFunctions from "../../misc/miscFunctions";
import { Outlet } from 'react-router-dom';
import { useUsers } from "../../hooks/useUsers";


export const NavbarWelcome = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('dark', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Link as={ReactRouterLink} to="#" variant={'navbarLink'}><Text fontSize="xl" as="b">tracknow</Text></Link></Box>
            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={4}>
                    <Text color={'GrayText'}>v-alpha2.2</Text> {/* TODO write function to get from github directly */}
                    <Link variant={'navbarLink'} as={ReactRouterLink} to={'/create-user'}>signup</Link>
                    <Link variant={'navbarLink'} as={ReactRouterLink} to={'/login'}>login</Link>

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

            <Box>
                <Link as={ReactRouterLink} to="#" variant={'navbarLink'}>
                    <Text fontSize="xl" as="b">
                        tracknow
                    </Text>
                </Link></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Text color={'GrayText'}>v-alpha2.2</Text> {/* TODO write function to get from github directly */}

                </Stack>
            </Flex>
        </Flex>
    </Box>
);


const NavbarLoggedIn = ({ name, pp, onOpen }: identityProfile) => {
    const { handleLogout } = useMiscFunctions();
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
                <IconButton
                    icon={<FiMenu />}
                    aria-label="Open Menu"
                    variant="ghost"
                    onClick={onOpen}
                    display={{ base: "flex", md: "none" }}
                />
                <Flex alignItems={"center"} justifyContent={{ base: "center", md: "flex-start" }} marginLeft={{ base: 8, md: 0 }}>
                    <Link as={ReactRouterLink} to="/home" variant={"navbarLink"}>
                        <Text fontSize="xl" as="b">
                            tracknow
                        </Text>
                    </Link>
                </Flex>


                <Flex alignItems={"center"}>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            size={"sm"}
                            variant="navbarButton"
                            as={ReactRouterLink}
                            to={`/user/${name}/create-moments`}
                            leftIcon={<AddIcon />}>
                            <Text display={{ base: "none", md: "inline" }}>Create</Text>
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
                                    src={pp}
                                />

                            </MenuButton>
                            <MenuList alignItems={'center'} >
                                <br />
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={pp}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <p>{name}</p>
                                </Center>
                                <br />
                                <MenuDivider />
                                <MenuItem as={ReactRouterLink} to={`/user/${name}/my-moments`}>My Moments</MenuItem>
                                <MenuItem as={ReactRouterLink} to={`/user/${name}/account-settings`}>Account Settings</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Flex>
            </Flex>

        </Box>
    );
};


export const NavbarLayout = () => {
    const { username, profilePic } = useUsers();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <NavbarLoggedIn name={username} pp={profilePic} onOpen={onOpen} />
            <Outlet />
        </>
    )
};