'use client'

import { createContext, ReactNode, useContext } from "react"

type isLoggedType = false | {id: string}

interface ContextAuthType {
    isLogged: isLoggedType
}

const ContextAuth = createContext<ContextAuthType | undefined>(undefined)

export const ContextAuthProvider = ({children, isLogged}: {children: ReactNode, isLogged: isLoggedType}) => {
    return(<ContextAuth.Provider value ={{isLogged}}>
        {children}
    </ContextAuth.Provider>)
}

export const useAuthContext = (): ContextAuthType | undefined => {
    const context = useContext(ContextAuth)
    if (!context) {
        throw new Error("Contexto não encontrado")
    }
    return context
}