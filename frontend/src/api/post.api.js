import client from './client'

export const createPost = async(payload)=>{
    const response = await client.post('/posts',payload)

    return response.data
}


export const getPosts = async()=>{
    const response = await client.get('/posts')

    return response.data
}

export const getPostById = async(id)=>{
    const response = await client.get(`/posts/${id}`)
    
    return response.data

}

export const updatePost = async(id,payload)=>{
    const response = await client.patch(`/posts/${id}`,payload)
    
    return response.data

}
export const deletePost = async(id)=>{
    const response = await client.delete(`/posts/${id}`)
    
    return response.data

}