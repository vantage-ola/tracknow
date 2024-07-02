import { User, Login, LoginResponse, SignUpResponse, Laptime, CreateLaptimeResponse, GetUserLaptimesResponse } from '../Types';

// backend api routes.

const API_PREFIX_URL = process.env.REACT_APP_PREFIX_URL || '';

const endpoints = {
    GET_USERS: `${API_PREFIX_URL}/users`, // get all users
    GET_USER: (id: Number) => `${API_PREFIX_URL}/users/${id}`, // get user by ID. jwt *
    LOGIN_USER: `${API_PREFIX_URL}/login`, // login user
    POST_USER: `${API_PREFIX_URL}/users`, // create a user account
    PUT_USER: (user_id: Number) => `${API_PREFIX_URL}/users/${user_id}/update`, // edit user details(nationality)

    POST_GET_LAPTIME: `${API_PREFIX_URL}/user/laptimes`, // user posts a laptime or view all their laptimes jwt*
    GET_USER_LAPTIME: (id: Number) => `${API_PREFIX_URL}/user/laptimes/${id}`, // get an exact laptime of a user jwt*

    GET_LAPTIMES: `${API_PREFIX_URL}/laptimes`, // see everyone's laptime on tracknow
    GET_ONE_LAPTIME: (user_id: Number, id: Number) => `${API_PREFIX_URL}/users/${user_id}/laptimes/${id}` // see a specific laptime of someone

};

const token = localStorage.getItem('token') // after logging in, we retrieve the token to get access to some of the functions

// function to fetch users. ideally for search
async function fetchUsers(): Promise<User[]> {
    const response = await fetch(endpoints.GET_USERS);
    if (!response.ok) {
        throw new Error('Failed to fetch users!');
    }
    const data: User[] = await response.json();
    return data;
};

// function to fetch one user with id. bearer token required
async function fetchUser(id: Number): Promise<User> {

    if (!token) {
        throw new Error('Login')
    }
    const response = await fetch(endpoints.GET_USER(id), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // after logging in, you get token.
            // TODO unique api key, extra security
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch user with ID: ${id}`);
    }
    const data: User = await response.json();
    return data;

}

// function to login a user.
async function loginUser(details: Login): Promise<LoginResponse> {
    const response = await fetch(endpoints.LOGIN_USER, {
        method: 'POST',
        headers: {
            'Content-Type:': 'application/json',
        },
        body: JSON.stringify(details)
    });

    if (!response.ok) {
        throw new Error('Login Failed');
    };

    const data: LoginResponse = await response.json()
    return data;
}

// function to create a new user account.
async function CreateUser(newUser: Login): Promise<SignUpResponse> {
    const response = await fetch(endpoints.POST_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicaton/json'
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
async function handleLaptimes(newLaptime?: Laptime): Promise<CreateLaptimeResponse | GetUserLaptimesResponse> {
    if (newLaptime) {
        const response = await fetch(endpoints.POST_GET_LAPTIME, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify(newLaptime)
        })
        if (!response.ok) {
            throw new Error('Failed to create laptime');
        }

        const data: CreateLaptimeResponse = await response.json();
        return data;
    } else {
        const response = await fetch(endpoints.POST_GET_LAPTIME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Personal laptimes');
        }

        const data: GetUserLaptimesResponse = await response.json();
        return data;
    };
};

// function to fetch personal laptime(single by id).
async function fetchMyLaptime(id: Number): Promise<Laptime> {

    const response = await fetch(endpoints.GET_USER_LAPTIME(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Personal Laptime. Does not exist.');
    }

    const data: Laptime = await response.json();
    return data;
};

// function to get everyone's laptime. not quite efficient way.
async function fetchEveryoneLaptime(): Promise<GetUserLaptimesResponse> {
    const response = await fetch(endpoints.GET_LAPTIMES);
    if (!response.ok) {
        throw new Error('Failed to fetch laptimes!');
    }
    const data: GetUserLaptimesResponse = await response.json();
    return data;
};

const API = {
    fetchUser,
    fetchUsers,
    fetchMyLaptime,
    fetchEveryoneLaptime,
    loginUser,
    CreateUser,
    handleLaptimes
};


export default API;