import { Box, Center, Divider, Flex, FlexProps, Icon, Stack } from '@chakra-ui/react';
import {
    FiHome,
    FiCompass,
} from 'react-icons/fi'
import { IconType } from 'react-icons'

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
    { name: 'Explore', icon: FiCompass },
]

const SideBarItem = ({ icon, children, ...rest }: SideItemProps) => {

    return (
        <Box style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            {...rest}
        >
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
        </Box>
    )
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
            </Box>

        </>
    )

};
export default LeftSideBar;