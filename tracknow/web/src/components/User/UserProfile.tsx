import * as React from "react";
import { useUsers, getProfile } from "../../hooks/useUsers";
import {
    Flex, Box, Card, CardBody,
    Center, Avatar, Stack, Text,
    CardHeader, Heading,
    Icon,
    HStack,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { GetUserLaptimesResponse, OneUser } from "../../Types";
//import useMiscFunctions from "../../misc/miscFunctions";
import { useLaptimes } from "../../hooks/useLaptimes";
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";
import miscFunctions from "../../misc/miscFunctions";
import { RiComputerLine, RiMapPinLine, RiTimerFlashLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";


export const UserProfile = ({ id }: { id: number }) => {

    const { loading } = useUsers();
    const [userData, setUserData] = React.useState<OneUser | null>(null);
    const [laptimes, setUserLaptimes] = React.useState<GetUserLaptimesResponse[]>([]);
    const [hasMore, setHasMore] = React.useState(true);

    const [page, setPage] = React.useState(1);
    const [showFullText, setShowFullText] = React.useState(false);
    const [laptime_loading, setLoading] = React.useState(true);

    const textLimit = 100;


    //const { dummyLaptimes } = useMiscFunctions()
    const { fetchUsersLaptimes } = useLaptimes()
    const { LazyLoadYoutubeEmbed } = miscFunctions();


    const fetchMoreData = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

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

    React.useEffect(() => {
        const fetchLaptimes = async () => {
            try {
                const response = await fetchUsersLaptimes({ user_id: id, page });
                setUserLaptimes((prevLaptimes) => [...prevLaptimes, ...response]);
                if (response.length === 0) {
                    setHasMore(false);
                }
                setLoading(false);

            } catch (error) {
                console.error(error)
            }
        };

        fetchLaptimes();

    }, [page]);

    if (loading && laptime_loading) {
        return (
            <LoadingSpinner />
        );
    };

    if (!laptime_loading && laptimes.length === 0) {
        return (
            <>
                <Center h="100vh">
                    <Text color="white" fontSize="lg">
                        Nothing to see here
                    </Text>
                </Center>
            </>
        );
    }


    return (

        <>
            {laptime_loading ? (
                <LoadingSpinner />

            ) : (
                <>
                    {/* Main Section */}

                    <Card size={'lg'} maxW='600px'>

                        <CardHeader>
                            <Heading size='md'>{userData ? userData.username : "Loading..."}'s Profile</Heading>
                        </CardHeader>
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
                        <CardBody >
                            <InfiniteScroll
                                dataLength={laptimes.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<Center><BeatLoader size={8} color='red' /></Center>}
                            >
                                {laptimes.map((laptime) => (
                                    <Box key={laptime.id.toString()} p={1} borderBottom="1px solid #323536">

                                        {laptime.youtube_link && (
                                            <LazyLoadYoutubeEmbed youtubeLink={laptime.youtube_link} />
                                        )}
                                        <Box p={4} >
                                            <Flex alignItems={"center"} justifyContent={"space-between"} overflowX="auto"
                                            >
                                                <Stack direction={"row"} spacing={2} align="flex-start" flexShrink="0">

                                                    {laptime.car && (
                                                        <Box
                                                            bg="black"
                                                            display={"inline-block"}
                                                            px={2}
                                                            py={1}
                                                            color="white"
                                                            mb={2}
                                                        >
                                                            <Flex justifyContent={"space-between"}>
                                                                <HStack>
                                                                    <Icon color="red" as={FaCar} />
                                                                    <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                                        {laptime.car}
                                                                    </Text>
                                                                </HStack>
                                                            </Flex>
                                                        </Box>
                                                    )}
                                                    {laptime.track && (

                                                        <Flex>
                                                            <Box
                                                                bg="black"
                                                                display={"inline-block"}
                                                                px={2}
                                                                py={1}
                                                                color="white"
                                                                mb={2}
                                                            >
                                                                <Flex justifyContent={"space-between"}>
                                                                    <HStack>
                                                                        <Icon color="red" as={RiMapPinLine} />

                                                                        <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                                            {laptime.track}
                                                                        </Text>
                                                                    </HStack>
                                                                </Flex>
                                                            </Box>
                                                        </Flex>
                                                    )}
                                                    {laptime.platform && (

                                                        <Box
                                                            bg="black"
                                                            display={"inline-block"}
                                                            px={2}
                                                            py={1}
                                                            color="white"
                                                            mb={2}
                                                        >
                                                            <Flex justifyContent={"space-between"}>
                                                                <HStack>
                                                                    <Icon color="red" as={RiComputerLine} />
                                                                    <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                                        {laptime.platform}
                                                                    </Text>
                                                                </HStack>
                                                            </Flex>
                                                        </Box>
                                                    )}
                                                    {laptime.time && (

                                                        <Box
                                                            bg="black"
                                                            display={"inline-block"}
                                                            px={2}
                                                            py={1}
                                                            color="white"
                                                            mb={2}
                                                        >
                                                            <Flex justifyContent={"space-between"}>
                                                                <HStack>
                                                                    <Icon color="red" as={RiTimerFlashLine} />
                                                                    <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                                        {laptime.time}
                                                                    </Text>
                                                                </HStack>
                                                            </Flex>
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </Flex>
                                            <Text fontSize={"smaller"} color={"white"} mt={3}>
                                                {showFullText ? laptime.comment : laptime.comment.substring(0, textLimit)}
                                                {laptime.comment.length > textLimit && (
                                                    <span
                                                        style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}
                                                        onClick={() => setShowFullText(!showFullText)}
                                                    >
                                                        {showFullText ? "Read less" : "... Read more"}
                                                    </span>
                                                )}
                                            </Text>

                                        </Box>

                                    </Box>
                                ))}
                            </InfiniteScroll>
                        </CardBody>

                    </Card>
                </>

            )};
        </>
    );

};