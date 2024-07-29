// ts types.

export interface User {
    id: Number;
    username: string;
};

export interface OneUser {
    id: number
    username: string;
    nationality: string;
    profile_picture: string;
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
    title: string;
    car?: string;
    track?: string;
    time?: string;
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
    title: string;
    car: string;
    track: string;
    time: string;
    simracing: boolean;
    platform: string;
    youtube_link: string;
    comment: string;
    user_id: number;
    id: number;
    by: string;
    date_created: string;
}

export interface identity {
    "message": "User Found";
    id: number;
    name: string; // username
    pp: string; // profile_pic
}

export interface identityProfile {
    name: string; // username
    pp: string; // profile_pic
    onOpen: () => void;
}

export interface EditUser {
    username?: string;
    password?: string;
    nationality?: string;

}

export interface EditUserPic {
    profile_picture_url?: string;
}

export interface UserData {
    userId: number;
    username: string;
    profilePic: string;
    editProfile: (editProfile: EditUser) => Promise<void>;
    editProfilePic: (editProfilePic: EditUserPic) => Promise<void>;
    loading: boolean
}

export interface F1DriverStanding {
    position: string;
    Driver: {
        givenName: string;
        familyName: string;
    };
    Constructors: Array<{ name: string }>;
    points: string;
}

export interface F1ConstructorStanding {
    position: string;
    Constructor: {
        name: string;
    };
    points: string;
}