import * as React from "react";

import { Box, Button, Card, CardBody, CardHeader, useToast, Flex, FormControl, Heading, Stack, Avatar, FormErrorMessage, InputRightElement, InputGroup, Center, Input, useDisclosure, useBreakpointValue } from "@chakra-ui/react";
import { CountryDropdown } from "../../misc/dropDown";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { EditUser, EditUserPic } from "../../Types";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { BeatLoader } from "react-spinners";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useMiscFunctions from "../../misc/miscFunctions";

import MobileDrawer from "../../misc/MobileDrawer";
import LeftSideBar from "../SideBar/LeftSideBar";
import RightSideBar from "../SideBar/RightSideBar";

const UserAccountSettings = () => {

    const [newusername, setNewUsername] = React.useState("");
    //const [loading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const [passwordValid, setPasswordValid] = React.useState(false);
    const [usernameValid, setUsernameValid] = React.useState(false);

    const [nationality, setNationality] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false); // for submitting
    const [isUploading, setIsUploading] = React.useState(false); // for image uploading

    const { cloudName, uploadPreset, api_key, handleLogout } = useMiscFunctions(); // cloudinary names & preset
    const { username, profilePic } = useUsers();

    const navigate = useNavigate();
    const toast = useToast();

    const { editProfilePic, editProfile } = useUsers();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });


    // sidebar

    /*if (loading) {
        return <LoadingSpinner />;
    }; */

    const handleProfile = async () => {
        const newProfile: EditUser = {};

        if (newusername !== username && newusername !== "") {
            newProfile.username = newusername;
        }
        if (password !== "" && passwordValid) {
            newProfile.password = password;
        }
        if (nationality !== "") {
            newProfile.nationality = nationality;
        }

        if (Object.keys(newProfile).length === 0) {
            // No changes made, do nothing or show a message
            return;
        }
        console.log(newProfile);

        setIsLoading(true);

        try {
            const response = await editProfile(newProfile);
            toast({
                title: 'Profile edited successfully',
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            handleLogout()
            toast({
                title: 'Login with new details',
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            //window.location.href = ('/home');

        } catch (error) {
            toast({
                title: "Error editing profile, try again.",
                description: (error as Error).message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);

        }
    };

    const handleProfilePic = async () => {
        if (fileInputRef.current?.files?.length) {
            const file = fileInputRef.current.files[0];
            //console.log("file object:", file);
            // Check if the file size is less than or equal to 1080x1080 pixels
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = async () => {

                if (img.width <= 1080 && img.height <= 1080) {
                    setIsUploading(true); // Start image uploading

                    //console.log("Image size is within limit");
                    const formData = new FormData();

                    formData.append("file", file);
                    formData.append("upload_preset", uploadPreset);
                    formData.append("api_key", api_key);
                    try {
                        const response = await fetch(
                            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                            {
                                method: "POST",
                                body: formData,
                            }
                        );

                        const data = await response.json();
                        const profilePicUrl = data.secure_url;

                        const newProfilePic: EditUserPic = {
                            profile_picture_url: profilePicUrl,
                        };

                        await editProfilePic(newProfilePic);

                        //setProfilePic(profilePicUrl); // Update the state with the new profile picture URL
                    } catch (error) {
                        //console.error("Error uploading image to Cloudinary:", error);
                    }
                    toast({
                        title: "Profile Picture Updated Successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    setIsUploading(false); // Stop image uploading
                    //setProfilePic(profile_picture);
                    navigate(0);
                } else {
                    // Show an error message to the user
                    toast({
                        title: "Image size is too large",
                        description: "Please upload an image that is 1080x1080 pixels or smaller.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            };
        }
    };



    return (
        <>
            <Flex mt={10} bg="dark" height="calc(100vh - 45px)">
                {/* Left section */}
                {isMobile ? (
                    <MobileDrawer isOpen={isOpen} onClose={onClose}>
                        <LeftSideBar />
                    </MobileDrawer>
                ) : (
                    <Box
                        flex="1"
                        borderRight="1px solid #323536"
                        overflowY="auto"
                        height="full"
                    >
                        <LeftSideBar />
                    </Box>
                )}

                {/* Main Section */}
                <Box flex="4"
                    rounded={'sm'}
                    my={1}
                    mx={[0, 5]}
                    overflow={'hidden'}
                    borderRadius={"1px"}
                    overflowY="auto"
                    height="full"
                >

                    <Card size={'lg'} maxW='600px' >
                        <CardHeader>
                            <Heading size='lg'>Settings</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack spacing={6}>

                                <Center>

                                    <Stack>

                                        <Avatar
                                            size={"2xl"}
                                            src={
                                                profilePic
                                            }
                                        >
                                        </Avatar>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={() => handleProfilePic()}
                                        />
                                        <Button
                                            bg={"#171616"}
                                            variant={"navbarButton"}
                                            onClick={() => fileInputRef.current?.click()}
                                            isLoading={isUploading}
                                            spinner={<BeatLoader size={8} color='red' />}
                                        >
                                            Change Picture
                                        </Button>
                                    </Stack>

                                </Center>

                                <Stack spacing={5}>

                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Username
                                        </Heading>
                                        <FormControl isInvalid={newusername !== username && !usernameValid && newusername !== ""}>
                                            <Input borderColor={'#323536'}
                                                focusBorderColor="grey"
                                                variant='flushed'
                                                value={newusername}
                                                placeholder={username}
                                                onChange={(e) => {
                                                    setNewUsername(e.target.value);
                                                    setUsernameValid(e.target.value.length >= 5 && e.target.value.length <= 10);
                                                }}
                                            />
                                            <FormErrorMessage fontSize={'11px'} color={usernameValid ? "green.500" : "red.500"} mb={2}>
                                                Username must be between 5 and 10 characters long.
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Password
                                        </Heading>
                                        <FormControl isInvalid={password !== "" && !passwordValid}>
                                            <InputGroup>
                                                <Input type={showPassword ? 'text' : 'password'}
                                                    borderColor={'#323536'}
                                                    focusBorderColor="grey"
                                                    placeholder="***********"
                                                    variant='flushed'
                                                    isRequired
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                        setPasswordValid(e.target.value.length >= 8);
                                                    }}
                                                />
                                                <InputRightElement >
                                                    <Button
                                                        color={'red'}
                                                        variant={'ghost'}
                                                        colorScheme='black'
                                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage fontSize={'11px'} color={passwordValid ? "green.500" : "red.500"} mb={2}>
                                                Password must be at least 8 characters long.
                                            </FormErrorMessage>
                                        </FormControl>

                                    </Box>
                                    <Box >
                                        <Stack spacing={3}>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Nationality
                                            </Heading>
                                            <CountryDropdown value={nationality} change={(e) => setNationality(e.target.value)} />
                                        </Stack>

                                    </Box>
                                </Stack>
                            </Stack>

                        </CardBody>
                        <Flex pr={5} mb={6} justifyContent={'flex-end'}>
                            <Button _hover={{ bg: 'red' }} variant={"navbarButton"} as={ReactRouterLink}
                                to={`/home`}>
                                Cancel
                            </Button>
                            <Button variant={"navbarButton"}
                                isLoading={isLoading}
                                spinner={<BeatLoader size={8} color='red' />}
                                onClick={handleProfile}
                                isDisabled={!(
                                    (newusername !== username && usernameValid) ||
                                    (password !== "" && passwordValid) ||
                                    nationality !== ""
                                )}
                            >
                                Submit
                            </Button>
                        </Flex>
                    </Card>

                </Box >


            </Flex >
        </>

    )
};

export default UserAccountSettings;