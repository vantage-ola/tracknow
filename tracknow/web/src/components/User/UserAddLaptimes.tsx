import * as React from "react";
import {
    Box, Flex, Card, CardHeader, CardBody,
    Heading, Stack, Button, FormControl,
    Textarea, FormHelperText, Input, Select,
    HStack, useToast,
    FormErrorMessage
} from "@chakra-ui/react";
import { SimracingTitles } from "../../misc/dropDown";
import { useLaptimes } from "../../hooks/useLaptimes";
import { Laptime } from "../../Types";
import { BeatLoader } from "react-spinners";
import { NavbarLoggedIn } from "../Navbar/Navbar";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useUsers } from "../../hooks/useUsers";

const UserAddLaptimes = () => {

    const { addLaptime } = useLaptimes();
    const { username, profilePic } = useUsers();

    const [title, setTitle] = React.useState("");
    const [car, setCar] = React.useState("");
    const [track, setTrack] = React.useState("");
    const [time, setTime] = React.useState("");
    const [youtube_link, setYoutubeLink] = React.useState("");
    const [simracing, setSimracing] = React.useState(true);
    const [platform, setPlatform] = React.useState("");
    const [comment, setComment] = React.useState("");


    const [isLoading, setIsLoading] = React.useState(false); // for moments

    const toast = useToast();

    /*if (loading) {
        return <LoadingSpinner />;
    }; */
    //console.log(simracing);

    const handleSubmit = async () => {
        const newLaptime: Laptime = {
            title,
            car,
            track,
            time,
            youtube_link,
            simracing,
            platform,
            comment,
        };
        //console.log(newLaptime)
        setIsLoading(true);
        try {
            const response = await addLaptime(newLaptime);
            toast({
                title: 'Moment created successfully',
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            window.location.href = ('/home');

        } catch (error) {

            toast({
                title: "Error while creating Moment",
                description: (error as Error).message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);

        }
    };

    // regex
    const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    const timeRegex = /^(\d{1,2})?(\.(\d{2}))?(\.(\d{2}))?(\.(\d{1,3}))?$/;

    return (
        <>
            <NavbarLoggedIn name={username} pp={profilePic} />
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
                                isRequired
                                focusBorderColor="grey"
                                ml={4}
                                value={String(simracing)}
                                onChange={(e) => setSimracing(e.target.value === 'true')}
                            >
                                <option style={{ backgroundColor: 'black' }} value="true">Sim racing</option>
                                <option style={{ backgroundColor: 'black' }} value="false">Real life</option>
                            </Select>
                            {/* if simracing is selected show simracing titles*/}
                            {simracing && (
                                <SimracingTitles value={platform} change={(e) => setPlatform(e.target.value)} />
                            )}
                        </HStack>


                        <CardBody >

                            <Stack spacing='5'>
                                <FormControl isInvalid={!title}>
                                    <Input
                                        borderColor={'#323536'}
                                        focusBorderColor="grey"
                                        placeholder='Title'
                                        isRequired
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {!title && (
                                        <FormErrorMessage fontSize={'11px'}>Required</FormErrorMessage>
                                    )}
                                </FormControl>



                                <FormControl isRequired isInvalid={!comment}>
                                    <Textarea
                                        borderColor={'#323536'}
                                        focusBorderColor="grey"
                                        maxLength={500}
                                        placeholder='Body'
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    {!comment && (
                                        <FormErrorMessage fontSize={'11px'}>Required</FormErrorMessage>
                                    )}
                                </FormControl>
                            </Stack>

                            <Stack pt={4} spacing='3'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Car
                                    </Heading>
                                    <Input borderColor={'#323536'}
                                        focusBorderColor="grey"
                                        variant='flushed'
                                        placeholder='Porsche 911 GT3'
                                        onChange={(e) => setCar(e.target.value)}
                                        maxLength={20} />

                                </Box>

                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Track
                                    </Heading>
                                    <Input borderColor={'#323536'}
                                        focusBorderColor="grey"
                                        variant='flushed'
                                        placeholder='Nürburgring Nordschleife'
                                        onChange={(e) => setTrack(e.target.value)}
                                        maxLength={35} />

                                </Box>

                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Hotlap/Time
                                    </Heading>
                                    <FormControl isInvalid={time && !timeRegex.test(time) ? true : undefined}>
                                        <Input
                                            borderColor={'#323536'}
                                            focusBorderColor="grey"
                                            variant='flushed' placeholder='6.59.34'
                                            onChange={(e) => setTime(e.target.value)}
                                            maxLength={10} />
                                        {time && !timeRegex.test(time) && (
                                            <FormErrorMessage fontSize={'11px'}>Please enter a valid laptime (minutes.seconds.milliseconds)</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Images / Videos
                                    </Heading>
                                    <FormControl isInvalid={youtube_link && !youtubeRegex.test(youtube_link) ? true : undefined}>
                                        <Input
                                            borderColor={'#323536'}
                                            focusBorderColor="grey"
                                            variant='flushed'
                                            placeholder='https://www.youtube.com/watch?v=l_hbqBxxISY&feature=youtu.be'
                                            onChange={(e) => setYoutubeLink(e.target.value)}
                                            maxLength={200}
                                        />
                                        {youtube_link && !youtubeRegex.test(youtube_link) && (
                                            <FormErrorMessage fontSize={'11px'}>Please enter a valid YouTube video URL</FormErrorMessage>
                                        )}
                                        <FormHelperText fontSize={'11px'}>Only Youtube links(Videos) are supported now, bear with me :)</FormHelperText>
                                    </FormControl>

                                </Box>
                            </Stack>
                        </CardBody>
                        <Flex pr={5} mb={6} justifyContent={'flex-end'}>
                            <Button variant={"navbarButton"}
                                onClick={handleSubmit}
                                isDisabled={!title || !comment}
                                cursor={title && comment ? "pointer" : "not-allowed"}
                                isLoading={isLoading}
                                spinner={<BeatLoader size={8} color='red' />}
                            >
                                Post
                            </Button>
                        </Flex>
                    </Card>

                </Box >


            </Flex >
        </>

    );
};

export default UserAddLaptimes;