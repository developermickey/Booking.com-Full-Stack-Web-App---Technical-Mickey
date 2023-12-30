import { RegisterFormData } from "./pages/register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Assuming you're using Create React App for environment variables

export const register = async (formData: RegisterFormData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Registration failed'); // Default error message if response is not OK
        }

        const responseBody = await response.json();
        return responseBody; // Return the response body upon successful registration
    } catch (error) {
        throw new Error('Failed to register'); // Default error message for any unexpected errors
    }
};
