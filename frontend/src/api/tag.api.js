import client from './client'

export const getMyTags = async()=>{
    const response = await client.get('/tags')
    return response.data
}
export const createTag = async(label)=>{
    const response = await client.post('/tags',{label})

    return response.data
}
export const deleteTag = async(tagId)=>{
    await client.delete(`/tags/${tagId}`)
    return `${tagId} 삭제 완료`
}