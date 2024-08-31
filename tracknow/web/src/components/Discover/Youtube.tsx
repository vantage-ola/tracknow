import * as React from "react";
import { Box, Card, CardBody, Center, Flex, HStack, Icon, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import useMiscFunctions from "../../misc/miscFunctions";
import { FaYoutube, FaHashtag } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import getInternetData from "../../hooks/useInternet";
import { YoutubeSearchResult } from "../../Types";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { BeatLoader } from "react-spinners";

const Youtube: React.FC = () => {

    const { LazyLoadYoutubeEmbed, formatTimeAgo } = useMiscFunctions();
    const { fetchYoutube } = getInternetData();

    const [youtube, setYoutube] = React.useState<YoutubeSearchResult[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const [isMobile] = useMediaQuery("(max-width: 600px)");
    const [visibleData, setVisibleData] = React.useState<YoutubeSearchResult[]>([]);
    const [index, setIndex] = React.useState(5);
    const [hasMoreData, setHasMoreData] = React.useState(true);

    //lazy infinite load
    const observer = React.useRef<IntersectionObserver>();
    const lastElementRef = React.useCallback(
        (node: HTMLDivElement) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMoreData) {
                    setVisibleData((prevData) => [
                        ...prevData,
                        ...youtube.slice(index, index + 5),
                    ]);
                    setIndex((prevIndex) => prevIndex + 5);
                    if (index + 5 >= youtube.length) {
                        setHasMoreData(false);
                    }
                }
            });
            if (node) observer.current.observe(node);
        },
        [youtube, index, hasMoreData]
    );

    React.useEffect(() => {
        const fetchData = async () => {
            const youtubeData = await fetchYoutube();
            setYoutube(youtubeData);
            setVisibleData(youtubeData.slice(0, 5));
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {visibleData.map((video, index) => (
                        <Card
                            key={`${video.id.videoId}-${index}`}

                            ref={index === visibleData.length - 1 ? lastElementRef : null}
                        >
                            <CardBody>
                                <Flex justifyContent={"space-between"} p={2}>
                                    <Text as="b">
                                        {video.snippet.title.length > 51
                                            ? `${video.snippet.title.substring(0, 51)}...`
                                            : video.snippet.title}
                                    </Text>
                                    {!isMobile && (
                                        <Text fontSize="smaller" color={"GrayText"}>
                                            {formatTimeAgo(video.snippet.publishedAt)}
                                        </Text>
                                    )}
                                </Flex>
                                <Box>
                                    <LazyLoadYoutubeEmbed youtubeLink={video.id.videoId} />
                                </Box>
                                <Box p={2}>
                                    <Flex alignItems={"center"} justifyContent={"space-between"} overflowX="auto">
                                        <Stack direction={"row"} spacing={2} align="flex-start" flexShrink="0">
                                            <Box
                                                display={"inline-block"}
                                                px={2}
                                                py={1}
                                                color="white"
                                                mb={2}
                                            >
                                                <Flex justifyContent={"space-between"}>
                                                    <HStack>
                                                        <Icon color="red" as={FaYoutube} />
                                                        <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                            {video.snippet.channelTitle}
                                                        </Text>
                                                    </HStack>
                                                </Flex>
                                            </Box>
                                            <Box
                                                display={"inline-block"}
                                                px={2}
                                                py={1}
                                                color="white"
                                                mb={2}
                                            >
                                                <Flex justifyContent={"space-between"}>
                                                    <HStack>
                                                        <Icon color="red" as={FaHashtag} />
                                                        <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                            simracing
                                                        </Text>
                                                    </HStack>
                                                </Flex>
                                            </Box>
                                            <Box
                                                display={"inline-block"}
                                                px={2}
                                                py={1}
                                                color="white"
                                                mb={2}
                                            >
                                                <Flex justifyContent={"space-between"}>
                                                    <HStack>
                                                        <Icon color="red" as={FaHashtag} />
                                                        <Text color={"GrayText"} fontSize={"xs"} fontWeight="medium">
                                                            motorsports
                                                        </Text>
                                                    </HStack>
                                                </Flex>
                                            </Box>
                                        </Stack>
                                    </Flex>

                                </Box>
                                <Text fontSize={"smaller"}>{video.snippet.description}</Text>
                            </CardBody>
                        </Card>
                    ))
                    }
                    {hasMoreData && (
                        <Center>
                            <BeatLoader size={8} color='red' />
                        </Center>
                    )}
                    {!hasMoreData &&
                        <Center>
                            <Text fontSize={'xs'} color={'GrayText'}>😥No more data to load...</Text>

                        </Center>
                    }
                </>

            )}

        </>
    );

};

export default Youtube;