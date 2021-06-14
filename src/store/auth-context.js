import React, { useState, useEffect, useCallback } from "react"

let logoutTimer

const AuthContext = React.createContext({
    token: '',
    isLogged: false,
    login: token => { },
    logout: () => { }
})

const calculateTime = expiration => {
    const currentTime = new Date().getTime();
    const adjTime = new Date(expiration).getTime()

    const remainingTime = adjTime - currentTime;

    return remainingTime
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime')

    const remainingTime = calculateTime(storedExpirationDate)

    if (remainingTime <= 3600) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthProvider = (props) => {
    const tokenData = retrieveStoredToken()
    let initialToken = tokenData ? tokenData.token : ''
    const [token, setToken] = useState(initialToken)
    const userIsLogged = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    },[])

    const loginHandler = (token, expiration) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expiration)

        const remainingTime = calculateTime(expiration)
        logoutTimer = setTimeout(logoutHandler, remainingTime)
    }

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration)
            logoutTimer = setTimeout(logoutHandler, tokenData.duration)
        }
    }, [tokenData, logoutHandler])

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
