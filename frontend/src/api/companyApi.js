import axios from "axios";

const companiesApi = axios.create({
    baseURL: 'http://localhost:3000/companies',
});

// PARAMS: email and password
export const companyLogin = async (data) => {
    const response = await companiesApi.post('/login', {
        "email": data.email,
        "password": data.password,
    });

    return response;
}

export const getCompanyInfo = async (token) => {
    const response = await companiesApi.post('/me', {
        "token": token,
    });
    return response.data;
}