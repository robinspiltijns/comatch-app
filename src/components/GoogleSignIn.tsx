'use client'

import { auth, googleAuthProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image"

const handleLogin = () => signInWithPopup(auth, googleAuthProvider);

const openInBrowser = () => {
    window.open(window.location.href, '_system');
  }

function GoogleSignIn() {
    return (
        <div>
            <button onClick={handleLogin} className="bg-white border-2 rounded-xl w-full py-3 px-4 font-sans">
                <div className="flex flex-row items-center relative">
                    <Image src="/google.png" alt="google icon" width={25} height={20}/>
                    <div className="font-sans absolute text-center w-full">
                        Continue with google
                    </div>
                </div>
                {window.navigator.userAgent}
            </button>
            <button onClick={openInBrowser}>
                Open in browser
            </button>
        </div>
    )
}

export default GoogleSignIn