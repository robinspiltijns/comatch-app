'use client'

import Authenticate from "@/components/Authenticate";
import { AuthContext } from "@/lib/AuthProvider";
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from "react";

export default function LogInOrSignUp() {
    const router = useRouter()
    const authState = useContext(AuthContext)

    useEffect(() => {
        if (authState.type == "AUTHENTICATED") router.push("/")
    }, [authState, router])

    return (
        <div>
             <h2 className="font-mono text-2xl py-2 px-5 border-b-2 border-dotted">
                Log in or sign up
            </h2>
            <div className="p-5">
                <Authenticate/>
            </div>
        </div>
    )
}