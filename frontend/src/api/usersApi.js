import axios from "axios";

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