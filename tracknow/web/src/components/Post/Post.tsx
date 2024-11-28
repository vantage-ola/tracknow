import * as React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  HStack,
  Link,
  Center,
  Divider,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetUserLaptimesResponse, mapToLaptime, Laptime } from "../../Types";
import { RiComputerLine, RiMapPinLine, RiTimerFlashLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { BeatLoader } from "react-spinners";

import miscFunctions from "../../misc/miscFunctions";
import { useLaptimes } from "../../hooks/useLaptimes";
import { useUsers } from "../../hooks/useUsers";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";

type PostProps = {
  laptimes: GetUserLaptimesResponse[];
  fetchMoreData: () => void;
  hasMore: boolean;
};

// homepage posts( recent) posts of users
export const HomePost: React.FC<PostProps> = ({
  laptimes,
  fetchMoreData,
  hasMore,
}) => {
  // intersection observation api instead of the bad infinite scroll component
  // when the user reach the end of the page, its going to fetch more data
  const observer = React.useRef<IntersectionObserver | null>(null);
  const lastLaptimeRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      if (hasMore) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) fetchMoreData();
        });
        if (node) observer.current.observe(node);
      }
    },
    [hasMore, fetchMoreData],
  );

  React.useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  //const [liked, setLiked] = React.useState(false);
  const [showFullText, setShowFullText] = React.useState<{
    [id: string]: boolean;
  }>({});

  const toggleShowFullText = (id: string) => {
    setShowFullText((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const { formatTimeAgo } = miscFunctions();
  const textLimit = 100;

  if (laptimes.length === 0) {
    return <LoadingSpinner />;
  }
  //console.log(laptimes)
  return (
    <>
      {laptimes.map((laptime, index) => (
        <>
          <Box
            bg={"dark"}
            key={laptime.id}
            _hover={{ bg: "lightdark" }}
            borderRadius="15px"
            p={1}
            width={{ base: "100vw", md: "auto" }}
          >
            <Box
              as={ReactRouterLink}
              to={`/user/${laptime.user_id}/moments/${laptime.id}`}
              textDecoration="none"
              key={laptime.id}
              ref={index === laptimes.length - 1 ? lastLaptimeRef : null}
            >
              <Flex justifyContent={"space-between"} p={2}>
                <Text
                  as="b"
                  fontSize={{ md: "lg" }}
                  display={{ base: "none", md: "block" }}
                >
                  {laptime.title.length > 45
                    ? `${laptime.title.substring(0, 45)}...`
                    : laptime.title}
                </Text>
                {/* mobile...  lazy way to truncate text lenght for mobile */}
                <Text
                  as="b"
                  fontSize={{ base: "sm" }}
                  display={{ base: "block", md: "none" }}
                >
                  {laptime.title.length > 27
                    ? `${laptime.title.substring(0, 27)}...`
                    : laptime.title}
                </Text>
                <HStack
                  fontSize={{ base: "11px", md: "sm" }}
                  color={"GrayText"}
                  spacing={1}
                >
                  <Text>{formatTimeAgo(laptime.date_created)}</Text>
                  <Text>•</Text>
                  <Link
                    as={ReactRouterLink}
                    to={`/user/${laptime.user_id}/${laptime.by}/`}
                  >
                    @{laptime.by}
                  </Link>
                </HStack>
              </Flex>
              <Box onClick={(event) => event.preventDefault()}>
                <MediaCarousel
                  youtubeLink={laptime.youtube_link}
                  image={laptime.image}
                />
              </Box>

              <Box p={4}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  overflowX="auto"
                >
                  <Stack
                    direction={"row"}
                    spacing={2}
                    align="flex-start"
                    flexShrink="0"
                  >
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
                            <Text
                              color={"GrayText"}
                              fontSize={"xs"}
                              fontWeight="medium"
                            >
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

                              <Text
                                color={"GrayText"}
                                fontSize={"xs"}
                                fontWeight="medium"
                              >
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
                            <Text
                              color={"GrayText"}
                              fontSize={"xs"}
                              fontWeight="medium"
                            >
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
                            <Text
                              color={"GrayText"}
                              fontSize={"xs"}
                              fontWeight="medium"
                            >
                              {laptime.time}
                            </Text>
                          </HStack>
                        </Flex>
                      </Box>
                    )}
                  </Stack>
                </Flex>
                <Text
                  onClick={(event) => event.preventDefault()}
                  fontSize={"smaller"}
                  color={"white"}
                  mt={3}
                >
                  {showFullText[laptime.id]
                    ? laptime.comment
                    : laptime.comment.substring(0, textLimit)}
                  {laptime.comment.length > textLimit && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleShowFullText(laptime.id.toString())}
                    >
                      {showFullText[laptime.id]
                        ? " Read less"
                        : "... Read more"}
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
          {index !== laptimes.length - 1 && (
            <Divider borderColor="#323536" my={1} />
          )}
        </>
      ))}
      {hasMore && (
        <Center>
          <BeatLoader size={8} color="red" />
        </Center>
      )}
      {!hasMore && (
        <Center>
          <Text fontSize={"xs"} color={"GrayText"}>
            😥No more data to load...
          </Text>
        </Center>
      )}
    </>
  );
};

export const SelectedPost: React.FC = () => {
  const { fetchAUserLaptime, editLaptime, deleteLaptime } = useLaptimes();
  const { userId } = useUsers();
  const { id, user_id } = useParams<{ id: string; user_id: string }>();
  const [laptime, setLaptime] = React.useState<GetUserLaptimesResponse | null>(
    null,
  );

  const isOwner = userId === Number(user_id); // check if user is the owner of post
  const navigate = useNavigate();
  const Toast = useToast();
  const { formatTimeAgo } = miscFunctions();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [editData, setEditData] = React.useState<Laptime>({
    title: "",
    simracing: true,
    comment: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const cancelRef = React.useRef(null);

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
  });

  const handleEdit = () => {
    if (laptime) {
      setEditData(mapToLaptime(laptime));
      onEditOpen();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLaptime(Number(id));
      Toast({ title: "Post deleted successfully.", status: "success" });
      navigate(-1); // Navigate back after deletion
    } catch (error) {
      Toast({ title: "Failed to delete post.", status: "error" });
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      await editLaptime(Number(id), editData);
      Toast({ title: "Post edited successfully.", status: "success" });

      // Wait 500 milliseconds before reloading
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate(0);
    } catch (error) {
      Toast({ title: "Failed to edit post.", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!laptime) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box
        key={laptime.id}
        borderRadius="15px"
        p={1}
        width={{ base: "100vw", md: "auto" }}
      >
        <Box textDecoration="none" key={laptime.id}>
          <Flex justifyContent="space-between" alignItems="center" p={2}>
            <Button variant="navbarButton" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </Button>

            <Flex justifyContent={"space-between"} p={2}>
              <Text as="b" fontSize={{ base: "xs", md: "lg" }}>
                {laptime.title}
              </Text>
            </Flex>

            <HStack
              fontSize={{ base: "11px", md: "sm" }}
              color={"GrayText"}
              spacing={1}
            >
              <Text>{formatTimeAgo(laptime.date_created)}</Text>
              <Text>•</Text>
              <Link
                as={ReactRouterLink}
                to={`/user/${laptime.user_id}/${laptime.by}/`}
              >
                @{laptime.by}
              </Link>
            </HStack>
          </Flex>

          <Box onClick={(event) => event.preventDefault()}>
            <MediaCarousel
              youtubeLink={laptime.youtube_link}
              image={laptime.image}
            />
          </Box>

          <Box p={4}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              overflowX="auto"
            >
              <Stack
                direction={"row"}
                spacing={2}
                align="flex-start"
                flexShrink="0"
              >
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
                        <Text
                          color={"GrayText"}
                          fontSize={"xs"}
                          fontWeight="medium"
                        >
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

                          <Text
                            color={"GrayText"}
                            fontSize={"xs"}
                            fontWeight="medium"
                          >
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
                        <Text
                          color={"GrayText"}
                          fontSize={"xs"}
                          fontWeight="medium"
                        >
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
                        <Text
                          color={"GrayText"}
                          fontSize={"xs"}
                          fontWeight="medium"
                        >
                          {laptime.time}
                        </Text>
                      </HStack>
                    </Flex>
                  </Box>
                )}
              </Stack>
            </Flex>
            {/* user can edit/delete his own posts*/}
            {isOwner && (
              <Flex mt={4} justifyContent="flex-end">
                <Button variant="navbarButton" onClick={handleEdit}>
                  <MdEdit />
                </Button>

                <Button variant="navbarButton" onClick={onDeleteOpen}>
                  <MdDelete />
                </Button>

                {/* Edit Modal */}
                <Modal isOpen={isEditOpen} onClose={onEditClose}>
                  <ModalOverlay />
                  <ModalContent bg={"dark"}>
                    <ModalHeader>Edit Laptime</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                          name="title"
                          value={editData.title}
                          onChange={handleEditChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Body</FormLabel>
                        {/*Fix: Max length doesnt work */}
                        <Textarea
                          name="comment"
                          placeholder="Body"
                          value={editData.comment}
                          onChange={handleEditChange}
                          maxLength={500}
                        />
                      </FormControl>
                      {/* Add other form fields for editing as needed */}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        variant="navbarButton"
                        onClick={saveChanges}
                        isLoading={isLoading}
                        spinner={<BeatLoader size={8} color="red" />}
                      >
                        Save
                      </Button>
                      <Button
                        variant="navbarButton"
                        color={"red"}
                        ml={3}
                        onClick={onEditClose}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                {/* Delete Modal */}

                <AlertDialog
                  isOpen={isDeleteOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onDeleteClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent bg={"dark"}>
                      <AlertDialogBody>
                        Are you sure you want to delete this laptime? This
                        action cannot be undone.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button
                          variant="navbarButton"
                          ref={cancelRef}
                          onClick={onDeleteClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="navbarButton"
                          color="red"
                          onClick={handleDelete}
                          ml={3}
                        >
                          Confirm
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Flex>
            )}
            <Text fontSize={"smaller"} color={"white"} mt={3}>
              {laptime.comment}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
