import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [user, setUser]=useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if (token) {
            try {
                // Log the token to inspect its structure
                console.log('Retrieved token:', token);

                // Check if the token has three parts
                if (token.split('.').length === 3) {
                    const decodedUser = jwtDecode(token);
                    setUser(decodedUser);
                } else {
                    console.error('Invalid token format');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        // if(token){
        //     const decoded=jwtDecode(token)
        //     setUser(decoded)
        // }
    },[])

    const login=(userData)=>{
        localStorage.setItem('token',userData.token)
        const decoded=jwtDecode(userData.token)
        setUser(decoded)
        setIsAuthenticated(true)
    }

    const logout=()=>{
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
       
    }

    const signIn=(email,password)=>{
        axios.post('https://codeconverter1.onrender.com/login',{email,password})
    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,login,logout,signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider,AuthContext}