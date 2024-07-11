import * as React from "react";
import {
    Box, Flex, Card, CardHeader, CardBody,
    Heading, Stack, Button, FormControl,
    Textarea, FormHelperText, Input, Select,
    HStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { SimracingTitles } from "../../misc/dropDown";

const UserAddLaptimes = () => {

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
                        <Heading size='lg'>Add Racing Moment</Heading>
                    </CardHeader>

                    <HStack spacing={6} pt={3}>
                        <Select borderColor={'#323536'}
                            focusBorderColor="grey"
                            ml={4}
                        >
                            <option style={{ backgroundColor: 'black' }} value="true">Sim racing</option>
                            <option style={{ backgroundColor: 'black' }} value="false">Real life</option>
                        </Select>

                        <SimracingTitles />
                    </HStack>


                    <CardBody >
                        <Stack spacing='5'>
                            <Input borderColor={'#323536'} focusBorderColor="grey" placeholder='Title' isRequired />
                            <FormControl isRequired>
                                <Textarea
                                    borderColor={'#323536'}
                                    focusBorderColor="grey"
                                    maxLength={500}
                                    placeholder='Body'

                                />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Stack>
                        <Stack pt={4} spacing='3'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Car
                                </Heading>
                                <Input borderColor={'#323536'} focusBorderColor="grey" variant='flushed' placeholder='Porsche 911 GT3' isRequired />

                            </Box>

                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Track
                                </Heading>
                                <Input borderColor={'#323536'} focusBorderColor="grey" variant='flushed' placeholder='Nürburgring Nordschleife' isRequired />

                            </Box>

                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Hotlap/Time
                                </Heading>
                                <Input borderColor={'#323536'} focusBorderColor="grey" variant='flushed' placeholder='6.59.34' isRequired />

                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Images / Videos
                                </Heading>
                                <FormControl>
                                    <Input borderColor={'#323536'} focusBorderColor="grey" variant='flushed' placeholder='https://www.youtube.com/watch?v=l_hbqBxxISY&feature=youtu.be' isRequired />
                                    <FormHelperText fontSize={'11px'}>Only Youtube links(Videos) are supported now, bear with me :)</FormHelperText>
                                </FormControl>

                            </Box>
                        </Stack>
                    </CardBody>
                    <Flex pr={5} mb={6} justifyContent={'flex-end'}>
                        <Button variant={"navbarButton"}>
                            Post
                        </Button>
                    </Flex>
                </Card>

            </Box >


        </Flex >
    );
};

export default UserAddLaptimes;