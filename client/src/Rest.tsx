import axios from 'axios'

export const register = async (email: string, username: string, password: string): Promise<number> => {
    try {
        const response = await axios.post('http://localhost:5050/api/register', {
            email,
            username,
            password
        })
        return response.status
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
};