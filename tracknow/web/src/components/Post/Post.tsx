import * as React from "react";
import { Box, Flex, Text, AspectRatio, Stack, Icon, HStack } from "@chakra-ui/react";
import { GetUserLaptimesResponse } from "../../Types";
import { RiComputerLine, RiMapPinLine, RiTimerFlashLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";

type PostProps = {
    laptimes: GetUserLaptimesResponse[];
};

// posts posted by the user
export const MyPost = () => {

    return (
        <>

        </>
    );
};

// homepage posts(random & recent) posts of users
export const HomePost: React.FC<PostProps> = ({ laptimes }) => {

    const [liked, setLiked] = React.useState(false);
    const [showFullText, setShowFullText] = React.useState(false);
    const textLimit = 100;
    //const truncatedText = laptime.comment.substring(0, textLimit)
    // embed youtube link 
    const roundframe = {
        borderRadius: "15px",
        overflow: "hidden",
    }
    return (
        <Flex mt={10} bg="dark">
            {/* Left section*/}
            <Box flex="1" borderRight="1px solid #323536" overflowY="auto" display={["none", "none", "block"]}>
                {/* left section content */}
            </Box>

            {/* Middle section */}
            <Box flex="3"
                rounded={'sm'}
                my={1}
                mx={[0, 5]}
                overflow={'hidden'}
                borderRadius={"1px"}
                overflowY="auto"
            >

                {laptimes.map((laptime) => (
                    <Box key={laptime.id.toString()} p={1} borderBottom="1px solid #323536">

                        <Flex justifyContent={"right"} p={2}>
                            <Text fontSize="sm" color={"GrayText"}>@{laptime.by}</Text>
                        </Flex>
                        <Box mt={1}  >
                            <AspectRatio ratio={16 / 9}>
                                <iframe style={roundframe}

                                    src={`https://www.youtube.com/embed/${laptime.youtube_link?.split("v=")[1]}`}
                                    title="YouTube video player"
                                    allowFullScreen
                                />
                            </AspectRatio>
                        </Box>
                        <Box p={4} >
                            <Flex alignItems={"center"} justifyContent={"space-between"} overflowX="auto"
                            >
                                <Stack direction={"row"} spacing={2} align="flex-start" flexShrink="0">
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
                ))}
            </Box>

            {/* Right section*/}
            <Box flex="1" borderLeft="1px solid #323536" overflowY="auto" display={["none", "none", "block"]}>
                {/*right content section */}
            </Box>
        </Flex>
    );
};

