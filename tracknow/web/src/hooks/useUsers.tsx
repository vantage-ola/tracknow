import * as React from "react";
import { EditUser, EditUserPic, UserData } from "../Types";
import API from "./API";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";



// Create the context with a default value
const UserContext = React.createContext<UserData>({
    userId: 0,
    username: "",
    profilePic: "",
    editProfile: async () => { },
    editProfilePic: async () => { },
    loading: true
});

export const useUsers = () => {
    return React.useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const toast = useToast();
    const navigate = useNavigate();

    const [userId, setMyUserId] = React.useState<number>(0);
    const [username, setMyUsername] = React.useState<string>('')
    const [profilePic, setProfilePicture] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);



    // Utilize this function across the whole react codebase
    // This way we reduce repetition and redundancy
    React.useEffect(() => {
        const getMyIdentity = async () => {
            try {
                const response = await API.getIdentity();
                setMyUserId(response.id);
                setMyUsername(response.name);
                setProfilePicture(response.pp);
                setLoading(false);
            } catch (error) {

                navigate("/login");
            }
        };

        getMyIdentity();
    }, []);

    const editProfile = async (editProfile: EditUser) => {

        try {

            const response = await API.EditUserProfile(userId, editProfile);
            return response;

        } catch (error) {

            throw new Error("Error editing User Profile");

        }
    };

    const editProfilePic = async (editProfilePic: EditUserPic) => {
        try {

            const response = await API.EditUserProfilePic(userId, editProfilePic);
            return response;
        } catch (error) {

            throw new Error("Error editing user Profile Pic");
        }
    };
    return (
        <UserContext.Provider value={{ userId, username, profilePic, editProfile, editProfilePic, loading }}>
            {children}
        </UserContext.Provider>
    );
};
