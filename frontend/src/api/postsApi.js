import axios from "axios";


export const configuration = (token) => {
    return {headers: {'Authorization': `Bearer ${token}`}};
}

const postsApi = axios.create({
    baseURL: 'http://localhost:3000/posts',
});
postsApi.defaults.headers.common['Authorization'] = localStorage.getItem('user_token');

export const searchForJob = async (key) => {
    const response = await postsApi.get(`/${key}`);
    return response.data;
}

export const isApplied = async (data, token) => {
    const response = await postsApi.post('/is_applied', {
        "company_id": data.company_id,
        "post_id": data.post_id,
        "user_id": data.user_id,
    }, configuration(token));
    return response.data;
}

export const applyJob = async (data, token) => {
    const response = await postsApi.patch('/apply_for_job', {
        "post_id": data.post_id,
        "user_id": data.user_id,
    }, configuration(token))

    return response.data;
}

export const createPost = async (data, token) => {
    const response = await postsApi.post('/', {
        "_id": data.company_id,
        "content": data.content,
    }, configuration(token));
    return response.data;
}