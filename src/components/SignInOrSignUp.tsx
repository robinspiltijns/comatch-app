'use client'

import { auth, googleAuthProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image"
import { useEffect, useState } from "react";

type Loading = {
    type: "LOADING"
}

type Loaded = {
    type: "LOADED",
}

type LoadingState = Loading | Loaded

const handleLogin = () => signInWithPopup(auth, googleAuthProvider);

function SignInOrSignUp() {

    useEffect(() => {
        if (window.navigator.userAgent.includes('Messenger')) 
            setSupportedUserAgent(false)
    }, [])

    const [loadingState, setLoadingState] = useState<LoadingState>({type: "LOADING"})
    const [supportedUserAgent, setSupportedUserAgent] = useState(true)

    // TODO: Make this based on auth context.
    auth.onAuthStateChanged(_ => {
        console.log("SetState");
        setLoadingState({type: "LOADED"})
    })  

    switch(loadingState.type) {
        case "LOADING": return (
            <div>Loading</div>
        )
        case "LOADED": return (
            <div>
                {supportedUserAgent && (
                    <button onClick={handleLogin} className="bg-white border-2 rounded-xl w-full py-3 px-4 font-sans">
                    <div className="flex flex-row items-center relative">
                        <Image src="/google.png" alt="google icon" width={25} height={20}/>
                        <div className="font-sans absolute text-center w-full">
                            Continue with google
                        </div>
                    </div>
                </button>
                )}
                {!supportedUserAgent && (
                    <div className="font-sans">
                        This browser is not supported. Please open this page in your default browser.
                    </div>
                )}
            </div>
        )
    }
}

export default SignInOrSignUp