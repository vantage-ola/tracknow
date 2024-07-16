import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom';

export const Hero = () => {

    return (
        <Container maxW={"3xl"}>
            <Stack
                as={Box}
                textAlign={"center"}
                spacing={{ base: 5, md: 7 }}
                py={{ base: 115, md: 24 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    share your racing <br />
                    <Text as={'span'} color={'red'}>
                        moments!
                    </Text>
                </Heading>
                <Stack
                    direction={'column'}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>
                    <Button as={ReactRouterLink} to={"/create-user"} colorScheme={'red'} rounded={'full'} px={6}>
                        Get Started
                    </Button>

                </Stack>
            </Stack>
        </Container>
    );
}