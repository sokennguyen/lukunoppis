import axios from 'axios'
const baseUrl = '/api/tasks'

const create = async (newObject) => {
    const request = await axios.post(baseUrl,newObject)
    return request.data
}

export default {create}
