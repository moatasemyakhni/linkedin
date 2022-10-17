import axios from "axios";
import { configuration } from "./postsApi";

const usersApi = axios.create({
    baseURL: 'http://localhost:3000/users',
});

// PARAMS: email and password
export const userLogin = async (data) => {
    const response = await usersApi.post('/login', {
        "email": data.email,
        "password": data.password,
    });

    return response;
}

export const getUserInfo = async (token) => {
    const response = await usersApi.post('/me', {
        "token": token,
    });
    return response.data;
}

export const userSignup = async (data) => {
    const response = await usersApi.post('/signup', {
        "email": data.email,
        "password": data.password,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "country": data.country,
        "city": data.city,
        "phone": data.phone,
    });

    return response.data;
}

export const follow = async (data, token) => {
    const response = await usersApi.patch('/follow_company', {
        "user_id": data.user_id,
        "company_id": data.company_id
    }, configuration(token));

    return response.data;
}

export const unFollow = async (data, token) => {
    const response = await usersApi.delete('/unfollow_company', {
        "user_id": data.user_id,
        "company_id": data.company_id
    }, configuration(token));

    return response.data;
}

export const getUnfollowedCompanies = async (data, token) => {
    const response = await usersApi.get('/company', {
        "user_id": data.user_id,
    }, configuration(token));

    return response.data;
}
 
export const editProfile = async (data, token) => {
    const response = await usersApi.patch('/', {
        "_id": data._id,
        "profile": data.profile,
    }, configuration(token));

    return response.data;
}