import axios from "axios";

const postsApi = axios.create({
    baseURL: 'http://localhost:3000/posts',
});

export const searchForJob = async (key) => {
    const response = await postsApi(`/${key}`);
    return response.data;
}
