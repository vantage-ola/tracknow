import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
//import { useNavigate } from "react-router-dom";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Center, Text, useDisclosure, } from "@chakra-ui/react";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { UserProfile } from "./UserProfile";

const UserLaptimes = () => {

    const { username, profilePic, loading, userId } = useUsers();

    const { isOpen, onOpen, onClose } = useDisclosure();

    //const [loading, setLoading] = React.useState(false)

    /* if (laptime_loading) {
        return (
            <>
                <LoadingSpinner />
            </>
        );
    };

    if (mylaptime.length === 0) {
         return (
             <>
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
            {loading ? (
                <LoadingSpinner />
            ) : (
                <UserProfile id={userId} />
            )}
        </>
    );

};
export default UserLaptimes;