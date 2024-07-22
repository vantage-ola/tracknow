import { NavbarLoggedIn } from "../Navbar/Navbar";
import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import {
    Box,
    Flex,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";

import MobileDrawer from "../../misc/MobileDrawer";
import LeftSideBar from "../SideBar/LeftSideBar";
import RightSideBar from "../SideBar/RightSideBar";

export const Home = () => {
    const { laptime, fetchMoreData, hasMore, laptime_loading } = useLaptimes();
    const { username, profilePic, loading } = useUsers();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <>
            <NavbarLoggedIn name={username} pp={profilePic} onOpen={onOpen} />

            <Flex mt={10} bg="dark" height="calc(100vh - 45px)"> {/* Adjust height to fit the viewport */}
                {/* Left section */}
                {isMobile ? (
                    <MobileDrawer isOpen={isOpen} onClose={onClose}>
                        <LeftSideBar />
                    </MobileDrawer>
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
                    <RightSideBar /> {/*  right sidebar content*/}
                </Box>
            </Flex>
        </>
    );
};
