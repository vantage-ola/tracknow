import * as React from "react";
import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";

const UserLaptimes = () => {

    const { mylaptime } = useLaptimes();

    return (
        <>

            < HomePost laptimes={mylaptime} />

        </>
    )
};

export default UserLaptimes