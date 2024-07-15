import * as React from "react";
import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
import { NavbarLoggedIn } from "../Navbar/Navbar";
//import { useNavigate } from "react-router-dom";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Center, Text, } from "@chakra-ui/react";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

const UserLaptimes = () => {

    const { mylaptime, fetchMoreData2, hasMore2 } = useLaptimes();
    const { username, profilePic, loading } = useUsers();

    //const [loading, setLoading] = React.useState(false)

    /*if (loading) {
        return (
            <>
                <NavbarLoggedIn name={username} pp={profilePic} />
                <LoadingSpinner />
            </>
        );
    } */

    if (mylaptime.length === 0) {
        return (
            <>
                <NavbarLoggedIn name={username} pp={profilePic} />
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
            <NavbarLoggedIn name={username} pp={profilePic} />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <HomePost laptimes={mylaptime} fetchMoreData={fetchMoreData2} hasMore={hasMore2} />
            )}
        </>
    );

};
export default UserLaptimes;