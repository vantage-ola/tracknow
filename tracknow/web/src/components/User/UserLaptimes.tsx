//import { useNavigate } from "react-router-dom";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useUsers } from "../../hooks/useUsers";
//import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { UserProfile } from "./UserProfile";

const UserLaptimes = () => {
  const { userId } = useUsers();

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
      <UserProfile id={userId} />
    </>
  );
};
export default UserLaptimes;
