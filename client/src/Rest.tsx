import axios from 'axios'

export const register = async (email: string, username: string, password: string) => {
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


export const getUserData = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.get("http://localhost:5050/api/user", { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const getAvatar = async ( imageName: string = "default" ) => {
    try {
        const queryParams = new URLSearchParams({ name: imageName }).toString()
        const url = `http://localhost:5050/api/profile?${queryParams}`
        const response = await axios.get(url, { responseType: 'blob' })
        const imageBlob = response.data
        const imageUrl = URL.createObjectURL(imageBlob)
        return imageUrl
    } catch (error) {
        console.error("Error fetching profile picture:", error.message);
        return undefined;
    }
}

export const changeUsername = async (token: string, newUsername: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.patch("http://localhost:5050/api/user/username", {
            new_username: newUsername 
        } , { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
}

export const changeAbout = async (token: string, newAabout: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.patch("http://localhost:5050/api/user/about", {
            new_about: newAabout 
        } , { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
}