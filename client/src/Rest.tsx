import axios from 'axios'

const BASE_API_URL = 'http://localhost:5050/api'
const BASE_WS_URL = 'http://localhost:5050/ws'
export const BASE_AVATAR_URL = 'http://localhost:5050/static/avatar'

export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/register`, {
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
        const response = await axios.post(`${BASE_API_URL}/login`, {
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
        const response = await axios.post(`${BASE_API_URL}/logout`, null, { headers })
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
    const url = email ? `${BASE_API_URL}/user?${queryParams}` : `${BASE_API_URL}/user`
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
//         const url = `${BASE_API_URL}/avatar?${queryParams}`
//         const response = await axios.get(url, { responseType: `blob` })
//         const imageBlob = response.data
//         const imageUrl = URL.createObjectURL(imageBlob)
//         return imageUrl
//     } catch (error) {
//         console.error(`Error fetching profile picture:`, error.message)
//         return undefined
//     }
// }

export const changeAvatar = async (token: string, formData: FormData) => {
    const headers = {
        "Content-Type": `multipart/form-data`,
        "Authorization": token,
    }

    try {
        const response = await axios.patch(`${BASE_API_URL}/avatar`, formData, { headers })
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
        const response = await axios.patch(`${BASE_API_URL}/user/username`, {
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
        const response = await axios.patch(`${BASE_API_URL}/user/about`, {
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
        const response = await axios.post(`${BASE_API_URL}/friends/request`, { 
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
        const response = await axios.post(`${BASE_API_URL}/friends/cancel`, { 
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
        const response = await axios.post(`${BASE_API_URL}/friends/accept`, { 
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
        const response = await axios.post(`${BASE_API_URL}/friends/decline`, { 
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
        const response = await axios.get(`${BASE_API_URL}/friends/pending`, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
}


export const getAllFriend = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.get(`${BASE_API_URL}/friends`, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.status
        }
        throw error
    }
}

export const deleteFriend = async (token: string, friendId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.delete(`${BASE_API_URL}/friends`, {
            data: {
                friend_id: friendId
            },
            headers: headers
        })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const blockUser = async (token: string, blockedUserId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.post(`${BASE_API_URL}/user/block`, { 
            blocked_user_id: blockedUserId 
        }, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const unblockUser = async (token: string, blockedUserId: number) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.delete(`${BASE_API_URL}/user/block`, {
            data: {
                blocked_user_id: blockedUserId
            },
            headers: headers
        })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const getAllBlockedUser = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }

    try {
        const response = await axios.get(`${BASE_API_URL}/user/block`, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}

export const getMessages = async (token: string, to?: number, cursor?: number) => {
    let queryParams = []

    if (to) {
        queryParams.push(`to=${to}`)
    }

    if (cursor) {
        queryParams.push(`cursor=${cursor}`)
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
    const url = `${BASE_API_URL}/message${queryString}`

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

export const getWebSocketAuth = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token,
    }
    
    try {
        const response = await axios.get(`${BASE_WS_URL}/auth`, { headers })
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
        throw error
    }
}
