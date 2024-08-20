import * as React from "react";
import { useUsers, getProfile } from "../../hooks/useUsers";
import {
    Card, CardBody,
    Center, Avatar, Stack, Text,
    CardHeader, Heading,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { GetUserLaptimesResponse, OneUser } from "../../Types";
import { useLaptimes } from "../../hooks/useLaptimes";
import { HomePost } from "../Post/Post";
import { BeatLoader } from "react-spinners";

export const UserProfile = ({ id }: { id: number }) => {

    const { loading } = useUsers();
    const [userData, setUserData] = React.useState<OneUser | null>(null);
    const [laptimes, setUserLaptimes] = React.useState<GetUserLaptimesResponse[]>([]);
    const [hasMore, setHasMore] = React.useState(true);

    const [page, setPage] = React.useState(1);
    const [laptime_loading, setLoading] = React.useState(true);


    //const { dummyLaptimes } = useMiscFunctions()
    const { fetchUsersLaptimes } = useLaptimes()


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

                    <Card size={'lg'} width={{ base: '100vw', md: 'auto' }}>

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
                            <HomePost
                                laptimes={laptimes}
                                fetchMoreData={fetchMoreData}
                                hasMore={hasMore}
                            />
                            {hasMore && (
                                <Center>
                                    <BeatLoader size={8} color='red' />
                                </Center>
                            )}
                        </CardBody>

                    </Card>
                </>

            )}
        </>
    );

};