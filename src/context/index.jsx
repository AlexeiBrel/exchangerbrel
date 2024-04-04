import { createContext, useContext, useState } from "react";

const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        login: '',
        role: 'guest'
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>

    )
}