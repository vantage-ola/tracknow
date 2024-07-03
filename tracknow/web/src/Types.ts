// ts types.

export interface User {
    id: Number;
    username: string;
};
// login types 
export interface Login { // login and signup requests
    username: string,
    password: string
};
export interface LoginResponse {
    msg: string;
    token: string;
};

export interface SignUpResponse {
    username: string;
};

export interface Laptime {
    car: string;
    track: string;
    time: string;
    simracing: boolean;
    platform?: string;
    youtube_link?: string;
    comment?: string;
}

export interface CreateLaptimeResponse {
    "Laptime Added Successfully": Laptime;
    by: string;
}

export interface GetUserLaptimesResponse {
    car: string;
    track: string;
    time: string;
    simracing: boolean;
    platform: string;
    youtube_link: string;
    comment: string;
    user_id: Number;
    id: Number;
    by: string;
}

export interface identity {
    "message": "User Found";
    "name": string; // username
}