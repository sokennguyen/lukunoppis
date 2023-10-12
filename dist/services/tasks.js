import axios from 'axios'
const baseUrl = '/api/tasks'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}
