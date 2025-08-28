import { ref, computed } from 'vue'
import axios from 'axios';

// 🔑 Singleton reactive state
const user = ref(null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = ref(false)


    // Login
    async function login(credentials) {
        loading.value = true
        error.value = null

        try {

        if (!credentials.email || !credentials.password) {
            throw new Error('Email and password are required')
        }

        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials)
        const { token, user: userData } = response.data

        if (token && userData) {
            user.value = userData

            if (user.value.role == 1) isAdmin = true

            console.log(isAdmin)

            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAdmin", isAdmin);

            return response
        } else {
            throw new Error('Invalid response format from server')
        }

        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Login failed'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Register
    async function register(formData) {
        loading.value = true
        error.value = null
        try {
             const response = await axios.post('http://127.0.0.1:8000/api/register', formData)
             const { token, user: userData } = response.data
            if (token && userData) {
                user.value = userData
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", JSON.stringify(user));

                return response
            } else {
                throw new Error('Invalid response format from server')
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'Registration failed'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Logout
    function logout() {
        user.value = null
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
    }
    return {
        user,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        // currentUser,
        login,
        register,
        logout,
        // updateProfile
    }
 }