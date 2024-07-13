import * as React from "react";
import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
import { NavbarLoggedIn } from "../Navbar/Navbar";
import API from "../../hooks/API";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Center, useToast, Text, Heading } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

const UserLaptimes = () => {

    const { mylaptime, fetchMoreData2, hasMore2 } = useLaptimes();

    const [myusername, setUsername] = React.useState("");
    const [loading, setLoading] = React.useState(false)
    const [profilepic, setProfilePic] = React.useState("");


    const navigate = useNavigate();
    const toast = useToast();

    // useEffect to make sure user is in session, else /login
    React.useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await API.getIdentity();
                setUsername(response.name);
                setProfilePic(response.pp)
                setLoading(false);

            } catch (error) {
                toast({
                    title: "Login required",
                    description: "Please log in to view this page.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/login");
                setLoading(false);
            }
        };
        checkLoggedIn()
    }, []);

    if (loading) {
        return (
            <>
                <NavbarLoggedIn name={myusername} pp={profilepic} />
                <LoadingSpinner />
            </>
        );
    }

    if (mylaptime.length === 0) {
        return (
            <>
                <NavbarLoggedIn name={myusername} pp={profilepic} />
                <Center h="100vh">
                    <Text color="white" fontSize="lg">
                        Nothing to see here, Create Post above
                    </Text>
                </Center>
            </>
        );
    }

    return (
        <>
            <NavbarLoggedIn name={myusername} pp={profilepic} />
            <HomePost laptimes={mylaptime} fetchMoreData={fetchMoreData2} hasMore={hasMore2} />
        </>
    );

};
export default UserLaptimes;