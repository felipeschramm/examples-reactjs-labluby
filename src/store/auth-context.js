import React, { useState } from "react"

const AuthContext = React.createContext({
    token: '',
    isLogged: false,
    login: token => { },
    logout: () => { }
})

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null)
    const userIsLogged = !!token;
    const loginHandler = (token) => {
        setToken(token)
    }
    const logoutHandler = () => {
        setToken(null)
    }

    const contextValue = {
        token: token,
        isLogged: userIsLogged,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext
