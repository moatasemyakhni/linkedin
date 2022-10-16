import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:3000/users',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Access-Control-Allow-Origin': '*'

    // }
});

// PARAMS: email and password
export const userLogin = async (data) => {
    const response = await usersApi.post('/login', {
        "email": data.email,
        "password": data.password,
    });

    return response;
}