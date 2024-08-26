import {
    User,
    Login,
    LoginResponse,
    SignUpResponse,
    Laptime,
    CreateLaptimeResponse,
    GetUserLaptimesResponse,
    identity,
    EditUser,
    EditUserPic,
    OneUser
} from '../Types';

// backend api routes.

export const API_PREFIX_URL = process.env.REACT_APP_PREFIX_URL || '';
export const API_KEY = process.env.REACT_APP_API_KEY || 'wont work lol';

const endpoints = {
    GET_USERS: `${API_PREFIX_URL}/users`, // get all users
    GET_USER: (id: Number) => `${API_PREFIX_URL}/users/${id}`, // get user by ID. jwt *
    LOGIN_USER: `${API_PREFIX_URL}/login`, // login user
    POST_USER: `${API_PREFIX_URL}/users`, // create a user account
    PUT_USER: (user_id: Number) => `${API_PREFIX_URL}/users/${user_id}/update`, // edit user details
    PUT_USER_PROFILE_PIC: (user_id: Number) => `${API_PREFIX_URL}/users/${user_id}/profile_picture`,

    POST_GET_LAPTIME: `${API_PREFIX_URL}/user/laptimes`, // user posts a laptime or view all their laptimes jwt*
    GET_MY_LAPTIMES: (page: Number) => `${API_PREFIX_URL}/user/laptimes?page=${page}`, // user view all their laptimes with pagination
    GET_USER_LAPTIME: (id: Number) => `${API_PREFIX_URL}/user/laptimes/${id}`, // get an exact laptime of a user jwt*

    GET_LAPTIMES: (page: Number) => `${API_PREFIX_URL}/laptimes?page=${page}`, // see everyone's laptime on tracknow
    GET_ONE_LAPTIME: (user_id: number, id: number) => `${API_PREFIX_URL}/users/${user_id}/laptimes/${id}`, // see a specific laptime of someone
    GET_USERS_LAPTIMES: (user_id: number, page: number) => `${API_PREFIX_URL}/users/${user_id}/laptimes?page=${page}`, // see personal moments of other users

    GET_IDENTITY: `${API_PREFIX_URL}/protected`, // make sure user is logged in and in session.

    // formula 1 standings
    FORMULA_1_TEAMS: `${API_PREFIX_URL}/f1/teams`,
    FORMULA_1_DRIVERS: `${API_PREFIX_URL}/f1/drivers`,

    // content from internet
    YOUTUBE: (date: string) => `${API_PREFIX_URL}/internet/youtube?date=${date}`

};


// function to fetch users. ideally for search
async function fetchUsers(): Promise<User[]> {
    const response = await fetch(endpoints.GET_USERS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users!');
    }
    const data: User[] = await response.json();
    return data;
};

// function to fetch one user with id. bearer token required
async function fetchUser(id: Number): Promise<OneUser> {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Login')
    }
    const response = await fetch(endpoints.GET_USER(id), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`, // after logging in, you get token.
            'x-api-key': API_KEY
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch user`);
    }
    const data: OneUser = await response.json();
    return data;

};

// function to login a user.
async function loginUser(details: Login): Promise<LoginResponse> {
    const response = await fetch(endpoints.LOGIN_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(details)
    });

    if (!response.ok) {
        throw new Error('Login Failed');
    };

    const data: LoginResponse = await response.json()
    return data;
};

// function to get user identity after logging in.
async function getIdentity(): Promise<identity> {
    const token = localStorage.getItem('access_token') // after logging in, we retrieve the token to get access to some of the functions

    const response = await fetch(endpoints.GET_IDENTITY, {
        'method': 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        },
    });
    if (!response.ok) {
        throw new Error('User not Logged in');
    };

    const data: identity = await response.json();
    return data;
};
// function to create a new user account.
async function CreateUser(newUser: Login): Promise<SignUpResponse> {
    const response = await fetch(endpoints.POST_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(newUser)
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    };

    const data: SignUpResponse = await response.json();
    return data;
};

// function to create a user's personal laptime and get personal laptimes
async function handleLaptimes(page: number = 1, newLaptime?: Laptime): Promise<CreateLaptimeResponse | GetUserLaptimesResponse[]> {

    const token = localStorage.getItem('access_token') // after logging in, we retrieve the token to get access to some of the functions

    if (newLaptime) {
        const response = await fetch(endpoints.POST_GET_LAPTIME, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-api-key': API_KEY
            },
            body: JSON.stringify(newLaptime)
        });
        if (!response.ok) {
            throw new Error('Failed to create laptime');
        }

        const data: CreateLaptimeResponse = await response.json();
        return data;
    } else {
        const response = await fetch(endpoints.GET_MY_LAPTIMES(page), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Personal laptimes');
        }

        const data: GetUserLaptimesResponse[] = await response.json();
        return data;
    };
};

// function to fetch personal laptime(single by id).
async function fetchMyLaptime(id: Number): Promise<Laptime> {

    const token = localStorage.getItem('access_token') // after logging in, we retrieve the token to get access to some of the functions

    const response = await fetch(endpoints.GET_USER_LAPTIME(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Personal Laptime. Does not exist.');
    }

    const data: Laptime = await response.json();
    return data;
};

// function to get everyone's laptime. not quite efficient way.
async function fetchEveryoneLaptime(page: number): Promise<GetUserLaptimesResponse[]> {

    const response = await fetch(endpoints.GET_LAPTIMES(page), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch laptimes!');
    }
    const data: GetUserLaptimesResponse[] = await response.json();
    return data;
};

// function to get a user's specific laptime.
async function fetchAUserLaptime(user_id: number, id: number): Promise<GetUserLaptimesResponse> {

    const token = localStorage.getItem('access_token')

    const response = await fetch(endpoints.GET_ONE_LAPTIME(user_id, id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch #${user_id} laptime`)
    };

    const data: GetUserLaptimesResponse = await response.json();
    return data;
}
async function EditUserProfile(user_id: Number, editUser: EditUser) {

    const token = localStorage.getItem('access_token')

    const response = await fetch(endpoints.PUT_USER(user_id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        },
        body: JSON.stringify(editUser)
    });
    if (!response.ok) {
        throw new Error('Failed to Edit User profile');
    }
    const data = await response.json();
    return data;
};

async function EditUserProfilePic(user_id: Number, editUserpic: EditUserPic) {

    const token = localStorage.getItem('access_token')

    const response = await fetch(endpoints.PUT_USER_PROFILE_PIC(user_id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        },
        body: JSON.stringify(editUserpic)
    });
    if (!response.ok) {
        throw new Error('Failed to Edit User profile picture');
    }
    const data = await response.json();
    return data;
};

async function fetchUsersLaptimes(user_id: number, page: number): Promise<GetUserLaptimesResponse[]> {

    const token = localStorage.getItem('access_token')

    const response = await fetch(endpoints.GET_USERS_LAPTIMES(user_id, page), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            Authorization: `Bearer ${token}`,

        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch #${user_id}'s laptimes!`);
    }

    const data: GetUserLaptimesResponse[] = await response.json();
    return data;
};
// function to fetch 'live' f1 constructors standings
async function fetchF1Teams() {

    const response = await fetch(endpoints.FORMULA_1_TEAMS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to get Formula 1 Team Standings`)
    };

    const data = await response.json();
    return data;
};

// function to fetch 'live' f1 drivers standings
async function fetchF1Drivers() {
    const response = await fetch(endpoints.FORMULA_1_DRIVERS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to get Formula 1 Driver Standings`)
    };

    const data = await response.json();
    return data;
};

// function to fetch daily youtube data
async function fetchYoutube(date: string) {
    const response = await fetch(endpoints.YOUTUBE(date), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch youtube data`)
    };

    const data = await response.json();
    return data;
};

const API = {
    fetchUser,
    fetchUsers,
    fetchMyLaptime,
    fetchEveryoneLaptime,
    loginUser,
    CreateUser,
    handleLaptimes,
    getIdentity,
    EditUserProfile,
    EditUserProfilePic,
    fetchAUserLaptime,
    fetchUsersLaptimes,
    fetchF1Drivers,
    fetchF1Teams,
    fetchYoutube
};


export default API;