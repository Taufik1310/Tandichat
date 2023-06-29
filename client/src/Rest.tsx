import axios from 'axios'

const BASE_URL = 'http://localhost:5050/api'
export const BASE_AVATAR_URL = 'http://localhost:5050/static/profile'

export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
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
        const response = await axios.post(`${BASE_URL}/login`, {
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
        const response = await axios.post(`${BASE_URL}/logout`, null, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}


export const getUserData = async (token: string, email?: string) => {
    const queryParams = new URLSearchParams({ email: email }).toString()
    const url = email ? `${BASE_URL}/user?${queryParams}` : `${BASE_URL}/user`
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }


    try {
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

// export const getAvatar = async ( imageName: string = `default` ) => {
//     try {
//         const queryParams = new URLSearchParams({ name: imageName }).toString()
//         const url = `${BASE_URL}/avatar?${queryParams}`
//         const response = await axios.get(url, { responseType: `blob` })
//         const imageBlob = response.data
//         const imageUrl = URL.createObjectURL(imageBlob)
//         return imageUrl
//     } catch (error) {
//         console.error(`Error fetching profile picture:`, error.message);
//         return undefined;
//     }
// }

export const changeAvatar = async (token: string, formData: FormData) => {
    const headers = {
        "Content-Type": `multipart/form-data`,
        "Authorization": token,
    }

    try {
        const response = await axios.patch(`${BASE_URL}/avatar`, formData, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const changeUsername = async (token: string, newUsername: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.patch(`${BASE_URL}/user/username`, {
            new_username: newUsername 
        } , { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
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
        const response = await axios.patch(`${BASE_URL}/user/about`, {
            new_about: newAabout 
        } , { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const addFriendRequest = async (token: string, friendId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.post(`${BASE_URL}/friends/request`, { 
            friend_id: friendId 
        }, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const cancelFriendRequest = async (token: string, friendId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.post(`${BASE_URL}/friends/cancel`, { 
            friend_id: friendId 
        }, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const acceptFriendRequest = async (token: string, friendId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.post(`${BASE_URL}/friends/accept`, { 
            friend_id: friendId 
        }, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const declineFriendRequest = async (token: string, friendId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.post(`${BASE_URL}/friends/decline`, { 
            friend_id: friendId 
        }, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const getFriendPending = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.get(`${BASE_URL}/friends/pending`, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
}
