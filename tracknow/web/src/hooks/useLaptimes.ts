import * as React from "react";

import API from "./API";
import { GetUserLaptimesResponse, Laptime } from "../Types";

export const useLaptimes = () => {

    const [laptime, setLaptime] = React.useState<GetUserLaptimesResponse[]>([]);

    // fetch all laptimes from the server
    const fetchLaptime = async () => {
        try {

            const response: GetUserLaptimesResponse[] = await API.fetchEveryoneLaptime();
            //console.log(response);

            setLaptime(response)

        } catch (error) {

            throw new Error("Laptimes not loaded!");
        }
    };

    React.useEffect(() => {
        //console.log("useEffect called");
        fetchLaptime();
    }, [])

    // add laptimes
    const addLaptime = async (newLaptime: Laptime) => {

        try {

            const response = await API.handleLaptimes(newLaptime);
            return response;

        } catch (error) {

            throw new Error("Laptime cannot be added");
        }
    };

    return { laptime, addLaptime };

}