import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const KakaoCallback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token")

        if (token === "session") {
            navigate("/", { replace: true })
        }else{
            navigate("/login",{replace:true})
        }

    }, [navigate])

    return null;
}

export default KakaoCallback