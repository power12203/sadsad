import axios from "axios";

const request = axios.create()

export const write_post = (title, body, tags) =>{
    const response = request.post('/api/posts', {title, body, tags})
    return response
}

export const read_post = (id) => {
    const response = request.get(`/api/posts/${id}`)
    return response;
}

export const list_post = (page, username, tag) =>{
    const response = request.get(`/api/posts`, {params:{page, username, tag}})
    return response;
}

export const update_post = (id, title, body, tags) => (
    request.patch(`/api/posts/${id}`, {title, body, tags})
)

export const remove_post = (id) => request.delete(`/api/posts/${id}`);
