'use client'

import Image from "next/image";
import { useState } from 'react';
import Link from "next/link";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";


export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogin = () => signInWithPopup(auth, googleAuthProvider);

    return (
        <nav className={`z-50 sticky top-0 w-full ${showMenu ? 'bg-black' : 'bg-light-purple'}`}>
                <div className={`flex flex-row justify-between align-middle px-5 py-3 border-b-2 ${showMenu ? 'border-white' : 'border-black'}`}>
                    <Link href="/">
                        {!showMenu && <Image priority src="/logo.png" alt="comatch-logo" width={62} height={48}/>}
                        {showMenu && <Image priority src="/logo-white.png" alt="comatch-logo" width={62} height={48}/>}
                    </Link>
                    <button onClick={toggleMenu}>
                        <svg className="h-8 w-8" stroke={showMenu ? 'white' : 'black'}>
                            {!showMenu && <path strokeWidth="3" d="M4 8h24M4 16h24M4 24h24"/>}
                            {showMenu && <path strokeWidth="3" d="M4 8L28 32M4 32L28 8"/>}
                        </svg>
                    </button>
                </div>
            {showMenu && (
                <div className={`absolute w-full bg-black`}>
                    <div onClick={handleLogin} className="font-mono text-white px-5 py-3 border-b-2">
                        Login
                    </div>
                </div>
            )}
        </nav>
    );
}
