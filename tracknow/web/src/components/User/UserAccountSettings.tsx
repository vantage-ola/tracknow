import { Box, Button, Card, CardBody, CardHeader, Flex, FormControl, FormHelperText, Heading, HStack, Input, Select, Center, Stack, Textarea, Avatar } from "@chakra-ui/react";
import * as React from "react";
import { CountryDropdown } from "../../misc/dropDown";

const UserAccountSettings = () => {

    const [Nationality, setNationality] = React.useState("");

    return (
        <Flex mt={10} bg="dark">
            {/* Left section*/}
            <Box flex="1" borderRight="1px solid #323536" overflowY="auto" display={["none", "none", "block"]}>
                {/* left section content */}
            </Box>

            {/* Main Section */}
            <Box flex="4"
                rounded={'sm'}
                my={1}
                mx={[0, 5]}
                overflow={'hidden'}
                borderRadius={"1px"}>

                <Card size={'lg'} maxW='600px' >
                    <CardHeader>
                        <Heading size='lg'>Settings</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack spacing={6}>

                            <Center>

                                <Stack>
                                    <Avatar size={'6xl'}
                                        src={'https://i.postimg.cc/874tLgmf/Untitled-design-1.png'}>
                                    </Avatar>
                                    <Button bg={'#171616'} variant={'navbarButton'}>Change Picture</Button>
                                </Stack>

                            </Center>

                            <Stack spacing={5}>

                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Username
                                    </Heading>
                                    <Input borderColor={'#323536'} focusBorderColor="grey" variant='flushed' placeholder='vantage0' isRequired />

                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Password
                                    </Heading>
                                    <Input type="password" borderColor={'#323536'} focusBorderColor="grey" placeholder="***********" variant='flushed' isRequired />

                                </Box>
                                <Box >
                                    <Stack spacing={3}>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Nationality
                                        </Heading>
                                        <CountryDropdown />
                                    </Stack>

                                </Box>
                            </Stack>
                        </Stack>

                    </CardBody>
                    <Flex pr={5} mb={6} justifyContent={'flex-end'}>
                        <Button _hover={{ bg: 'red' }} variant={"navbarButton"}>
                            Cancel
                        </Button>
                        <Button variant={"navbarButton"}>
                            Submit
                        </Button>
                    </Flex>
                </Card>

            </Box >


        </Flex >
    )
};

export default UserAccountSettings