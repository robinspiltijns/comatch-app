'use client'

import { auth, googleAuthProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image"

const handleLogin = () => signInWithPopup(auth, googleAuthProvider);

function GoogleSignIn() {
    return (
        <button onClick={handleLogin} className="bg-white border-2 rounded-xl w-full py-3 px-4 font-sans">
            <div className="flex flex-row items-center relative">
                <Image src="/google.png" alt="google icon" width={25} height={20}/>
                <div className="font-sans absolute text-center w-full">
                    Continue with google
                </div>
            </div>
        </button>
    )
}

export default GoogleSignIn