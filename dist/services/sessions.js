import axios from "https://cdn.skypack.dev/axios"
const baseUrl = '/api/sessions'

export const create = async (newObject) => {
    const request = await axios.post(baseUrl,newObject)
    return request.data
}

export const getAll = async() => {
    const request = await axios.get(baseUrl)
    return request.data
}