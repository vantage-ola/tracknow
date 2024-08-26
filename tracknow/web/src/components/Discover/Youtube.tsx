import * as React from "react";
import { Box, Card, CardBody, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import useMiscFunctions from "../../misc/miscFunctions";
import { FaYoutube, FaHashtag } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import getInternetData from "../../hooks/useInternet";
import { YoutubeSearchResult } from "../../Types";

const Youtube: React.FC = () => {

    const { LazyLoadYoutubeEmbed } = useMiscFunctions();
    const { fetchYoutube } = getInternetData();

    const [youtube, setYoutube] = React.useState<YoutubeSearchResult[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const youtubeData = await fetchYoutube();
            setYoutube(youtubeData);
        };
        fetchData();
    })
    return (
        <>
            {youtube.map((video) => (
                <Card key={video.id.videoId}>
                    <CardBody>
                        <Flex justifyContent={"space-between"} p={2}>
                            <Text as="b">{video.snippet.title}</Text>
                            <Text fontSize="smaller" color={"GrayText"}>
                                {formatDistanceToNow(new Date(video.snippet.publishedAt), { addSuffix: true })}
                            </Text>
                        </Flex>
                        <Box>
                            <LazyLoadYoutubeEmbed youtubeLink={video.id.videoId} />
                        </Box>
                        <Box p={2}>
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
                        </Box>
                        <Text fontSize={"smaller"}>{video.snippet.description}</Text>
                    </CardBody>
                </Card>
            ))}
        </>
    );

};

export default Youtube;