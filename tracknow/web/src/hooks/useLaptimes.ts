import * as React from "react";

import API from "./API";
import { GetUserLaptimesResponse } from "../Types";

export const useLaptimes = () => {

    const [laptime, setLaptime] = React.useState<GetUserLaptimesResponse[]>([]);

    const fetchLaptime = async () => {
        try {

            const response: GetUserLaptimesResponse[] = await API.fetchEveryoneLaptime();
            //console.log(response);

            setLaptime(response)

        } catch (error) {

            throw new Error("Laptimes not loaded!")
        }
    };

    React.useEffect(() => {
        //console.log("useEffect called");
        fetchLaptime();
    }, [])

    return { laptime };

}