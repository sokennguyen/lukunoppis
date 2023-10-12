//import from source because dynamic import messed up the relative path declared inside node_modules
import axios from "https://cdn.skypack.dev/axios"
const baseUrl = '/api/tasksets'

//normal import to work with dynamic import
export const create = async (newObject) => {
    const request = await axios.post(baseUrl,newObject)
    return request.data
}

export const getAll = async() => {
    const request = await axios.get(baseUrl)
    return request.data
}