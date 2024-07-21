import { Box, Center, Divider, Flex, FlexProps, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { FiHome, FiAward, FiGlobe, FiInfo, FiSettings, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { BiGhost } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

interface LinkItemProps {
    name: string
    icon: IconType
}
interface SideItemProps extends FlexProps {
    icon: IconType
    children: string | number
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Discover', icon: FiGlobe },
    { name: 'Events', icon: FiCalendar },
    { name: 'Leaderboard', icon: FiAward },
    { name: 'Setups', icon: FiSettings },
    { name: 'Ghosts', icon: BiGhost },
    { name: 'About tracknow', icon: FiInfo },
    { name: 'Contribute', icon: FaGithub },
    { name: 'Donate', icon: FiDollarSign },
];

const linkMap: { [key: string]: string } = {
    Home: "/home",
    // Add more links here
};


const SideBarItem = ({ icon, children, ...rest }: SideItemProps) => {
    const link = linkMap[String(children)] || "/";

    return linkMap[String(children)] ? (
        <Link as={ReactRouterLink} to={link} style={{ textDecoration: 'none' }}>
            <Flex align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'lightdark',
                    color: 'white',
                }}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    ) : (
        <div>
            <Flex align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="not-allowed"
                _hover={{
                    bg: 'lightdark',
                    color: 'white',
                }}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </div>
    );
};

const LeftSideBar = () => {

    return (
        <>
            <Box mt={2}>
                <Stack>
                    {LinkItems.map((link) => (
                        <SideBarItem key={link.name} icon={link.icon}>
                            {link.name}
                        </SideBarItem>
                    ))}
                </Stack>
                <Center>
                    <Box mt={2} fontSize="10px" color="GrayText">
                        tracknow, © 2024, All rights reserved
                    </Box>
                </Center >
            </Box>



        </>
    )

};
export default LeftSideBar;