import { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../Services/ApiServices";
import { useEffect } from "react";

export const AuthContex = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // ✅ Restore user session on reload
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");

        if (token && role && userId) {
        setUser({ token, role, userId });
        }   
    }, []);

    // ✅ Login
    const userLogin = async (login) => {
        const { username, password } = login;
        try {
            const response = await loginUser(username, password)
            const data = response.data;
            setUser({
                token: data.token,
                role: data.role,
                userId: data.userId
            })
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data.userId); 

            toast.success("Login successful!");
        }
        catch (error) {
            console.log("Login failed:", error)
            toast.error("Invalid Credentials")
        }
    };

    // ✅ Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        toast.success("Logged out successfully");
    };

    return (
        <AuthContex.Provider value={{ user, userLogin, logout }}>
            {children}
            <ToastContainer autoClose={1500}/>
        </AuthContex.Provider>
    )
}

