import * as React from "react";
import { NavbarLoggedIn } from "../Navbar/Navbar";
import { useUsers, getProfile } from "../../hooks/useUsers";
import {
    Flex, Box, Card, CardBody,
    Center, Avatar, Stack, Text,
    CardHeader, Heading
} from "@chakra-ui/react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { GetUserLaptimesResponse, OneUser } from "../../Types";
import useMiscFunctions from "../../misc/miscFunctions";

export const UserProfile = ({ id }: { id: number }) => {

    const { username, profilePic, loading } = useUsers();
    const [userData, setUserData] = React.useState<OneUser | null>(null);
    const [UserLaptimes, setUserLaptimes] = React.useState<GetUserLaptimesResponse[]>([])

    const { dummyLaptimes } = useMiscFunctions()

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getProfile(id);
                setUserData(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) {
        return (
            <LoadingSpinner />
        );
    };

    return (

        <>
            <NavbarLoggedIn name={username} pp={profilePic} />
            <Flex mt={10} bg="dark" >
                {/* Left section*/}
                <Box flex="1" borderRight="1px solid #323536" overflowY="auto" display={["none", "none", "block"]}>
                    {/* left section content */}
                </Box>

                {/* Main Section */}
                <Box
                    flex="4"
                    rounded={'sm'}
                    my={1}
                    mx={[0, 5]}
                    overflow={'hidden'}
                    borderRadius={"1px"}>

                    <Card size={'lg'} maxW='600px'>
                        <CardHeader>
                            <Heading size='md'>{userData ? userData.username : "Loading..."}'s Profile</Heading>
                        </CardHeader>

                        <CardBody>

                            <Center>

                                <Stack>
                                    <Avatar
                                        size={"2xl"}
                                        src={userData ? userData.profile_picture : ""}
                                    />
                                    <Center>
                                        <Text>{userData ? userData.nationality : "Loading..."}</Text>

                                    </Center>
                                </Stack>


                            </Center>

                            <Stack spacing={4}>
                                {/* TODO fill it with actual user  content  */}
                                <Text mt={5} fontStyle="italic" color="GrayText">
                                    This is not {userData ? userData.username + "'s" : "Loading..."} data, I'm working on fixing it
                                </Text>
                                {dummyLaptimes.slice(0, 3).map((laptime) => (
                                    <Box
                                        key={laptime.id}
                                        p={4}
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        _hover={{ cursor: "not-allowed" }}
                                        bg="grey"
                                        color={'dark'}
                                    >
                                        <Text fontWeight="bold">{laptime.title}</Text>
                                        <Text>Car: {laptime.car}</Text>
                                        <Text>Track: {laptime.track}</Text>
                                        <Text>Time: {laptime.time}</Text>
                                        <Text>Platform: {laptime.platform}</Text>
                                        <Text>Comment: {laptime.comment}</Text>
                                    </Box>
                                ))}

                            </Stack>

                        </CardBody>
                    </Card>


                </Box>

            </Flex>
        </>
    );
};