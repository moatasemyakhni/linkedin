import axios from "axios";
import { configuration } from "./postsApi";

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

export const companySignup = async (data) => {
    const response = await companiesApi.post('/signup', {
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "industry": data.industry,
        "organizationSize": data.organizationSize,
        "type": data.type,
    });

    return response.data;
}

export const editLogo = async (data, token) => {
    const response = await companiesApi.patch('/', {
        "_id": data._id,
        "logo": data.logo,
    }, configuration(token));

    return response.data;
}

