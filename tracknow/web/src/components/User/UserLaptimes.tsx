import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
import { NavbarLoggedIn } from "../Navbar/Navbar";
//import { useNavigate } from "react-router-dom";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Center, Text, useDisclosure, } from "@chakra-ui/react";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { UserProfile } from "./UserProfile";

const UserLaptimes = () => {

    const { mylaptime, fetchMoreData2, hasMore2, laptime_loading } = useLaptimes();
    const { username, profilePic, loading, userId } = useUsers();

    const { isOpen, onOpen, onClose } = useDisclosure();

    //const [loading, setLoading] = React.useState(false)

    /* if (laptime_loading) {
        return (
            <>
                <NavbarLoggedIn name={username} pp={profilePic} />
                <LoadingSpinner />
            </>
        );
    };

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
     } */

    return (
        <>
            <NavbarLoggedIn name={username} pp={profilePic} onOpen={onOpen} />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <UserProfile id={userId} />
            )}
        </>
    );

};
export default UserLaptimes;