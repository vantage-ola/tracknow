import * as React from "react";
import {
    Box,
    Flex,
    Text,
    Stack,
    Button,
    Center,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Select,
    Link,
    InputLeftElement,
    Grid,
    InputGroup,
    Textarea,
    useToast,
    FormErrorMessage,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";
import { PlusSquareIcon, AddIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Laptime, SignUpResponse } from "../../Types";
import { FaCar, FaMapMarkedAlt, FaStopwatch, FaYoutube } from "react-icons/fa";
import { useLaptimes } from "../../hooks/useLaptimes";

export const NavbarWelcome = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('dark', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>
            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Link as={ReactRouterLink} to={'/login'} >Login</Link>
                    {/*
                    <Center>
                        <Text as='del' >Leaderboard</Text> coming soon
                    </Center>
                    */}
                </Stack>
            </Flex>

        </Flex>
    </Box>
);

export const Navbar = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('dark', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    {/* 
                    <Center>
                        <Text as='del' >Leaderboard</Text>
                    </Center>
                    */}
                </Stack>
            </Flex>
        </Flex>
    </Box>
);

export const NavbarLoggedIn = ({ username }: SignUpResponse) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { addLaptime } = useLaptimes();

    const [car, setCar] = React.useState("");
    const [track, setTrack] = React.useState("");
    const [time, setTime] = React.useState("");
    const [youtube_link, setYoutubeLink] = React.useState("");
    const [simracing, setSimracing] = React.useState(false);
    const [platform, setPlatform] = React.useState("");
    const [comment, setComment] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    // add laptimes

    const toast = useToast();

    const handleSubmit = async () => {

        const newLaptime: Laptime = {
            car,
            track,
            time,
            youtube_link,
            simracing,
            platform,
            comment,
        };
        setIsLoading(true);
        try {
            const response = await addLaptime(newLaptime);
            toast({
                title: 'Laptime added successfully',
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            window.location.reload();

        } catch (error) {

            toast({
                title: "Error while  adding Laptime.",
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
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={1}
            bg={"dark"}
            px={4}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("#323536", "white")}
        >
            <Flex h={10} alignItems={"center"} justifyContent={'space-between'}>
                <Box>
                    <Text fontSize="xl" as="b">
                        tracknow
                    </Text>
                </Box>

                <Flex alignItems={"center"}>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            size={"sm"}
                            variant="navbarButton"
                            onClick={onOpen}
                            leftIcon={<AddIcon />}>Create</Button>
                        <Center>
                            <Text>{username}</Text>
                        </Center>
                    </Stack>
                </Flex>
            </Flex>

            {/*add laptime modal*/}
            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop" size={'full'}>
                <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader color="black">Add Your Racing Moment</ModalHeader>
                    <ModalCloseButton color="black" />
                    <ModalBody color="black">
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>

                            <FormControl isRequired>
                                <FormLabel>Car</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <FaCar />
                                    </InputLeftElement>
                                    <Input
                                        focusBorderColor="grey"
                                        value={car}
                                        onChange={(e) => setCar(e.target.value)}
                                        maxLength={50}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Track</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <FaMapMarkedAlt />
                                    </InputLeftElement>
                                    <Input
                                        focusBorderColor="grey"
                                        value={track}
                                        onChange={(e) => setTrack(e.target.value)}
                                        maxLength={50}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired isInvalid={time && !timeRegex.test(time) ? true : undefined}>
                                <FormLabel>Laptime</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <FaStopwatch />
                                    </InputLeftElement>
                                    <Input
                                        focusBorderColor="grey"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        maxLength={10}
                                    />
                                </InputGroup>
                                {time && !timeRegex.test(time) && (
                                    <FormErrorMessage>Please enter a valid laptime (minutes:seconds.milliseconds)</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl isRequired isInvalid={youtube_link && !youtubeRegex.test(youtube_link) ? true : undefined}>
                                <FormLabel>YouTube Link</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <FaYoutube />
                                    </InputLeftElement>
                                    <Input
                                        focusBorderColor="grey"

                                        value={youtube_link}
                                        onChange={(e) => setYoutubeLink(e.target.value)}
                                        maxLength={200}

                                    />
                                </InputGroup>
                                {youtube_link && !youtubeRegex.test(youtube_link) && (
                                    <FormErrorMessage>Please enter a valid YouTube video URL</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl display="flex" alignItems="center" gridColumn="1 / -1" gap="2" isRequired>
                                <FormLabel mb="0">Simracing</FormLabel>
                                <Checkbox
                                    color="red"
                                    isChecked={simracing}
                                    onChange={(e) => setSimracing(e.target.checked)}
                                />
                                <InputGroup>
                                    <Select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        isDisabled={!simracing}
                                        focusBorderColor="grey"

                                    >
                                        <option value="">Select platform</option>
                                        <option value="Assetto Corsa Competizione">Assetto Corsa Competizione</option>
                                        <option value="iRacing">iRacing</option>
                                        <option value="Gran Turismo 7">Gran Turismo 7</option>
                                        <option value="Assetto Corsa">Assetto Corsa </option>
                                        <option value="BeamNG.drive">BeamNG.drive</option>
                                        <option value="Formula 1">Formula 1</option>
                                        <option value="Forza Motorsport">Forza Motorsport</option>
                                        <option value="Automobilista 2">Automobilista 2</option>
                                        <option value="Le Mans Ultimate">Le Mans Ultimate</option>
                                        <option value="Rennsport">Rennsport</option>
                                        <option value="Dirt Rally 2.0">Dirt Rally 2.0</option>
                                        <option value="Dirt Rally 2.0">EA SPORTS WRC</option>
                                        <option value="rFactor 2">rFactor 2</option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <FormControl gridColumn="1 / -1" isRequired>
                                <FormLabel>Comment</FormLabel>
                                <Textarea
                                    focusBorderColor="grey"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    maxLength={250}
                                />
                            </FormControl>

                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="red.500" variant="ghost" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'
                            onClick={handleSubmit}
                            isDisabled={!car || !track || !time || !timeRegex.test(time) || !youtube_link || !youtubeRegex.test(youtube_link) || !simracing || !platform || !comment}
                            cursor={car && track && time && youtube_link && simracing && platform && comment ? "pointer" : "not-allowed"}
                            isLoading={isLoading}
                            spinner={<BeatLoader size={8} color='red' />}
                        >Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};