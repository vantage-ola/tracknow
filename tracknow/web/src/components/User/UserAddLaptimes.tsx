import * as React from "react";
import {
    Box, Flex, Card, CardHeader, CardBody,
    Heading, Stack, Button, FormControl,
    Textarea, FormHelperText, Input, Select,
    HStack, useToast,
    FormErrorMessage, Text, VStack, Icon
} from "@chakra-ui/react";
import { SimracingTitles } from "../../misc/dropDown";
import { useLaptimes } from "../../hooks/useLaptimes";
import { Laptime } from "../../Types";
import { BeatLoader } from "react-spinners";
import useMiscFunctions from "../../misc/miscFunctions";
import { FiUpload } from "react-icons/fi";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
//import { useUsers } from "../../hooks/useUsers";

const UserAddLaptimes = () => {

    const { addLaptime } = useLaptimes();
    const { cloudName, uploadPreset, api_key } = useMiscFunctions(); // cloudinary names & preset


    const [title, setTitle] = React.useState("");
    const [car, setCar] = React.useState("");
    const [track, setTrack] = React.useState("");
    const [time, setTime] = React.useState("");
    const [youtube_link, setYoutubeLink] = React.useState("");
    const [simracing, setSimracing] = React.useState(true);
    const [platform, setPlatform] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [image, setImage] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false); // for moments
    const [isUploading, setIsUploading] = React.useState(false); // image uploading

    const toast = useToast();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    /*if (loading) {
        return <LoadingSpinner />;
    }; */
    //console.log(simracing);
    const handleuploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB in bytes
                toast({
                    title: "File too large",
                    description: "Please upload an image smaller than 500KB.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            setIsUploading(true);
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
                setImage(data.secure_url);
                toast({
                    title: "Image uploaded successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: "Error uploading image",
                    description: (error as Error).message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsUploading(false);
            }
        }
    };

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
            image
        };
        setIsLoading(true);
        try {
            await addLaptime(newLaptime);
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
    const timeRegex = /^(\d{1,2})?(\:([0-5]\d))?(\:([0-5]\d))?(\.(\d{1,3}))?$/;

    return (
        <>
            {/* Main Section */}

            <Card size={'lg'} maxW='600px' >
                <CardHeader>
                    <Heading size='lg'>Add Racing Moment</Heading>
                </CardHeader>
                <CardBody >

                    <Stack spacing='5'>

                        <HStack>
                            <Select borderColor={'#323536'}
                                isRequired
                                focusBorderColor="grey"
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
                                    variant='flushed' placeholder='6:54.554'
                                    onChange={(e) => setTime(e.target.value)}
                                    maxLength={10} />
                                {time && !timeRegex.test(time) && (
                                    <FormErrorMessage fontSize={'11px'}>Please enter a valid laptime (hours:minutes:seconds.milliseconds)</FormErrorMessage>
                                )}
                            </FormControl>
                        </Box>

                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Youtube
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
                            </FormControl>

                        </Box>
                        <FormControl>
                            <Heading size='xs' textTransform='uppercase' mb={2}>
                                Upload Image
                            </Heading>
                            <Box
                                borderColor={'#323536'}
                                borderWidth={2}
                                borderStyle="dashed"
                                borderRadius="md"
                                p={4}
                                cursor="pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleuploadImage}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                <VStack spacing={2}>
                                    <Icon as={FiUpload} w={8} h={8} />
                                    <Text>Click or drag image here</Text>
                                    <Text fontSize="sm" color="gray.500">Max file size: 500KB</Text>
                                </VStack>
                            </Box>
                            {isUploading && (
                                <Text mt={2} fontSize="sm" color="yellow.500">
                                    Uploading image...
                                </Text>
                            )}
                            {image && !isUploading && (
                                <Text mt={2} fontSize="sm" color="green.500">
                                    Image uploaded successfully
                                </Text>
                            )}
                        </FormControl>
                    </Stack>
                </CardBody>
                <Flex pr={5} mb={6} justifyContent={'flex-end'}>
                    <Button
                        variant={"navbarButton"}
                        onClick={handleSubmit}
                        isDisabled={!title || !comment || isUploading}
                        cursor={(title && comment && !isUploading) ? "pointer" : "not-allowed"}
                        isLoading={isLoading}
                        spinner={<BeatLoader size={8} color='red' />}
                    >
                        Post
                    </Button>
                </Flex>
            </Card>


        </>

    );
};

export default UserAddLaptimes;