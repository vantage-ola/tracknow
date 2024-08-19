import * as React from "react";
import { Flex, Box, useBreakpointValue, useDisclosure, } from '@chakra-ui/react';
import LeftSideBar from './SideBar/LeftSideBar';
import RightSideBar from './SideBar/RightSideBar';
import MobileDrawer from "../misc/MobileDrawer";
import { Outlet } from 'react-router-dom';

type MainLayoutProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({ isOpen, onOpen, onClose }) => {


    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex mt={10} bg="dark" flex={1}>
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
                    display={["none", "none", "block"]}

                >
                    <LeftSideBar />
                </Box>
            )}

            {/* Middle section */}
            <Box flex="3" rounded={'sm'} my={1} mx={[0, 5]} borderRadius={"1px"} overflowY="auto" >
                <Outlet />
            </Box>

            {/* Right section */}
            <Box
                flex="1"
                overflowY="auto"
                display={["none", "none", "block"]}
            >
                <RightSideBar /> {/*  right sidebar content*/}
            </Box>

        </Flex>
    );
};

export default MainLayout;
