import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getMe } from '../api/auth.api'

const AuthCtx = createContext(null)
export function AuthProvider({ children }) {
    const [member, setMember] = useState(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let mounted = true
        const bootstrapAuth = async () => {
            try {
                const data = await getMe()
                if (mounted) {
                    setMember(data)
                }
            } catch {
                if (mounted) {
                    setMember(null)
                }
            } finally {
                if (mounted) {
                    setIsReady(true)
                }
            }
        }
        bootstrapAuth()
        return () => {
            mounted = false
        }
    }, [])


    const login = (memberData) => {
        setMember(memberData)
    }

    const logout = () => {
        setMember(null)
    }

    const value = useMemo(() => ({
        member,
        isReady,
        isAuthed: !!member,
        login,
        logout

    }), [member, isReady])

    return <AuthCtx.Provider value={value}>
        {children}
    </AuthCtx.Provider>
}


export const useAuth = () => useContext(AuthCtx)