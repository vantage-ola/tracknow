import * as React from "react";

import API from "./API";
import { GetUserLaptimesResponse, Laptime } from "../Types";

export const useLaptimes = () => {

    const [laptime, setLaptime] = React.useState<GetUserLaptimesResponse[]>([]);
    const [mylaptime, setmylaptimes] = React.useState<GetUserLaptimesResponse[]>([]);

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

    // fetch connected user personal uploaded laptimes/moments
    const fetchMyLaptimes = async () => {
        try {
            const response = await API.handleLaptimes();

            if (Array.isArray(response)) {

                setmylaptimes(response);

            } else {
                // CreateLaptimeResponse  - addLaptime function lol
            }
        } catch (error) {
            throw new Error("My Laptimes not loaded");
        }
    }

    React.useEffect(() => {
        //console.log("useEffect called");
        fetchLaptime();
        fetchMyLaptimes();
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

    return { laptime, addLaptime, mylaptime };

}