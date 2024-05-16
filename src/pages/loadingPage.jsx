import { useEffect, useState } from "react"
import HomePage from "./homePage"

export default function LoadingPage() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {
                loading ?
                    <div className="w-full h-dvh bg-black text-white">
                        <div className="animate-bounce w-full h-full flex items-center justify-center">
                            <img src="/Senech-white.png" alt="" className="w-52"/>
                        </div>
                    </div>
                    : <HomePage />
            }
        </>
    )
}