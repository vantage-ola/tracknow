import * as React from "react";
import { Box, Flex, Text, Stack, Icon, HStack, Link, Center, Divider, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetUserLaptimesResponse } from "../../Types";
import { RiComputerLine, RiMapPinLine, RiTimerFlashLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { BeatLoader } from "react-spinners";

import miscFunctions from "../../misc/miscFunctions";
import { useLaptimes } from "../../hooks/useLaptimes";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom';

type PostProps = {
    laptimes: GetUserLaptimesResponse[];
    fetchMoreData: () => void;
    hasMore: boolean;
};


// homepage posts( recent) posts of users
export const HomePost: React.FC<PostProps> = ({ laptimes, fetchMoreData, hasMore }) => {

    // intersection observation api instead of the bad infinite scroll component
    // when the user reach the end of the page, its going to fetch more data
    const observer = React.useRef<IntersectionObserver | null>(null);
    const lastLaptimeRef = React.useCallback((node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect();
        if (hasMore) {
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) fetchMoreData();
            });
            if (node) observer.current.observe(node);
        }
    }, [hasMore, fetchMoreData]);

    React.useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    //const [liked, setLiked] = React.useState(false);
    const [showFullText, setShowFullText] = React.useState<{ [id: string]: boolean }>({});

    const toggleShowFullText = (id: string) => {
        setShowFullText((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    const { LazyLoadYoutubeEmbed, formatTimeAgo } = miscFunctions();
    const textLimit = 100;

    if (laptimes.length === 0) {

        return (
            <LoadingSpinner />
        )
    };

    return (
        <>
            {laptimes.map((laptime, index) => (
                <>
                    <Box bg={'dark'} key={laptime.id} _hover={{ bg: "lightdark" }} borderRadius="15px" p={1} width={{ base: '100vw', md: 'auto' }}>
                        <Box
                            as={ReactRouterLink}
                            to={`/user/${laptime.user_id}/moments/${laptime.id}`}
                            textDecoration="none"
                            key={laptime.id}
                            ref={index === laptimes.length - 1 ? lastLaptimeRef : null}

                        >
                            <Flex justifyContent={"space-between"} p={2}>
                                <Text as="b" fontSize={{ md: 'lg' }} display={{ base: 'none', md: 'block' }}>
                                    {laptime.title.length > 45
                                        ? `${laptime.title.substring(0, 45)}...`
                                        : laptime.title}
                                </Text>
                                {/* mobile...  lazy way to truncate text lenght for mobile */}
                                <Text as="b" fontSize={{ base: 'sm' }} display={{ base: 'block', md: 'none' }}>
                                    {laptime.title.length > 27
                                        ? `${laptime.title.substring(0, 27)}...`
                                        : laptime.title}
                                </Text>
                                <HStack fontSize={{ base: '11px', md: 'sm' }} color={"GrayText"} spacing={1}>
                                    <Text >
                                        {formatTimeAgo(laptime.date_created)}
                                    </Text>
                                    <Text>
                                        •
                                    </Text>
                                    <Link as={ReactRouterLink} to={`/user/${laptime.user_id}/${laptime.by}/`}>@{laptime.by}
                                    </Link>
                                </HStack>

                            </Flex>
                            <Box onClick={(event) => event.preventDefault()}>
                                {laptime.youtube_link && (
                                    <LazyLoadYoutubeEmbed youtubeLink={laptime.youtube_link} />
                                )}
                            </Box>

                            <Box p={4} >
                                <Flex alignItems={"center"} justifyContent={"space-between"} overflowX="auto"
                                >
                                    <Stack direction={"row"} spacing={2} align="flex-start" flexShrink="0">

                                        {laptime.car && (
                                            <Box

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
                                <Text onClick={(event) => event.preventDefault()} fontSize={"smaller"} color={"white"} mt={3}>
                                    {showFullText[laptime.id] ? laptime.comment : laptime.comment.substring(0, textLimit)}
                                    {laptime.comment.length > textLimit && (
                                        <span
                                            style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}
                                            onClick={() => toggleShowFullText(laptime.id.toString())}
                                        >
                                            {showFullText[laptime.id] ? " Read less" : "... Read more"}
                                        </span>
                                    )}
                                </Text>

                            </Box>

                            {/*like, comments
                        <Flex alignItems={"center"} justifyContent={"right"} p={2}>
                            <Stack direction={"row"} spacing={2}>
                                <Flex >
                                    <HStack justifyContent={"space-between"}>
                                        <Box onClick={() => setLiked(!liked)}>
                                            {liked ? (
                                                <BsHeartFill fill="red" fontSize={"18px"} />
                                            ) : (
                                                <BsHeart fontSize={"18px"} />
                                            )}
                                        </Box>
                                        <Text color={"grey"} fontSize={"15px"}>200</Text>
                                    </HStack>
                                </Flex>

                                <Flex>
                                    <HStack justifyContent={"space-between"}>
                                        <Icon as={GoCommentDiscussion} fontSize={"18px"} />
                                        <Text color={"grey"} fontSize={"15px"}>7</Text>

                                    </HStack>
                                </Flex>
                            </Stack>
                        </Flex>
                        */}
                        </Box>

                    </Box>
                    {index !== laptimes.length - 1 && <Divider borderColor="#323536" my={1} />}
                </>
            ))}
            {hasMore && (
                <Center>
                    <BeatLoader size={8} color='red' />
                </Center>
            )}
            {!hasMore &&
                <Center>
                    <Text fontSize={'xs'} color={'GrayText'}>😥No more data to load...</Text>
                </Center>}

        </>

    );
};

export const SelectedPost: React.FC = () => {
    const { fetchAUserLaptime } = useLaptimes();
    const { id, user_id } = useParams<{ id: string; user_id: string }>();
    const [laptime, setLaptime] = React.useState<GetUserLaptimesResponse | null>(null);

    const navigate = useNavigate();
    const { LazyLoadYoutubeEmbed, formatTimeAgo } = miscFunctions();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAUserLaptime({
                    user_id: Number(user_id),
                    id: Number(id),
                });
                setLaptime(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id, user_id, fetchAUserLaptime]);

    if (!laptime) {
        return <LoadingSpinner />
    }

    return (
        <>

            <Box key={laptime.id} borderRadius="15px" p={1} width={{ base: '100vw', md: 'auto' }}>

                <Box
                    textDecoration="none"
                    key={laptime.id}

                >
                    <Flex justifyContent="space-between" alignItems="center" p={2}>
                        <Button variant="navbarButton" onClick={() => navigate(-1)}><ArrowBackIcon /></Button>

                        <Flex justifyContent={"space-between"} p={2}>

                            <Text as="b" fontSize={{ base: 'xs', md: 'lg' }}>{laptime.title}</Text>

                        </Flex>

                        <HStack fontSize={{ base: '11px', md: 'sm' }} color={"GrayText"} spacing={1}>
                            <Text >
                                {formatTimeAgo(laptime.date_created)}
                            </Text>
                            <Text>
                                •
                            </Text>
                            <Link as={ReactRouterLink} to={`/user/${laptime.user_id}/${laptime.by}/`}>@{laptime.by}
                            </Link>
                        </HStack>
                    </Flex>

                    <Box onClick={(event) => event.preventDefault()}>
                        {laptime.youtube_link && (
                            <LazyLoadYoutubeEmbed youtubeLink={laptime.youtube_link} />
                        )}
                    </Box>

                    <Box p={4} >
                        <Flex alignItems={"center"} justifyContent={"space-between"} overflowX="auto"
                        >
                            <Stack direction={"row"} spacing={2} align="flex-start" flexShrink="0">

                                {laptime.car && (
                                    <Box

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
                            {laptime.comment}
                        </Text>

                    </Box>

                    {/*like, comments
                        <Flex alignItems={"center"} justifyContent={"right"} p={2}>
                            <Stack direction={"row"} spacing={2}>
                                <Flex >
                                    <HStack justifyContent={"space-between"}>
                                        <Box onClick={() => setLiked(!liked)}>
                                            {liked ? (
                                                <BsHeartFill fill="red" fontSize={"18px"} />
                                            ) : (
                                                <BsHeart fontSize={"18px"} />
                                            )}
                                        </Box>
                                        <Text color={"grey"} fontSize={"15px"}>200</Text>
                                    </HStack>
                                </Flex>

                                <Flex>
                                    <HStack justifyContent={"space-between"}>
                                        <Icon as={GoCommentDiscussion} fontSize={"18px"} />
                                        <Text color={"grey"} fontSize={"15px"}>7</Text>

                                    </HStack>
                                </Flex>
                            </Stack>
                        </Flex>
                        */}
                </Box>

            </Box>

        </>
    );
};
