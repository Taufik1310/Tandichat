import axios from 'axios'

export const register = async (email: string, username: string, password: string): Promise<number> => {
    try {
        const response = await axios.post('http://localhost:5050/api/register', {
            email,
            username,
            password
        })
        return response.data.code
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5050/api/login', {
            email,
            password
        })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const logout = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
        
    }

    try {
        const response = await axios.post("http://localhost:5050/api/logout", null, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}