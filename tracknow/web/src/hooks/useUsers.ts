import * as React from "react";
import { EditUser, EditUserPic } from "../Types";
import API from "./API";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useUsers = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [userId, setMyUserId] = React.useState<Number>(0);
    const [username, setMyUsername] = React.useState<string>('')
    const [profilePic, setProfilePicture] = React.useState<string>('');



    // TODO Utilize this function across the whole react codebase
    // This way we reduce repetition and redundancy
    const getMyIdentity = async () => {
        try {

            const response = await API.getIdentity();
            setMyUserId(response.id)
            setMyUsername(response.name)
            setProfilePicture(response.pp)

        } catch (error) {
            toast({
                title: "Login required",
                description: "Please log in to view this page.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            navigate("/login");
        }
    };

    getMyIdentity()

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

    return { editProfilePic, editProfile, username, profilePic }
};
