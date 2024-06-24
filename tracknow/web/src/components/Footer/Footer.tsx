import * as React from "react";
import { Box, Text, Center } from '@chakra-ui/react';

const Footer: React.FC = () => {
    const getCurrentYear = (): number => {
        return new Date().getFullYear();
    };

    return (
        <Box as="footer" py={4} >
            <Center>
                <Text>© {getCurrentYear()} Pedantic. All rights reserved</Text>
            </Center>
        </Box>
    );
};

export default Footer;
