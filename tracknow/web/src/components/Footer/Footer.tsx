import * as React from "react";
import { Box, Text, Center, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {

    return (
        <Box as="footer" py={4} >
            <Center>
                <Text> made with ❤️ by
                    <Link color="red" href="https://github.com/vantage-ola" isExternal> ola</Link>
                </Text>
            </Center>
        </Box>
    );
};

export default Footer;
