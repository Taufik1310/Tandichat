import axios from 'axios'

export const register = async (email: string, username: string, password: string): Promise<void> => {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password }),
        };
        
        const response = await fetch('http://localhost:5050/api/register', requestOptions);

        console.log(response);
    } catch (error) {
        console.error(error);
    }
};