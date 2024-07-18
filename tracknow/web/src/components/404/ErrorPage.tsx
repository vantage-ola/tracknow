import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';

const ErrorPage = () => {

    return (
        <>
            <Box height="80vh" display="flex" alignItems="center" justifyContent="center">

                <Stack spacing={4}>
                    <Center>
                        <Heading size={'2xl'} color={'red'}>404</Heading>
                        <Heading size={'2xl'}>.</Heading>
                        <Heading size={'2xl'}>..</Heading>
                        <Heading size={'2xl'}>Not Found.</Heading>
                    </Center>
                    <Center>
                        <Button as={ReactRouterLink} to={'/home'} outlineColor={'red'} variant="navbarButton" leftIcon={<ArrowBackIcon />} width="auto">
                            Return Home
                        </Button>
                    </Center>

                </Stack>


            </Box>
        </>


    )
};


export default ErrorPage