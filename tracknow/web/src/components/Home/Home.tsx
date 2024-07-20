import { NavbarLoggedIn } from "../Navbar/Navbar";
import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import {
    Box,
    Flex,
    Text,
    Center,
    useBreakpointValue,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
} from "@chakra-ui/react";
import LeftSideBar from "../SideBar/LeftSideBar";
import RightSideBar from "../SideBar/RightSideBar"; // Assuming you have a RightSideBar component

export const Home = () => {
    const { laptime, fetchMoreData, hasMore, laptime_loading } = useLaptimes();
    const { username, profilePic, loading } = useUsers();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <>
            <NavbarLoggedIn name={username} pp={profilePic} onOpen={onOpen} />

            <Flex mt={10} bg="dark" height="calc(100vh - 60px)"> {/* Adjust height to fit the viewport */}
                {/* Left section */}
                {isMobile ? (
                    <Drawer
                        variant={"drawer"}
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                    >
                        <DrawerOverlay>
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerBody>
                                    <Center>
                                        <Text fontSize="xl" as="b">
                                            tracknow
                                        </Text>
                                    </Center>
                                    <LeftSideBar />
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                ) : (
                    <Box
                        flex="1"
                        borderRight="1px solid #323536"
                        overflowY="auto"
                        height="full"
                    >
                        <LeftSideBar />
                    </Box>
                )}

                {/* Middle section */}
                <Box
                    flex="3"
                    rounded={"sm"}
                    my={1}
                    mx={[0, 5]}
                    overflow={"hidden"}
                    borderRadius={"1px"}
                    overflowY="auto"
                    height="full"
                >
                    {loading && laptime_loading ? (
                        <LoadingSpinner />
                    ) : (
                        <HomePost
                            laptimes={laptime}
                            fetchMoreData={fetchMoreData}
                            hasMore={hasMore}
                        />
                    )}
                </Box>

                {/* Right section */}
                <Box
                    flex="1"
                    overflowY="auto"
                    display={["none", "none", "block"]}
                    height="full"
                >
                    <RightSideBar /> {/* Add your right sidebar content here */}
                </Box>
            </Flex>
        </>
    );
};
