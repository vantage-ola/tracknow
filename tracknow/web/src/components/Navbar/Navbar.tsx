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
    Link
} from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom';
import { SignUpResponse } from "../../Types";

export const NavbarWelcome = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('grey', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Link as={ReactRouterLink} to={'/login'} >Login</Link>
                    <Center>
                        <Text as='del' >Leaderboard</Text> {/*coming soon*/}
                    </Center>
                </Stack>
            </Flex>
        </Flex>
    </Box>
);

export const Navbar = () => (
    <Box px={4} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('grey', 'white')}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>

            <Box><Text fontSize="xl" as="b">tracknow</Text></Box>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Center>
                        <Text as='del' >Leaderboard</Text> {/*coming soon*/}
                    </Center>
                </Stack>
            </Flex>
        </Flex>
    </Box>
);

export const NavbarLoggedIn = ({ username }: SignUpResponse) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [car, setCar] = React.useState("");
    const [track, setTrack] = React.useState("");
    const [time, setTime] = React.useState("");
    const [youtubeLink, setYoutubeLink] = React.useState("");
    const [simracing, setSimracing] = React.useState(false);
    const [platform, setPlatform] = React.useState("");

    const handleSubmit = () => {
        // Add code to handle form submission here
        onClose();
    };
    return (
        <Box
            px={4}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("grey", "white")}
        >
            <Flex h={10} alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                    <Text fontSize="xl" as="b">
                        tracknow
                    </Text>
                </Box>

                <Flex alignItems={"center"}>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            top={0.5}
                            variant={"solid"}
                            colorScheme={"red"}
                            size={"xs"}
                            mr={1}
                            onClick={onOpen}
                        >
                            <PlusSquareIcon color={"black"} />
                        </Button>

                        <Center>
                            <Text>@{username}</Text>
                        </Center>
                    </Stack>
                </Flex>
            </Flex>

            {/*add laptime modal*/}
            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop" size={'xs'}>
                <ModalOverlay bg='none'
                    backdropFilter='auto'
                    backdropBlur='2px' />
                <ModalContent >
                    <ModalHeader color={"black"}>Add Laptime</ModalHeader>
                    <ModalCloseButton color={"black"} />
                    <ModalBody color={"black"}>
                        <FormControl>
                            <FormLabel>Car</FormLabel>
                            <Input focusBorderColor='red.500' value={car} onChange={(e) => setCar(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Track</FormLabel>
                            <Input focusBorderColor='red.500' value={track} onChange={(e) => setTrack(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Laptime</FormLabel>
                            <Input focusBorderColor='red.500' value={time} onChange={(e) => setTime(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>YouTube Link</FormLabel>
                            <Input focusBorderColor='red.500' value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                            <FormLabel mb="0">Simracing</FormLabel>
                            <Checkbox color={'red'} isChecked={simracing} onChange={(e) => setSimracing(e.target.checked)} />
                        </FormControl>
                        <FormControl>
                            <Select value={platform} onChange={(e) => setPlatform(e.target.value)} isDisabled={!simracing}>
                                <option value="">Select platform</option>
                                <option value="Assetto Corsa Competizione">Assetto Corsa Competizione</option>
                                <option value="iRacing">iRacing</option>
                                <option value="Gran Turismo 7">Gran Turismo 7</option>
                                {/* Add more options as needed */}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='red.500' variant="ghost" onClick={handleSubmit}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
};